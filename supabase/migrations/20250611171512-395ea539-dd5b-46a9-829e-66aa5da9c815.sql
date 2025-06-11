
-- Vérifier si les administrateurs existent
SELECT email, name, is_active FROM public.system_admins 
WHERE email IN ('i.cisse@growhubsenegal.com', 'h.ndiaye@growhubsenegal.com');

-- Si ils n'existent pas, les créer avec des noms par défaut
INSERT INTO public.system_admins (email, name, is_active)
VALUES 
  ('i.cisse@growhubsenegal.com', 'Ibrahim Cisse', true),
  ('h.ndiaye@growhubsenegal.com', 'Hawa Ndiaye', true)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  is_active = true;

-- Vérifier que les administrateurs sont bien créés
SELECT email, name, is_active FROM public.system_admins 
WHERE email IN ('i.cisse@growhubsenegal.com', 'h.ndiaye@growhubsenegal.com');
