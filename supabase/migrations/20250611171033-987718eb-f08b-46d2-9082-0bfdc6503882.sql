
-- Ajouter la colonne is_first_login à la table profiles pour gérer les premières connexions
ALTER TABLE public.profiles 
ADD COLUMN is_first_login boolean DEFAULT true;

-- Mettre à jour les profils existants pour qu'ils ne soient pas marqués comme première connexion
UPDATE public.profiles 
SET is_first_login = false 
WHERE is_first_login IS NULL;
