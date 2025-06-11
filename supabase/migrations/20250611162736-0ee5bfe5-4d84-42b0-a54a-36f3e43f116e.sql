
-- Table pour gérer les comptes d'essai
CREATE TABLE public.trial_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  trial_token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '5 days'),
  activated_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT false,
  expiry_email_sent BOOLEAN DEFAULT false
);

-- Index pour améliorer les performances
CREATE INDEX idx_trial_accounts_expires_at ON public.trial_accounts(expires_at);
CREATE INDEX idx_trial_accounts_token ON public.trial_accounts(trial_token);

-- Activer RLS
ALTER TABLE public.trial_accounts ENABLE ROW LEVEL SECURITY;

-- Politique pour que les utilisateurs ne voient que leurs propres essais
CREATE POLICY "Users can view their own trial accounts" 
  ON public.trial_accounts 
  FOR SELECT 
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE company_id = trial_accounts.company_id));

-- Fonction pour nettoyer les essais expirés
CREATE OR REPLACE FUNCTION public.cleanup_expired_trials()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Marquer les essais expirés comme inactifs
  UPDATE public.trial_accounts 
  SET is_active = false 
  WHERE expires_at < now() AND is_active = true;
END;
$$;

-- Fonction pour vérifier si un essai est valide
CREATE OR REPLACE FUNCTION public.is_trial_valid(trial_token_param TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.trial_accounts 
    WHERE trial_token = trial_token_param 
    AND expires_at > now() 
    AND is_active = true
  );
$$;
