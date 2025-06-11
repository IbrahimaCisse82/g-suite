
-- Ajouter la colonne password à la table system_admins
ALTER TABLE public.system_admins 
ADD COLUMN password TEXT;

-- Ajouter la colonne is_first_login pour gérer les premières connexions
ALTER TABLE public.system_admins 
ADD COLUMN is_first_login BOOLEAN DEFAULT true;

-- Insérer les comptes administrateurs par défaut avec le mot de passe par défaut
INSERT INTO public.system_admins (email, name, password, is_first_login, is_active) 
VALUES 
  ('i.cisse@growhubsenegal.com', 'Ibrahim Cisse', NULL, true, true),
  ('h.ndiaye@growhubsenegal.com', 'Hassane Ndiaye', NULL, true, true)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  is_active = true;
