
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];

export const useContactsQuery = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async (): Promise<Contact[]> => {
      console.log('Fetching contacts...');
      
      // Vérifier l'authentification
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw new Error('Erreur de session');
      }

      if (!session?.user) {
        console.log('No authenticated user');
        return [];
      }

      // Récupérer le profil utilisateur
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        console.error('Profile error:', profileError);
        throw new Error('Erreur lors de la récupération du profil');
      }

      if (!profile?.company_id) {
        console.log('No company associated with user');
        return [];
      }

      // Récupérer les contacts de l'entreprise
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('company_id', profile.company_id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching contacts:', error);
        throw new Error('Erreur lors du chargement des contacts');
      }
      
      console.log('Contacts fetched successfully:', data?.length || 0, 'contacts');
      return data || [];
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: (failureCount, error) => {
      // Ne pas réessayer si c'est une erreur d'authentification
      if (error.message.includes('session') || error.message.includes('profil')) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
