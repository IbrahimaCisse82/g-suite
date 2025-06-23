
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createCompany, updateCompanyLogo } from '@/services/companyService';
import { uploadLogo } from '@/utils/logoUpload';
import { sendLicenseRequest } from '@/utils/emailService';
import type { CompanyFormData } from '@/types/company';

export const useCompanyRegistration = (onSuccess?: (data: { companyName: string; email: string }) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const submitForm = async (data: CompanyFormData, logoFile: File | null, selectedModule: string) => {
    console.log('Début de la soumission du formulaire:', data, 'Module sélectionné:', selectedModule);
    setIsLoading(true);
    
    try {
      // Créer l'entreprise d'abord
      const companyData = await createCompany(data);

      // Upload logo si fourni
      if (logoFile) {
        const logoUrl = await uploadLogo(companyData.id, logoFile);
        if (logoUrl) {
          await updateCompanyLogo(companyData.id, logoUrl);
        }
      }

      // Envoyer la demande de clé licence par email
      try {
        await sendLicenseRequest(data, selectedModule);

        // Appeler onSuccess avec les données nécessaires pour la confirmation
        onSuccess?.({
          companyName: data.name,
          email: data.email
        });

      } catch (emailError) {
        console.error('Erreur envoi email:', emailError);
        toast({
          title: 'Entreprise créée',
          description: 'Votre entreprise a été créée mais l\'email de demande n\'a pas pu être envoyé. Veuillez contacter support@g-suiteapp.com.',
          variant: 'destructive',
        });
      }
      
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

export type { CompanyFormData };
