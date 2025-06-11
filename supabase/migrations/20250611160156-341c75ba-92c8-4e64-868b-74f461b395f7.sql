
-- Create security definer functions to prevent RLS recursion
CREATE OR REPLACE FUNCTION public.get_user_company_id(user_id uuid)
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT company_id FROM public.profiles WHERE id = user_id;
$$;

CREATE OR REPLACE FUNCTION public.is_company_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT is_company_admin FROM public.profiles WHERE id = user_id;
$$;

CREATE OR REPLACE FUNCTION public.is_system_admin(user_email text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.system_admins 
    WHERE email = user_email AND is_active = true
  );
$$;

-- Update RLS policies for contacts
DROP POLICY IF EXISTS "Users can manage contacts in their company" ON public.contacts;
CREATE POLICY "Users can manage contacts in their company" ON public.contacts
FOR ALL USING (
  company_id = public.get_user_company_id(auth.uid())
);

-- Update RLS policies for chart_of_accounts
DROP POLICY IF EXISTS "Users can manage chart of accounts in their company" ON public.chart_of_accounts;
CREATE POLICY "Users can manage chart of accounts in their company" ON public.chart_of_accounts
FOR ALL USING (
  company_id = public.get_user_company_id(auth.uid())
);

-- Update RLS policies for invoices
DROP POLICY IF EXISTS "Users can manage invoices in their company" ON public.invoices;
CREATE POLICY "Users can manage invoices in their company" ON public.invoices
FOR ALL USING (
  company_id = public.get_user_company_id(auth.uid())
);

-- Update RLS policies for invoice_lines
DROP POLICY IF EXISTS "Users can manage invoice lines in their company" ON public.invoice_lines;
CREATE POLICY "Users can manage invoice lines in their company" ON public.invoice_lines
FOR ALL USING (
  invoice_id IN (
    SELECT id FROM public.invoices 
    WHERE company_id = public.get_user_company_id(auth.uid())
  )
);

-- Update RLS policies for purchases
DROP POLICY IF EXISTS "Users can manage purchases in their company" ON public.purchases;
CREATE POLICY "Users can manage purchases in their company" ON public.purchases
FOR ALL USING (
  company_id = public.get_user_company_id(auth.uid())
);

-- Update RLS policies for purchase_lines
DROP POLICY IF EXISTS "Users can manage purchase lines in their company" ON public.purchase_lines;
CREATE POLICY "Users can manage purchase lines in their company" ON public.purchase_lines
FOR ALL USING (
  purchase_id IN (
    SELECT id FROM public.purchases 
    WHERE company_id = public.get_user_company_id(auth.uid())
  )
);

-- Update RLS policies for journal_entries
DROP POLICY IF EXISTS "Users can manage journal entries in their company" ON public.journal_entries;
CREATE POLICY "Users can manage journal entries in their company" ON public.journal_entries
FOR ALL USING (
  company_id = public.get_user_company_id(auth.uid())
);

-- Update RLS policies for journal_entry_lines
DROP POLICY IF EXISTS "Users can manage journal entry lines in their company" ON public.journal_entry_lines;
CREATE POLICY "Users can manage journal entry lines in their company" ON public.journal_entry_lines
FOR ALL USING (
  journal_entry_id IN (
    SELECT id FROM public.journal_entries 
    WHERE company_id = public.get_user_company_id(auth.uid())
  )
);

-- Update RLS policies for cash_transactions
DROP POLICY IF EXISTS "Users can manage cash transactions in their company" ON public.cash_transactions;
CREATE POLICY "Users can manage cash transactions in their company" ON public.cash_transactions
FOR ALL USING (
  company_id = public.get_user_company_id(auth.uid())
);

-- Update RLS policies for product_categories
DROP POLICY IF EXISTS "Users can manage product categories in their company" ON public.product_categories;
CREATE POLICY "Users can manage product categories in their company" ON public.product_categories
FOR ALL USING (
  company_id = public.get_user_company_id(auth.uid())
);

-- Update RLS policies for products
DROP POLICY IF EXISTS "Users can manage products in their company" ON public.products;
CREATE POLICY "Users can manage products in their company" ON public.products
FOR ALL USING (
  company_id = public.get_user_company_id(auth.uid())
);

