
-- Ajouter la colonne contact_number à la table contacts
ALTER TABLE public.contacts 
ADD COLUMN contact_number VARCHAR(50);

-- Créer un index unique pour garantir l'unicité des numéros de contact
CREATE UNIQUE INDEX idx_contacts_contact_number_company 
ON public.contacts(contact_number, company_id) 
WHERE contact_number IS NOT NULL;

-- Mettre à jour les contacts existants avec des numéros uniques en utilisant une approche différente
WITH numbered_contacts AS (
  SELECT 
    id,
    CASE 
      WHEN type = 'client' THEN 'C' || LPAD(ROW_NUMBER() OVER (PARTITION BY company_id, type ORDER BY created_at)::text, 3, '0')
      WHEN type = 'fournisseur' THEN 'F' || LPAD(ROW_NUMBER() OVER (PARTITION BY company_id, type ORDER BY created_at)::text, 3, '0')
      ELSE 'CT' || LPAD(ROW_NUMBER() OVER (PARTITION BY company_id ORDER BY created_at)::text, 3, '0')
    END as new_contact_number
  FROM public.contacts
  WHERE contact_number IS NULL
)
UPDATE public.contacts 
SET contact_number = numbered_contacts.new_contact_number
FROM numbered_contacts
WHERE contacts.id = numbered_contacts.id;
