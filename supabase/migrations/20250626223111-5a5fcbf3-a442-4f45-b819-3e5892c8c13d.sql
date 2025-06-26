
-- Vérifier et corriger la configuration d'authentification admin

-- 1. S'assurer que la table system_admins existe et a les bonnes données
INSERT INTO public.system_admins (email, password, name, is_active, is_first_login)
VALUES ('support@g-suiteapp.com', 'Support@1946', 'Support Admin', true, false)
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  name = EXCLUDED.name,
  is_active = true,
  is_first_login = false;

-- 2. S'assurer que les politiques RLS permettent l'accès système
DROP POLICY IF EXISTS "System can manage admin sessions" ON public.admin_sessions;
CREATE POLICY "System can manage admin sessions" 
  ON public.admin_sessions 
  FOR ALL 
  USING (true);

DROP POLICY IF EXISTS "System can log security events" ON public.security_audit_log;
CREATE POLICY "System can log security events" 
  ON public.security_audit_log 
  FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "System can manage rate limits" ON public.rate_limits;
CREATE POLICY "System can manage rate limits" 
  ON public.rate_limits 
  FOR ALL 
  USING (true);

-- 3. Ajouter une politique pour permettre l'accès aux admins système
DROP POLICY IF EXISTS "System can access admin data" ON public.system_admins;
CREATE POLICY "System can access admin data" 
  ON public.system_admins 
  FOR SELECT 
  USING (true);
