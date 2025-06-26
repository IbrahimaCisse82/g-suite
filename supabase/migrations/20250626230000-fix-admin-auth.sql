
-- Correction des politiques RLS pour l'authentification admin

-- 1. Corriger les politiques pour security_audit_log
DROP POLICY IF EXISTS "System can log security events" ON public.security_audit_log;
CREATE POLICY "System can log security events" 
  ON public.security_audit_log 
  FOR INSERT 
  WITH CHECK (true); -- Permet les insertions système

-- 2. Corriger les politiques pour rate_limits
DROP POLICY IF EXISTS "System only access for rate limits" ON public.rate_limits;
CREATE POLICY "System can manage rate limits" 
  ON public.rate_limits 
  FOR ALL 
  USING (true); -- Permet toutes les opérations système

-- 3. Ajouter un admin par défaut pour les tests
INSERT INTO public.system_admins (email, password, is_active, is_first_login)
VALUES ('support@g-suiteapp.com', 'Support@1946', true, false)
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  is_active = true,
  is_first_login = false;

-- 4. Corriger les politiques pour admin_sessions
DROP POLICY IF EXISTS "Admins can manage their own sessions" ON public.admin_sessions;
CREATE POLICY "System can manage admin sessions" 
  ON public.admin_sessions 
  FOR ALL 
  USING (true); -- Permet la gestion des sessions système
