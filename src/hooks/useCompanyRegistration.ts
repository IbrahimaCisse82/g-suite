
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

  const submitForm = async (data: CompanyFormData, logoFile: File | null) => {
    console.log('Début de la soumission du formulaire:', data);
    setIsLoading(true);
    
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('Erreur utilisateur:', userError);
        toast({
          title: 'Erreur',
          description: 'Vous devez être connecté pour créer une entreprise',
          variant: 'destructive',
        });
        return;
      }

      console.log('Utilisateur connecté:', user.id);

      // Create company first
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
        console.error('Erreur création entreprise:', companyError);
        toast({
          title: 'Erreur',
          description: 'Erreur lors de la création de l\'entreprise: ' + companyError.message,
          variant: 'destructive',
        });
        return;
      }

      console.log('Entreprise créée:', companyData);

      // Upload logo if provided
      let logoUrl = null;
      if (logoFile) {
        logoUrl = await uploadLogo(companyData.id, logoFile);
        if (logoUrl) {
          // Update company with logo URL
          const { error: logoUpdateError } = await supabase
            .from('companies')
            .update({ logo_url: logoUrl })
            .eq('id', companyData.id);

          if (logoUpdateError) {
            console.error('Erreur mise à jour logo:', logoUpdateError);
          }
        }
      }

      // Update user profile to link to company and make them admin
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          company_id: companyData.id,
          is_company_admin: true,
        })
        .eq('id', user.id);

      if (profileError) {
        console.error('Erreur mise à jour profil:', profileError);
        toast({
          title: 'Attention',
          description: 'L\'entreprise a été créée mais votre profil n\'a pas pu être mis à jour',
          variant: 'destructive',
        });
      }

      console.log('Profil mis à jour avec succès');

      toast({
        title: 'Succès',
        description: 'Votre entreprise a été créée avec succès !',
      });

      onSuccess?.();
      
    } catch (error) {
      console.error('Erreur inattendue:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur inattendue s\'est produite',
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
