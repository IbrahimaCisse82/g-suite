
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useSendAdminCredentials = () => {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-admin-credentials', {
        method: 'POST',
      });

      if (error) throw error;
      return data;
    },
  });
};

export const useCheckAdminStatus = () => {
  return useQuery({
    queryKey: ['admin-status'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { isAdmin: false };

      // Vérifier si l'utilisateur est dans la table system_admins
      const { data: adminData } = await supabase
        .from('system_admins')
        .select('*')
        .eq('email', user.email)
        .eq('is_active', true)
        .single();

      return {
        isAdmin: !!adminData,
        adminInfo: adminData,
        user
      };
    },
  });
};
