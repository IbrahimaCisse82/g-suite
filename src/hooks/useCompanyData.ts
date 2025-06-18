
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useCompanyProfile = () => {
  return useQuery({
    queryKey: ['company-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select(`
          *,
          companies (*)
        `)
        .eq('id', user.id)
        .single();

      return profile;
    },
  });
};

export const useCompanySubscription = () => {
  return useQuery({
    queryKey: ['company-subscription'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) return null;

      const { data: subscription } = await supabase
        .from('company_subscriptions')
        .select(`
          *,
          subscription_plans (*)
        `)
        .eq('company_id', profile.company_id)
        .eq('is_active', true)
        .single();

      return subscription;
    },
  });
};
