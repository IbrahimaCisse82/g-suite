
import { supabase } from '@/integrations/supabase/client';

export const uploadLogo = async (companyId: string, file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${companyId}/logo.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('company-logos')
      .upload(fileName, file, {
        upsert: true
      });

    if (uploadError) {
      console.error('Erreur upload logo:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('company-logos')
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (error) {
    console.error('Erreur inattendue upload logo:', error);
    return null;
  }
};
