
-- Corriger la structure de la table contacts
-- 1. Ajouter les contraintes manquantes
ALTER TABLE public.contacts 
ADD CONSTRAINT fk_contacts_company 
FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE CASCADE;

-- 2. Corriger les types de colonnes pour correspondre aux migrations existantes
ALTER TABLE public.contacts 
ALTER COLUMN type SET DEFAULT 'client';

-- 3. Ajouter des colonnes manquantes si elles n'existent pas
ALTER TABLE public.contacts 
ADD COLUMN IF NOT EXISTS siret VARCHAR(50),
ADD COLUMN IF NOT EXISTS tax_number VARCHAR(50),
ADD COLUMN IF NOT EXISTS postal_code VARCHAR(20);

-- 4. Activer RLS sur la table contacts si ce n'est pas déjà fait
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 5. Supprimer les anciennes politiques et créer de nouvelles politiques RLS corrigées
DROP POLICY IF EXISTS "Users can manage contacts in their company" ON public.contacts;

-- Créer des politiques RLS spécifiques pour chaque opération
CREATE POLICY "Users can view contacts in their company" ON public.contacts
FOR SELECT USING (
  company_id IN (
    SELECT company_id FROM public.profiles WHERE id = auth.uid()
  )
);

CREATE POLICY "Users can insert contacts in their company" ON public.contacts
FOR INSERT WITH CHECK (
  company_id IN (
    SELECT company_id FROM public.profiles WHERE id = auth.uid()
  )
);

CREATE POLICY "Users can update contacts in their company" ON public.contacts
FOR UPDATE USING (
  company_id IN (
    SELECT company_id FROM public.profiles WHERE id = auth.uid()
  )
);

CREATE POLICY "Users can delete contacts in their company" ON public.contacts
FOR DELETE USING (
  company_id IN (
    SELECT company_id FROM public.profiles WHERE id = auth.uid()
  )
);

-- 6. Vérifier que la contrainte d'unicité sur contact_number existe
CREATE UNIQUE INDEX IF NOT EXISTS idx_contacts_contact_number_company 
ON public.contacts(contact_number, company_id) 
WHERE contact_number IS NOT NULL;

-- 7. S'assurer que les triggers pour updated_at fonctionnent
DROP TRIGGER IF EXISTS update_contacts_updated_at ON public.contacts;
CREATE TRIGGER update_contacts_updated_at 
BEFORE UPDATE ON public.contacts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
