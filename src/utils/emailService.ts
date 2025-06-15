
import { supabase } from '@/integrations/supabase/client';
import type { CompanyFormData } from '@/types/company';

export const sendLicenseRequest = async (
  data: CompanyFormData, 
  selectedModule: string
): Promise<void> => {
  await supabase.functions.invoke('send-license-request', {
    body: {
      companyName: data.name,
      companyEmail: data.email,
      contactName: `${data.representative_title} ${data.representative_first_name} ${data.representative_last_name}`,
      selectedModule: selectedModule,
      address: data.address,
      city: data.city,
      country: data.country,
      phone: data.phone,
      businessSector: data.business_sector,
      currency: data.currency,
      website: data.website,
      ninea: data.ninea,
      rccm: data.rccm,
    },
  });
};
