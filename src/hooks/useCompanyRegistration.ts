
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

  const submitForm = async (data: CompanyFormData, logoFile: File | null, accountType: 'demo' | 'paid' = 'paid') => {
    console.log('Début de la soumission du formulaire:', data, 'Type de compte:', accountType);
    setIsLoading(true);
    
    try {
      if (accountType === 'demo') {
        // Processus pour compte démo - accès immédiat
        
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

        // Créer un compte utilisateur pour l'accès démo
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: 'TempDemo123!', // Mot de passe temporaire pour démo
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: {
              first_name: data.representative_first_name,
              last_name: data.representative_last_name,
            },
          },
        });

        if (authError || !authData.user) {
          throw new Error('Erreur lors de la création du compte utilisateur: ' + authError?.message);
        }

        // Mettre à jour le profil utilisateur
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            company_id: companyData.id,
            is_company_admin: true,
          })
          .eq('id', authData.user.id);

        if (profileError) {
          console.error('Erreur mise à jour profil:', profileError);
        }

        // Créer un compte d'essai actif
        const { error: trialError } = await supabase
          .from('trial_accounts')
          .insert({
            company_id: companyData.id,
            email: data.email,
            trial_token: crypto.randomUUID(),
            is_active: true,
          });

        if (trialError) {
          console.error('Erreur création essai:', trialError);
        }

        // Envoyer l'email de notification pour compte démo
        try {
          await supabase.functions.invoke('send-trial-access', {
            body: {
              companyId: companyData.id,
              email: data.email,
              companyName: data.name,
            },
          });
        } catch (emailError) {
          console.error('Erreur envoi email démo:', emailError);
        }

        // Se déconnecter pour rediriger vers la création de mot de passe
        await supabase.auth.signOut();

        toast({
          title: 'Compte démo créé',
          description: 'Votre compte démo a été créé avec succès ! Vous allez recevoir un email pour créer votre mot de passe et accéder à l\'application.',
        });

      } else {
        // Processus pour compte payant - demande de validation
        
        // Créer l'entreprise sans utilisateur pour l'instant
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

        // Récupérer un plan payant par défaut
        const { data: defaultPlan } = await supabase
          .from('subscription_plans')
          .select('id, name, price')
          .eq('plan_type', 'premium')
          .eq('is_active', true)
          .limit(1)
          .single();

        if (defaultPlan) {
          // Créer une demande de compte payant
          const { error: requestError } = await supabase
            .from('paid_account_requests')
            .insert({
              company_id: companyData.id,
              requested_by: companyData.id, // Sera mis à jour lors de la validation
              plan_id: defaultPlan.id,
              request_message: 'Demande de compte payant lors de l\'inscription',
              status: 'pending',
            });

          if (requestError) {
            console.error('Erreur création demande:', requestError);
          }

          // Envoyer l'email de confirmation de demande
          try {
            await supabase.functions.invoke('send-request-confirmation', {
              body: {
                email: data.email,
                companyName: data.name,
                planName: defaultPlan.name,
                planPrice: defaultPlan.price,
              },
            });
          } catch (emailError) {
            console.error('Erreur envoi email confirmation:', emailError);
          }
        }

        toast({
          title: 'Demande soumise',
          description: 'Votre demande de compte payant a été soumise avec succès. Elle sera validée sous 24h et vous recevrez une notification par email pour le traitement de votre demande.',
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
