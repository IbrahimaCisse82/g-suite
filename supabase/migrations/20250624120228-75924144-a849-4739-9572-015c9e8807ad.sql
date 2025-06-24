
-- Corriger le warning "Function Search Path Mutable" en ajoutant SET search_path = ''
-- Ceci empêche les attaques par injection de schéma

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
