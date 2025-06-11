
-- Créer un enum pour les types de plans
CREATE TYPE public.plan_type AS ENUM (
  'free',
  'premium',
  'enterprise'
);

-- Créer un enum pour les statuts de demande
CREATE TYPE public.request_status AS ENUM (
  'pending',
  'approved',
  'rejected',
  'expired'
);

-- Table pour les plans d'abonnement
CREATE TABLE public.subscription_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  plan_type plan_type NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration_months INTEGER NOT NULL,
  max_users INTEGER,
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les demandes de comptes payants
CREATE TABLE public.paid_account_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) NOT NULL,
  requested_by UUID REFERENCES public.profiles(id) NOT NULL,
  plan_id UUID REFERENCES public.subscription_plans(id) NOT NULL,
  status request_status DEFAULT 'pending',
  request_message TEXT,
  admin_notes TEXT,
  processed_by VARCHAR(255),
  processed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les abonnements actifs
CREATE TABLE public.company_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) NOT NULL,
  plan_id UUID REFERENCES public.subscription_plans(id) NOT NULL,
  request_id UUID REFERENCES public.paid_account_requests(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer un index unique partiel pour s'assurer qu'une seule souscription active par entreprise
CREATE UNIQUE INDEX unique_active_subscription_per_company 
ON public.company_subscriptions (company_id) 
WHERE is_active = true;

-- Table pour les administrateurs système
CREATE TABLE public.system_admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insérer les administrateurs par défaut
INSERT INTO public.system_admins (email, name) VALUES 
('h.ndiaye@growhubsenegal.com', 'H. Ndiaye'),
('i.cisse@growhubsenegal.com', 'I. Cisse');

-- Insérer quelques plans par défaut
INSERT INTO public.subscription_plans (name, plan_type, price, duration_months, max_users, features) VALUES 
('Plan Gratuit', 'free', 0, 12, 1, '{"invoices": 10, "storage": "1GB", "support": "email"}'),
('Plan Premium', 'premium', 50000, 12, 5, '{"invoices": "unlimited", "storage": "10GB", "support": "priority", "advanced_reports": true}'),
('Plan Entreprise', 'enterprise', 150000, 12, 20, '{"invoices": "unlimited", "storage": "50GB", "support": "dedicated", "advanced_reports": true, "api_access": true}');

-- Activer RLS sur toutes les nouvelles tables
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paid_account_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_admins ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les plans d'abonnement (lecture publique)
CREATE POLICY "Anyone can view active subscription plans" ON public.subscription_plans
FOR SELECT USING (is_active = true);

-- Politiques RLS pour les demandes de comptes payants
CREATE POLICY "Users can view their company's requests" ON public.paid_account_requests
FOR SELECT USING (
  company_id IN (
    SELECT company_id FROM public.profiles WHERE id = auth.uid()
  )
);

CREATE POLICY "Company admins can create requests" ON public.paid_account_requests
FOR INSERT WITH CHECK (
  company_id IN (
    SELECT company_id FROM public.profiles 
    WHERE id = auth.uid() AND is_company_admin = true
  )
);

-- Politiques RLS pour les abonnements
CREATE POLICY "Users can view their company's subscription" ON public.company_subscriptions
FOR SELECT USING (
  company_id IN (
    SELECT company_id FROM public.profiles WHERE id = auth.uid()
  )
);

-- Politiques RLS pour les administrateurs système (accès restreint)
CREATE POLICY "Only system admins can view admin list" ON public.system_admins
FOR SELECT USING (false);

-- Triggers pour updated_at
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON public.subscription_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_paid_account_requests_updated_at BEFORE UPDATE ON public.paid_account_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_subscriptions_updated_at BEFORE UPDATE ON public.company_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
