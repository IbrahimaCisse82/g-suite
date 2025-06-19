
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useLicenseRenewalCheck = () => {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('process-license-renewals');
      
      if (error) {
        throw error;
      }
      
      return data;
    },
    onSuccess: (data) => {
      if (data.renewalRequestsCreated > 0) {
        toast.success(
          `${data.renewalRequestsCreated} demande(s) de renouvellement créée(s) automatiquement`
        );
      } else {
        toast.info('Aucune licence n\'expire dans les 30 prochains jours');
      }
    },
    onError: (error) => {
      console.error('Erreur lors de la vérification des renouvellements:', error);
      toast.error('Erreur lors de la vérification des renouvellements');
    },
  });
};
