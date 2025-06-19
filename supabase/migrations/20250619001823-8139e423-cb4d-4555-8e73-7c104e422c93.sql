
-- Comprehensive Security Fixes Migration

-- 1. Create missing security functions first
CREATE OR REPLACE FUNCTION public.get_user_company_id(user_id uuid)
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT company_id FROM public.profiles WHERE id = user_id;
$$;

CREATE OR REPLACE FUNCTION public.is_company_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT COALESCE(is_company_admin, false) FROM public.profiles WHERE id = user_id;
$$;

-- 2. Add RLS policies for companies table
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own company" 
  ON public.companies 
  FOR SELECT 
  USING (id = public.get_user_company_id(auth.uid()));

CREATE POLICY "Company admins can update their company" 
  ON public.companies 
  FOR UPDATE 
  USING (
    id = public.get_user_company_id(auth.uid()) AND 
    public.is_company_admin(auth.uid())
  );

-- 3. Add RLS policies for financial_accounts
ALTER TABLE public.financial_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage financial accounts in their company" 
  ON public.financial_accounts 
  FOR ALL 
  USING (company_id = public.get_user_company_id(auth.uid()));

-- 4. Add RLS policies for treasury_transactions
ALTER TABLE public.treasury_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage treasury transactions in their company" 
  ON public.treasury_transactions 
  FOR ALL 
  USING (company_id = public.get_user_company_id(auth.uid()));

-- 5. Enhance paid_account_requests policies
DROP POLICY IF EXISTS "Users can view their company's requests" ON public.paid_account_requests;
DROP POLICY IF EXISTS "Company admins can create requests" ON public.paid_account_requests;

CREATE POLICY "Users can view their company's requests" 
  ON public.paid_account_requests 
  FOR SELECT 
  USING (company_id = public.get_user_company_id(auth.uid()));

CREATE POLICY "Company admins can create requests" 
  ON public.paid_account_requests 
  FOR INSERT 
  WITH CHECK (
    company_id = public.get_user_company_id(auth.uid()) AND 
    public.is_company_admin(auth.uid())
  );

CREATE POLICY "System can create automatic requests" 
  ON public.paid_account_requests 
  FOR INSERT 
  WITH CHECK (requested_by IS NULL); -- For system-generated requests

-- 6. Add admin session security table
CREATE TABLE IF NOT EXISTS public.admin_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_email TEXT NOT NULL,
  session_token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '4 hours'),
  is_active BOOLEAN DEFAULT true,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ip_address INET,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON public.admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON public.admin_sessions(expires_at);

ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage their own sessions" 
  ON public.admin_sessions 
  FOR ALL 
  USING (admin_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- 7. Add security event logging table
CREATE TABLE IF NOT EXISTS public.security_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  admin_email TEXT,
  ip_address INET,
  user_agent TEXT,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_security_events_type ON public.security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_security_events_created_at ON public.security_events(created_at);

ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Only system admins can view security events
CREATE POLICY "System admins can view security events" 
  ON public.security_events 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.system_admins 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()) 
      AND is_active = true
    )
  );

-- 8. Add function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type_param TEXT,
  user_id_param UUID DEFAULT NULL,
  admin_email_param TEXT DEFAULT NULL,
  ip_address_param TEXT DEFAULT NULL,
  user_agent_param TEXT DEFAULT NULL,
  event_data_param JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  event_id UUID;
BEGIN
  INSERT INTO public.security_events (
    event_type,
    user_id,
    admin_email,
    ip_address,
    user_agent,
    event_data
  ) VALUES (
    event_type_param,
    user_id_param,
    admin_email_param,
    ip_address_param::INET,
    user_agent_param,
    event_data_param
  ) RETURNING id INTO event_id;
  
  RETURN event_id;
END;
$$;

-- 9. Add password strength validation function
CREATE OR REPLACE FUNCTION public.validate_password_strength(password_param TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Password must be at least 8 characters
  IF LENGTH(password_param) < 8 THEN
    RETURN FALSE;
  END IF;
  
  -- Must contain at least one uppercase letter
  IF password_param !~ '[A-Z]' THEN
    RETURN FALSE;
  END IF;
  
  -- Must contain at least one lowercase letter
  IF password_param !~ '[a-z]' THEN
    RETURN FALSE;
  END IF;
  
  -- Must contain at least one digit
  IF password_param !~ '[0-9]' THEN
    RETURN FALSE;
  END IF;
  
  -- Must contain at least one special character
  IF password_param !~ '[^A-Za-z0-9]' THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$;

-- 10. Add constraint to require requested_by to be non-null for user requests
ALTER TABLE public.paid_account_requests 
DROP CONSTRAINT IF EXISTS check_requested_by_logic;

ALTER TABLE public.paid_account_requests 
ADD CONSTRAINT check_requested_by_logic 
CHECK (
  (request_message LIKE '[AUTOMATIQUE]%' AND requested_by IS NULL) OR
  (request_message NOT LIKE '[AUTOMATIQUE]%' AND requested_by IS NOT NULL)
);

-- 11. Add audit trigger for sensitive tables
CREATE OR REPLACE FUNCTION public.audit_trigger_function()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Log the change to security events
  PERFORM public.log_security_event(
    'table_modification',
    auth.uid(),
    NULL,
    NULL,
    NULL,
    jsonb_build_object(
      'table_name', TG_TABLE_NAME,
      'operation', TG_OP,
      'old_data', CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
      'new_data', CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END
    )
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Add audit triggers to sensitive tables
DROP TRIGGER IF EXISTS audit_companies ON public.companies;
CREATE TRIGGER audit_companies
  AFTER INSERT OR UPDATE OR DELETE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();

DROP TRIGGER IF EXISTS audit_system_admins ON public.system_admins;
CREATE TRIGGER audit_system_admins
  AFTER INSERT OR UPDATE OR DELETE ON public.system_admins
  FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();

-- 12. Add function to clean up expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.admin_sessions 
  WHERE expires_at < now() OR is_active = false;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;
