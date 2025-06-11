
-- Corrections de sécurité critiques

-- 1. Compléter les politiques RLS pour trial_accounts
DROP POLICY IF EXISTS "Users can view their own trial accounts" ON public.trial_accounts;

-- Politique complète pour trial_accounts
CREATE POLICY "Users can view their own trial accounts" 
  ON public.trial_accounts 
  FOR SELECT 
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE company_id = trial_accounts.company_id));

CREATE POLICY "System can insert trial accounts" 
  ON public.trial_accounts 
  FOR INSERT 
  WITH CHECK (true); -- Les essais sont créés par le système

CREATE POLICY "System can update trial accounts" 
  ON public.trial_accounts 
  FOR UPDATE 
  USING (true); -- Les mises à jour sont faites par le système

-- 2. Sécuriser system_admins
CREATE POLICY "System admins can view themselves" 
  ON public.system_admins 
  FOR SELECT 
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- 3. Améliorer les politiques pour paid_account_requests
DROP POLICY IF EXISTS "Company admins can create requests" ON public.paid_account_requests;
CREATE POLICY "Company admins can create requests" 
  ON public.paid_account_requests 
  FOR INSERT 
  WITH CHECK (
    company_id = public.get_user_company_id(auth.uid()) AND 
    public.is_company_admin(auth.uid()) AND
    requested_by = auth.uid()
  );

-- 4. Créer une table pour les sessions admin sécurisées
CREATE TABLE public.admin_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_email TEXT NOT NULL,
  session_token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '4 hours'),
  is_active BOOLEAN DEFAULT true,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index pour les sessions admin
CREATE INDEX idx_admin_sessions_token ON public.admin_sessions(session_token);
CREATE INDEX idx_admin_sessions_expires_at ON public.admin_sessions(expires_at);

-- RLS pour admin_sessions
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage their own sessions" 
  ON public.admin_sessions 
  FOR ALL 
  USING (admin_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- 5. Fonction pour valider les sessions admin
CREATE OR REPLACE FUNCTION public.validate_admin_session(session_token_param TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_sessions 
    WHERE session_token = session_token_param 
    AND expires_at > now() 
    AND is_active = true
  );
$$;

-- 6. Fonction pour nettoyer les sessions expirées
CREATE OR REPLACE FUNCTION public.cleanup_expired_admin_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.admin_sessions 
  SET is_active = false 
  WHERE expires_at < now() AND is_active = true;
END;
$$;

-- 7. Fonction pour valider les montants financiers
CREATE OR REPLACE FUNCTION public.validate_financial_amount(amount NUMERIC)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT amount >= 0 AND amount <= 999999999.99 AND amount IS NOT NULL;
$$;

-- 8. Contraintes de sécurité pour les tables critiques
ALTER TABLE public.invoices 
ADD CONSTRAINT check_invoice_amounts 
CHECK (
  total_amount >= 0 AND 
  subtotal >= 0 AND 
  tax_amount >= 0 AND
  total_amount <= 999999999.99
);

ALTER TABLE public.purchases 
ADD CONSTRAINT check_purchase_amounts 
CHECK (
  total_amount >= 0 AND 
  subtotal >= 0 AND 
  tax_amount >= 0 AND
  total_amount <= 999999999.99
);

-- 9. Améliorer la validation des contacts
ALTER TABLE public.contacts 
ADD CONSTRAINT check_contact_email 
CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- 10. Fonction de limitation de taux basée sur la base de données
CREATE TABLE public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL, -- IP, user_id, etc.
  action_type TEXT NOT NULL, -- 'login', 'admin_login', etc.
  attempt_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  blocked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_rate_limits_identifier_action ON public.rate_limits(identifier, action_type);
CREATE INDEX idx_rate_limits_window_start ON public.rate_limits(window_start);

-- RLS pour rate_limits (table système)
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "System only access for rate limits" ON public.rate_limits FOR ALL USING (false);

-- Fonction pour vérifier les limites de taux
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  identifier_param TEXT,
  action_type_param TEXT,
  max_attempts INTEGER DEFAULT 5,
  window_minutes INTEGER DEFAULT 15
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_record public.rate_limits%ROWTYPE;
  window_start_time TIMESTAMP WITH TIME ZONE;
BEGIN
  window_start_time := now() - (window_minutes || ' minutes')::interval;
  
  -- Récupérer l'enregistrement existant
  SELECT * INTO current_record 
  FROM public.rate_limits 
  WHERE identifier = identifier_param 
    AND action_type = action_type_param;
  
  -- Si aucun enregistrement ou fenêtre expirée, créer/réinitialiser
  IF current_record IS NULL OR current_record.window_start < window_start_time THEN
    INSERT INTO public.rate_limits (identifier, action_type, attempt_count, window_start)
    VALUES (identifier_param, action_type_param, 1, now())
    ON CONFLICT (identifier, action_type) 
    DO UPDATE SET 
      attempt_count = 1,
      window_start = now(),
      blocked_until = NULL,
      updated_at = now();
    RETURN true;
  END IF;
  
  -- Vérifier si bloqué
  IF current_record.blocked_until IS NOT NULL AND current_record.blocked_until > now() THEN
    RETURN false;
  END IF;
  
  -- Incrémenter le compteur
  UPDATE public.rate_limits 
  SET 
    attempt_count = attempt_count + 1,
    blocked_until = CASE 
      WHEN attempt_count + 1 > max_attempts 
      THEN now() + (window_minutes || ' minutes')::interval
      ELSE NULL 
    END,
    updated_at = now()
  WHERE identifier = identifier_param 
    AND action_type = action_type_param;
  
  -- Retourner si sous la limite
  RETURN (current_record.attempt_count + 1) <= max_attempts;
END;
$$;
