
-- Activer RLS sur la table companies
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Vérifier que les politiques existantes sont correctement appliquées
-- Les politiques suivantes devraient déjà exister :
-- - "Company admins can update their company"
-- - "Users can view their company" 
-- - "Users can view their own company"

-- Si nécessaire, recréer la politique d'insertion pour l'inscription des entreprises
DROP POLICY IF EXISTS "Allow company creation during registration" ON public.companies;
CREATE POLICY "Allow company creation during registration" 
ON public.companies 
FOR INSERT 
WITH CHECK (true);
