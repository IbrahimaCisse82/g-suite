
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
        .select('*, companies(*)')
        .eq('id', user.id)
        .single();

      return profile;
    },
  });
};
