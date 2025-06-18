
-- Ajouter le nouveau compte administrateur support
INSERT INTO public.system_admins (email, name, password, is_first_login, is_active) 
VALUES 
  ('support@g-suiteapp.com', 'Support G-Suite', 'Support@1946', false, true)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  password = EXCLUDED.password,
  is_first_login = false,
  is_active = true;
