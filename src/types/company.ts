
export type BusinessSector = 
  | 'agriculture'
  | 'industrie'
  | 'construction'
  | 'commerce'
  | 'transport'
  | 'hebergement_restauration'
  | 'information_communication'
  | 'activites_financieres'
  | 'immobilier'
  | 'activites_specialisees'
  | 'administration_publique'
  | 'enseignement'
  | 'sante_action_sociale'
  | 'arts_spectacles'
  | 'autres_services';

export type LegalForm = 
  | 'entreprise_individuelle'
  | 'gie'
  | 'sarl'
  | 'sa'
  | 'snc'
  | 'scs'
  | 'societe_civile'
  | 'sas'
  | 'societe_sans_personnalite_juridique';

export interface CompanyFormData {
  name: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  email: string;
  business_sector: BusinessSector;
  forme_juridique: LegalForm;
  currency: string;
  representative_title: 'M.' | 'Mme' | 'Mlle';
  representative_first_name: string;
  representative_last_name: string;
  ninea?: string;
  rccm?: string;
  website?: string;
}
