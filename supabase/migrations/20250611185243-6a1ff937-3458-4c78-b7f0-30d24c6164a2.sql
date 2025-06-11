
-- Permettre l'insertion dans la table companies pendant l'inscription
CREATE POLICY "Allow company creation during registration" 
ON public.companies 
FOR INSERT 
WITH CHECK (true);

-- Politique pour permettre la lecture des entreprises par leurs membres
CREATE POLICY "Users can view their company" 
ON public.companies 
FOR SELECT 
USING (
  id IN (
    SELECT company_id 
    FROM public.profiles 
    WHERE id = auth.uid()
  )
);

-- Activer RLS sur la table companies si ce n'est pas déjà fait
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
