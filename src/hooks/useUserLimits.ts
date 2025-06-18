
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useUserLimits = (companyId?: string) => {
  return useQuery({
    queryKey: ['user-limits', companyId],
    queryFn: async () => {
      if (!companyId) return null;

      // Récupérer l'abonnement actuel avec le plan
      const { data: subscription } = await supabase
        .from('company_subscriptions')
        .select(`
          *,
          subscription_plans (
            name,
            max_users,
            plan_type
          )
        `)
        .eq('company_id', companyId)
        .eq('is_active', true)
        .single();

      if (!subscription) return null;

      // Compter le nombre d'utilisateurs actuels
      const { count: currentUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId);

      return {
        currentUsers: currentUsers || 0,
        maxUsers: subscription.subscription_plans?.max_users || 0,
        planName: subscription.subscription_plans?.name || '',
        planType: subscription.subscription_plans?.plan_type || '',
        canAddUser: (currentUsers || 0) < (subscription.subscription_plans?.max_users || 0)
      };
    },
    enabled: !!companyId,
  });
};

export const useCheckUserLimit = () => {
  return async (companyId: string): Promise<boolean> => {
    // Récupérer l'abonnement actuel
    const { data: subscription } = await supabase
      .from('company_subscriptions')
      .select(`
        subscription_plans (max_users)
      `)
      .eq('company_id', companyId)
      .eq('is_active', true)
      .single();

    if (!subscription?.subscription_plans?.max_users) {
      return false; // Pas de limite définie
    }

    // Compter les utilisateurs actuels
    const { count: currentUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('company_id', companyId);

    return (currentUsers || 0) < subscription.subscription_plans.max_users;
  };
};
