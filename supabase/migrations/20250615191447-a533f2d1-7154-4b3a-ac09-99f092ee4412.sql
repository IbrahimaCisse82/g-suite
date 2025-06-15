
-- Table pour les comptes financiers (banques, caisses, monnaie électronique)
CREATE TABLE public.financial_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL,
  account_name VARCHAR(255) NOT NULL,
  account_type VARCHAR(50) NOT NULL CHECK (account_type IN ('bank', 'cash', 'electronic_money')),
  account_number VARCHAR(100),
  bank_name VARCHAR(255),
  branch VARCHAR(255),
  currency VARCHAR(10) DEFAULT 'XOF',
  current_balance NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les sites de stockage
CREATE TABLE public.storage_sites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL,
  site_name VARCHAR(255) NOT NULL,
  site_type VARCHAR(50) NOT NULL CHECK (site_type IN ('warehouse', 'store', 'depot', 'showroom')),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Sénégal',
  phone VARCHAR(50),
  manager_name VARCHAR(255),
  capacity_m2 NUMERIC,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ajouter une colonne pour suivre si la configuration initiale est terminée
ALTER TABLE public.companies 
ADD COLUMN initial_setup_completed BOOLEAN DEFAULT false;

-- Activer RLS sur les nouvelles tables
ALTER TABLE public.financial_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.storage_sites ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour financial_accounts
CREATE POLICY "Users can manage their company financial accounts" 
  ON public.financial_accounts 
  FOR ALL 
  USING (company_id = get_user_company_id(auth.uid()));

-- Politiques RLS pour storage_sites
CREATE POLICY "Users can manage their company storage sites" 
  ON public.storage_sites 
  FOR ALL 
  USING (company_id = get_user_company_id(auth.uid()));

-- Créer des triggers pour updated_at
CREATE TRIGGER update_financial_accounts_updated_at
  BEFORE UPDATE ON public.financial_accounts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_storage_sites_updated_at
  BEFORE UPDATE ON public.storage_sites
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
