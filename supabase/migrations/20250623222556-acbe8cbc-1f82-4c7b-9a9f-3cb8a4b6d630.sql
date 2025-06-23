
-- Add missing columns to companies table for legal form and other business info
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS forme_juridique TEXT,
ADD COLUMN IF NOT EXISTS business_sector TEXT,
ADD COLUMN IF NOT EXISTS representative_title TEXT,
ADD COLUMN IF NOT EXISTS representative_first_name TEXT,
ADD COLUMN IF NOT EXISTS representative_last_name TEXT,
ADD COLUMN IF NOT EXISTS ninea TEXT,
ADD COLUMN IF NOT EXISTS rccm TEXT,
ADD COLUMN IF NOT EXISTS website TEXT;

-- Add constraints for forme_juridique
ALTER TABLE companies 
ADD CONSTRAINT companies_forme_juridique_check 
CHECK (forme_juridique IN (
  'entreprise_individuelle', 'gie', 'sarl', 'sa', 'snc', 'scs',
  'societe_civile', 'sas', 'societe_sans_personnalite_juridique'
));

-- Add constraints for business_sector
ALTER TABLE companies 
ADD CONSTRAINT companies_business_sector_check 
CHECK (business_sector IN (
  'agriculture', 'industrie', 'construction', 'commerce', 'transport',
  'hebergement_restauration', 'information_communication', 'activites_financieres',
  'immobilier', 'activites_specialisees', 'administration_publique',
  'enseignement', 'sante_action_sociale', 'arts_spectacles', 'autres_services'
));

-- Add constraints for representative_title
ALTER TABLE companies 
ADD CONSTRAINT companies_representative_title_check 
CHECK (representative_title IN ('M.', 'Mme', 'Mlle'));