-- Update RLS policies for product_stock
DROP POLICY IF EXISTS "Users can manage product stock in their company" ON public.product_stock;
CREATE POLICY "Users can manage product stock in their company" ON public.product_stock
FOR ALL USING (
  company_id = public.get_user_company_id(auth.uid())
);

-- Update RLS policies for stock_movements
DROP POLICY IF EXISTS "Users can manage stock movements in their company" ON public.stock_movements;
CREATE POLICY "Users can manage stock movements in their company" ON public.stock_movements
FOR ALL USING (
  company_id = public.get_user_company_id(auth.uid())
);

-- Update RLS policies for deliveries
DROP POLICY IF EXISTS "Users can manage deliveries in their company" ON public.deliveries;
CREATE POLICY "Users can manage deliveries in their company" ON public.deliveries
FOR ALL USING (
  company_id = public.get_user_company_id(auth.uid())
);

-- Update RLS policies for delivery_lines
DROP POLICY IF EXISTS "Users can manage delivery lines in their company" ON public.delivery_lines;
CREATE POLICY "Users can manage delivery lines in their company" ON public.delivery_lines
FOR ALL USING (
  delivery_id IN (
    SELECT id FROM public.deliveries 
    WHERE company_id = public.get_user_company_id(auth.uid())
  )
);

-- Update RLS policies for companies
DROP POLICY IF EXISTS "Users can view their own company" ON public.companies;
DROP POLICY IF EXISTS "Company admins can update their company" ON public.companies;

CREATE POLICY "Users can view their own company" ON public.companies
FOR SELECT USING (
  id = public.get_user_company_id(auth.uid())
);

CREATE POLICY "Company admins can update their company" ON public.companies
FOR UPDATE USING (
  id = public.get_user_company_id(auth.uid()) AND 
  public.is_company_admin(auth.uid())
);

-- Update RLS policies for profiles
DROP POLICY IF EXISTS "Users can view profiles in their company" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can view profiles in their company" ON public.profiles
FOR SELECT USING (
  company_id = public.get_user_company_id(auth.uid()) OR
  id = auth.uid()
);

CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE USING (id = auth.uid());

-- Update RLS policies for user_invitations
DROP POLICY IF EXISTS "Company admins can manage invitations" ON public.user_invitations;
DROP POLICY IF EXISTS "Anyone can view invitations by token" ON public.user_invitations;

CREATE POLICY "Company admins can manage invitations" ON public.user_invitations
FOR ALL USING (
  company_id = public.get_user_company_id(auth.uid()) AND 
  public.is_company_admin(auth.uid())
);

CREATE POLICY "Public can view invitations by token" ON public.user_invitations
FOR SELECT USING (true);

-- Update RLS policies for paid_account_requests
DROP POLICY IF EXISTS "Users can view their company's requests" ON public.paid_account_requests;
DROP POLICY IF EXISTS "Company admins can create requests" ON public.paid_account_requests;

CREATE POLICY "Users can view their company's requests" ON public.paid_account_requests
FOR SELECT USING (
  company_id = public.get_user_company_id(auth.uid())
);

CREATE POLICY "Company admins can create requests" ON public.paid_account_requests
FOR INSERT WITH CHECK (
  company_id = public.get_user_company_id(auth.uid()) AND 
  public.is_company_admin(auth.uid())
);

-- Update RLS policies for company_subscriptions
DROP POLICY IF EXISTS "Users can view their company's subscription" ON public.company_subscriptions;

CREATE POLICY "Users can view their company's subscription" ON public.company_subscriptions
FOR SELECT USING (
  company_id = public.get_user_company_id(auth.uid())
);

-- System admins policies (restrictive access)
CREATE POLICY "System admins only" ON public.system_admins
FOR SELECT USING (
  public.is_system_admin((SELECT email FROM auth.users WHERE id = auth.uid()))
);

-- Add admin-only policies for managing requests
CREATE POLICY "System admins can manage requests" ON public.paid_account_requests
FOR UPDATE USING (
  public.is_system_admin((SELECT email FROM auth.users WHERE id = auth.uid()))
);

-- Ensure all subscription plans are readable by authenticated users
DROP POLICY IF EXISTS "Anyone can view active subscription plans" ON public.subscription_plans;
CREATE POLICY "Authenticated users can view active subscription plans" ON public.subscription_plans
FOR SELECT TO authenticated USING (is_active = true);
