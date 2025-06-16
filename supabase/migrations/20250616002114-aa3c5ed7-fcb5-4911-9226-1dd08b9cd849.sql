
-- Correction des warnings "Function Search Path Mutable" en ajoutant SET search_path = ''
-- Ceci empêche les attaques par injection de schéma

-- 1. Corriger update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 2. Corriger get_user_company_id
CREATE OR REPLACE FUNCTION public.get_user_company_id(user_id uuid)
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT company_id FROM public.profiles WHERE id = user_id;
$$;

-- 3. Corriger is_company_admin
CREATE OR REPLACE FUNCTION public.is_company_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT is_company_admin FROM public.profiles WHERE id = user_id;
$$;

-- 4. Corriger is_system_admin
CREATE OR REPLACE FUNCTION public.is_system_admin(user_email text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.system_admins 
    WHERE email = user_email AND is_active = true
  );
$$;

-- 5. Corriger cleanup_expired_trials
CREATE OR REPLACE FUNCTION public.cleanup_expired_trials()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Marquer les essais expirés comme inactifs
  UPDATE public.trial_accounts 
  SET is_active = false 
  WHERE expires_at < now() AND is_active = true;
END;
$$;

-- 6. Corriger is_trial_valid
CREATE OR REPLACE FUNCTION public.is_trial_valid(trial_token_param TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.trial_accounts 
    WHERE trial_token = trial_token_param 
    AND expires_at > now() 
    AND is_active = true
  );
$$;

-- 7. Corriger handle_new_user (cette fonction existe aussi)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  );
  RETURN new;
END;
$$;
