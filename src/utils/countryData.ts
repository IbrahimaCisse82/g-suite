
export interface CountryData {
  name: string;
  code: string;
  phoneCode: string;
  currency: string;
}

export const COUNTRIES: CountryData[] = [
  { name: 'France', code: 'FR', phoneCode: '+33', currency: 'EUR' },
  { name: 'Sénégal', code: 'SN', phoneCode: '+221', currency: 'XOF' },
  { name: 'Côte d\'Ivoire', code: 'CI', phoneCode: '+225', currency: 'XOF' },
  { name: 'Mali', code: 'ML', phoneCode: '+223', currency: 'XOF' },
  { name: 'Burkina Faso', code: 'BF', phoneCode: '+226', currency: 'XOF' },
  { name: 'Niger', code: 'NE', phoneCode: '+227', currency: 'XOF' },
  { name: 'Guinée', code: 'GN', phoneCode: '+224', currency: 'GNF' },
  { name: 'Bénin', code: 'BJ', phoneCode: '+229', currency: 'XOF' },
  { name: 'Togo', code: 'TG', phoneCode: '+228', currency: 'XOF' },
  { name: 'Mauritanie', code: 'MR', phoneCode: '+222', currency: 'MRU' },
  { name: 'Maroc', code: 'MA', phoneCode: '+212', currency: 'MAD' },
  { name: 'Tunisie', code: 'TN', phoneCode: '+216', currency: 'TND' },
  { name: 'Algérie', code: 'DZ', phoneCode: '+213', currency: 'DZD' },
  { name: 'Cameroun', code: 'CM', phoneCode: '+237', currency: 'XAF' },
  { name: 'Gabon', code: 'GA', phoneCode: '+241', currency: 'XAF' },
  { name: 'République du Congo', code: 'CG', phoneCode: '+242', currency: 'XAF' },
  { name: 'République démocratique du Congo', code: 'CD', phoneCode: '+243', currency: 'CDF' },
  { name: 'Madagascar', code: 'MG', phoneCode: '+261', currency: 'MGA' },
];

export const getCountryByName = (countryName: string): CountryData | undefined => {
  return COUNTRIES.find(country => country.name === countryName);
};

export const CURRENCIES = [
  { code: 'EUR', name: 'Euro (EUR)' },
  { code: 'XOF', name: 'Franc CFA BCEAO (XOF)' },
  { code: 'XAF', name: 'Franc CFA BEAC (XAF)' },
  { code: 'GNF', name: 'Franc guinéen (GNF)' },
  { code: 'MRU', name: 'Ouguiya mauritanien (MRU)' },
  { code: 'MAD', name: 'Dirham marocain (MAD)' },
  { code: 'TND', name: 'Dinar tunisien (TND)' },
  { code: 'DZD', name: 'Dinar algérien (DZD)' },
  { code: 'CDF', name: 'Franc congolais (CDF)' },
  { code: 'MGA', name: 'Ariary malgache (MGA)' },
];
