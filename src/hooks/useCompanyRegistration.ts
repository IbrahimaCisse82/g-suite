
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type BusinessSector = Database['public']['Enums']['business_sector'];

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

export const useCompanyRegistration = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const uploadLogo = async (companyId: string, file: File): Promise<string | null> => {
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

  const submitForm = async (data: CompanyFormData, logoFile: File | null, selectedModule: string) => {
    console.log('Début de la soumission du formulaire:', data, 'Module sélectionné:', selectedModule);
    setIsLoading(true);
    
    try {
      // Créer l'entreprise d'abord
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
          currency: data.currency,
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

      // Upload logo si fourni
      if (logoFile) {
        const logoUrl = await uploadLogo(companyData.id, logoFile);
        if (logoUrl) {
          await supabase
            .from('companies')
            .update({ logo_url: logoUrl })
            .eq('id', companyData.id);
        }
      }

      // Envoyer la demande de clé licence par email
      try {
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

        toast({
          title: 'Demande envoyée avec succès',
          description: 'Votre demande de clé licence a été envoyée à notre équipe support. Vous recevrez une confirmation par email et votre clé licence dans les 24h.',
        });

      } catch (emailError) {
        console.error('Erreur envoi email:', emailError);
        toast({
          title: 'Entreprise créée',
          description: 'Votre entreprise a été créée mais l\'email de demande n\'a pas pu être envoyé. Veuillez contacter support@g-suite.com.',
          variant: 'destructive',
        });
      }

      onSuccess?.();
      
    } catch (error) {
      console.error('Erreur inattendue:', error);
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur inattendue s\'est produite',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    submitForm,
  };
};
