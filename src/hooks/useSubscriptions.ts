
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Hook pour récupérer les plans d'abonnement
export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('price', { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
};

// Hook pour récupérer les demandes de l'entreprise
export const usePaidAccountRequests = () => {
  return useQuery({
    queryKey: ['paid-account-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('paid_account_requests')
        .select(`
          *,
          subscription_plans (
            name,
            plan_type,
            price
          ),
          profiles (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

// Hook pour créer une demande de compte payant
export const useCreatePaidAccountRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ planId, message }: { planId: string; message?: string }) => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (!profile?.company_id) {
        throw new Error('Profil utilisateur non trouvé');
      }

      // Récupérer les informations de l'entreprise et du plan
      const { data: company } = await supabase
        .from('companies')
        .select('name, email')
        .eq('id', profile.company_id)
        .single();

      const { data: plan } = await supabase
        .from('subscription_plans')
        .select('name, price')
        .eq('id', planId)
        .single();

      const { data, error } = await supabase
        .from('paid_account_requests')
        .insert({
          company_id: profile.company_id,
          requested_by: (await supabase.auth.getUser()).data.user?.id,
          plan_id: planId,
          request_message: message,
        })
        .select()
        .single();

      if (error) throw error;

      // Envoyer l'email de confirmation automatiquement
      if (company && plan) {
        try {
          await supabase.functions.invoke('send-request-confirmation', {
            body: {
              email: company.email,
              companyName: company.name,
              planName: plan.name,
              planPrice: plan.price,
            },
          });
        } catch (emailError) {
          console.error('Erreur lors de l\'envoi de l\'email de confirmation:', emailError);
          // Ne pas faire échouer la création de la demande si l'email échoue
        }
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paid-account-requests'] });
    },
  });
};

// Hook pour récupérer l'abonnement actuel de l'entreprise
export const useCurrentSubscription = () => {
  return useQuery({
    queryKey: ['current-subscription'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('company_subscriptions')
        .select(`
          *,
          subscription_plans (
            name,
            plan_type,
            price,
            features
          )
        `)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });
};
