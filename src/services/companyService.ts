
import { supabase } from '@/integrations/supabase/client';
import type { CompanyFormData } from '@/types/company';

export const createCompany = async (data: CompanyFormData) => {
  const { data: companyData, error: companyError } = await supabase
    .from('companies')
    .insert({
      name: data.name,
      address: data.address,
      city: data.city,
      country: data.country,
      phone: data.phone,
      email: data.email,
      business_sector: data.business_sector,
      currency: data.currency || 'XOF',
      representative_first_name: data.representative_first_name,
      representative_last_name: data.representative_last_name,
      ninea: data.ninea,
      rccm: data.rccm,
      website: data.website || null,
    })
    .select()
    .single();

  if (companyError) {
    throw new Error('Erreur lors de la création de l\'entreprise: ' + companyError.message);
  }

  return companyData;
};

export const updateCompanyLogo = async (companyId: string, logoUrl: string): Promise<void> => {
  await supabase
    .from('companies')
    .update({ logo_url: logoUrl })
    .eq('id', companyId);
};
