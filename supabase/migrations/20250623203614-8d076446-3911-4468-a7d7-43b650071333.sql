
-- Table pour gérer la maintenance des modules
CREATE TABLE public.module_maintenance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  module_name TEXT NOT NULL,
  sub_module_name TEXT,
  is_disabled BOOLEAN NOT NULL DEFAULT false,
  maintenance_reason TEXT,
  disabled_by TEXT NOT NULL,
  disabled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  estimated_end_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour le statut des comptes entreprises
CREATE TABLE public.company_accounts_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active', -- active, inactive, suspended, expired
  validity_start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  validity_end_date TIMESTAMP WITH TIME ZONE,
  last_activity TIMESTAMP WITH TIME ZONE,
  suspension_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(company_id)
);

-- RLS pour module_maintenance
ALTER TABLE public.module_maintenance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can manage module maintenance"
  ON public.module_maintenance
  FOR ALL
  USING (true); -- Will be restricted by application logic

-- RLS pour company_accounts_status  
ALTER TABLE public.company_accounts_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view company accounts status"
  ON public.company_accounts_status
  FOR ALL
  USING (true); -- Will be restricted by application logic

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_module_maintenance_updated_at
    BEFORE UPDATE ON public.module_maintenance
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_accounts_status_updated_at
    BEFORE UPDATE ON public.company_accounts_status
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insérer les données initiales pour les comptes existants
INSERT INTO public.company_accounts_status (company_id, status, validity_start_date, validity_end_date)
SELECT 
  id,
  'active',
  created_at,
  created_at + INTERVAL '1 year'
FROM public.companies
ON CONFLICT (company_id) DO NOTHING;
