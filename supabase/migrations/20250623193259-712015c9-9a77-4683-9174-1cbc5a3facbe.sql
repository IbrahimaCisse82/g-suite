
-- Critical Security Fixes - Phase 1: Simplified approach without gen_salt

-- 1. Create the rate_limits table first
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL,
  action_type TEXT NOT NULL,
  attempt_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  blocked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(identifier, action_type)
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_action ON public.rate_limits(identifier, action_type);
CREATE INDEX IF NOT EXISTS idx_rate_limits_window_start ON public.rate_limits(window_start);
CREATE INDEX IF NOT EXISTS idx_rate_limits_blocked_until ON public.rate_limits(blocked_until);

-- Enable RLS on rate_limits
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Rate limits are system managed only
CREATE POLICY "Rate limits are system managed" 
  ON public.rate_limits 
  FOR ALL 
  USING (false);

-- 2. Add input validation functions
CREATE OR REPLACE FUNCTION public.validate_email_format(email_text TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
SET search_path = ''
AS $$
BEGIN
  RETURN email_text ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(email_text) <= 255
    AND length(email_text) >= 5;
END;
$$;

-- 3. Add comprehensive input sanitization function
CREATE OR REPLACE FUNCTION public.sanitize_input(input_text TEXT)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
SET search_path = ''
AS $$
BEGIN
  IF input_text IS NULL THEN
    RETURN NULL;
  END IF;
  
  RETURN trim(regexp_replace(input_text, '[<>"\'';&]', '', 'g'));
END;
$$;

-- 4. Enhanced rate limiting function
CREATE OR REPLACE FUNCTION public.check_rate_limit_secure(
  identifier_param TEXT,
  action_type_param TEXT,
  max_attempts INTEGER DEFAULT 5,
  window_minutes INTEGER DEFAULT 15,
  block_minutes INTEGER DEFAULT 15
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  current_record public.rate_limits%ROWTYPE;
  window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  window_start := now() - (window_minutes || ' minutes')::INTERVAL;
  
  -- Get existing record
  SELECT * INTO current_record
  FROM public.rate_limits
  WHERE identifier = identifier_param 
    AND action_type = action_type_param;
  
  -- Check if currently blocked
  IF current_record.blocked_until IS NOT NULL AND current_record.blocked_until > now() THEN
    RETURN FALSE;
  END IF;
  
  -- Clean up old records outside window
  DELETE FROM public.rate_limits 
  WHERE window_start < window_start AND (blocked_until IS NULL OR blocked_until < now());
  
  -- If no record or outside window, create new
  IF current_record IS NULL OR current_record.window_start < window_start THEN
    INSERT INTO public.rate_limits (identifier, action_type, attempt_count, window_start, updated_at)
    VALUES (identifier_param, action_type_param, 1, now(), now())
    ON CONFLICT (identifier, action_type) 
    DO UPDATE SET 
      attempt_count = 1,
      window_start = now(),
      blocked_until = NULL,
      updated_at = now();
    RETURN TRUE;
  END IF;
  
  -- Increment attempts
  UPDATE public.rate_limits 
  SET 
    attempt_count = attempt_count + 1,
    blocked_until = CASE 
      WHEN attempt_count + 1 >= max_attempts 
      THEN now() + (block_minutes || ' minutes')::INTERVAL
      ELSE blocked_until 
    END,
    updated_at = now()
  WHERE identifier = identifier_param 
    AND action_type = action_type_param;
  
  RETURN (current_record.attempt_count + 1) < max_attempts;
END;
$$;

-- 5. Add validation triggers for system_admins table (without password hashing for now)
CREATE OR REPLACE FUNCTION public.validate_admin_data()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Validate email format
  IF NOT public.validate_email_format(NEW.email) THEN
    RAISE EXCEPTION 'Invalid email format: %', NEW.email;
  END IF;
  
  -- Sanitize name
  NEW.name := public.sanitize_input(NEW.name);
  
  -- Validate name length
  IF length(NEW.name) < 2 OR length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be between 2 and 100 characters';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Drop existing trigger and create new one
DROP TRIGGER IF EXISTS validate_admin_data_trigger ON public.system_admins;
CREATE TRIGGER validate_admin_data_trigger
  BEFORE INSERT OR UPDATE ON public.system_admins
  FOR EACH ROW EXECUTE FUNCTION public.validate_admin_data();

-- 6. Create secure admin session validation function
CREATE OR REPLACE FUNCTION public.validate_admin_session_secure(
  session_token_param TEXT,
  admin_email_param TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  session_valid BOOLEAN := FALSE;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM public.admin_sessions s
    JOIN public.system_admins a ON s.admin_email = a.email
    WHERE s.session_token = session_token_param
      AND s.admin_email = admin_email_param
      AND s.is_active = true
      AND s.expires_at > now()
      AND a.is_active = true
  ) INTO session_valid;
  
  IF session_valid THEN
    UPDATE public.admin_sessions 
    SET last_activity = now()
    WHERE session_token = session_token_param;
  END IF;
  
  RETURN session_valid;
END;
$$;

-- 7. Add audit logging table
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  user_identifier TEXT,
  resource_type TEXT,
  resource_id TEXT,
  old_values JSONB,
  new_values JSONB,
  success BOOLEAN NOT NULL DEFAULT TRUE,
  error_message TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_security_audit_log_event_type ON public.security_audit_log(event_type);
CREATE INDEX IF NOT EXISTS idx_security_audit_log_created_at ON public.security_audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_security_audit_log_user ON public.security_audit_log(user_identifier);

-- RLS for audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "System admins can view audit logs" 
  ON public.security_audit_log 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.system_admins 
      WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()) 
      AND is_active = true
    )
  );

-- 8. Enhanced security audit logging function
CREATE OR REPLACE FUNCTION public.log_security_audit(
  event_type_param TEXT,
  user_identifier_param TEXT DEFAULT NULL,
  resource_type_param TEXT DEFAULT NULL,
  resource_id_param TEXT DEFAULT NULL,
  old_values_param JSONB DEFAULT NULL,
  new_values_param JSONB DEFAULT NULL,
  success_param BOOLEAN DEFAULT TRUE,
  error_message_param TEXT DEFAULT NULL,
  ip_address_param TEXT DEFAULT NULL,
  user_agent_param TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  audit_id UUID;
BEGIN
  INSERT INTO public.security_audit_log (
    event_type,
    user_identifier,
    resource_type,
    resource_id,
    old_values,
    new_values,
    success,
    error_message,
    ip_address,
    user_agent
  ) VALUES (
    event_type_param,
    user_identifier_param,
    resource_type_param,
    resource_id_param,
    old_values_param,
    new_values_param,
    success_param,
    error_message_param,
    ip_address_param::INET,
    user_agent_param
  ) RETURNING id INTO audit_id;
  
  RETURN audit_id;
END;
$$;
