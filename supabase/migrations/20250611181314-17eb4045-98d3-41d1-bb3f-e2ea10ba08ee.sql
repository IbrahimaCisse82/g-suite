
-- Ajouter la colonne currency à la table companies
ALTER TABLE public.companies 
ADD COLUMN currency TEXT DEFAULT 'XOF';
