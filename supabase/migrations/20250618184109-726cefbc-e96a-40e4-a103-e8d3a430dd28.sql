
-- Add missing columns to existing tables
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS unit_price NUMERIC DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_company_admin BOOLEAN DEFAULT false;

-- Create trial_accounts table that's being referenced
CREATE TABLE IF NOT EXISTS public.trial_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policy for trial_accounts
ALTER TABLE public.trial_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company members can manage trial_accounts" ON public.trial_accounts
  USING (company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid()));
