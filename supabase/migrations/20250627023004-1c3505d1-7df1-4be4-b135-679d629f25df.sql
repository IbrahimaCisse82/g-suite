
-- Create treasury accounts table
CREATE TABLE public.treasury_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) NOT NULL,
  account_name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('bank', 'cash', 'electronic_money')),
  account_number TEXT,
  bank_name TEXT,
  branch TEXT,
  currency TEXT DEFAULT 'XOF',
  current_balance NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add account_id column to treasury_transactions
ALTER TABLE public.treasury_transactions 
ADD COLUMN account_id UUID REFERENCES public.treasury_accounts(id);

-- Enable RLS on treasury_accounts
ALTER TABLE public.treasury_accounts ENABLE ROW LEVEL SECURITY;

-- Create policy for treasury_accounts
CREATE POLICY "Company members can manage treasury accounts" ON public.treasury_accounts
  USING (company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_treasury_accounts_updated_at
  BEFORE UPDATE ON public.treasury_accounts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update existing treasury_transactions to link with accounts
-- This will help maintain data integrity
UPDATE public.treasury_transactions 
SET account_id = NULL 
WHERE account_id IS NULL;
