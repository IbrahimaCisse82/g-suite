
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

export interface CompanyFormData {
  name: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  email: string;
  business_sector: BusinessSector;
  currency: string;
  representative_title: 'M.' | 'Mme' | 'Mlle';
  representative_first_name: string;
  representative_last_name: string;
  ninea?: string;
  rccm?: string;
  website?: string;
}
