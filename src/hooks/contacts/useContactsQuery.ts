
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];

export const useContactsQuery = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async (): Promise<Contact[]> => {
      console.log('🔍 Fetching contacts...');
      
      // Vérifier l'authentification
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('❌ Session error:', sessionError);
        return []; // Retourner un tableau vide au lieu de throw
      }

      if (!session?.user) {
        console.log('❌ No authenticated user');
        return []; // Retourner un tableau vide au lieu de throw
      }

      // Récupérer le profil utilisateur
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        console.error('❌ Profile error:', profileError);
        
        // Si le profil n'existe pas, essayer de récupérer tous les contacts pour le développement
        if (profileError.code === 'PGRST116') {
          console.log('⚠️ No profile found, trying to fetch contacts without company filter');
          
          const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10); // Limiter pour éviter de récupérer trop de données
          
          if (error) {
            console.error('❌ Error fetching contacts without company filter:', error);
            return [];
          }
          
          console.log('✅ Contacts fetched without company filter:', data?.length || 0, 'contacts');
          return data || [];
        }
        
        return []; // Retourner un tableau vide au lieu de throw
      }

      if (!profile?.company_id) {
        console.log('⚠️ No company associated with user, fetching limited contacts');
        
        // Essayer de récupérer quelques contacts pour le développement
        const { data, error } = await supabase
          .from('contacts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (error) {
          console.error('❌ Error fetching limited contacts:', error);
          return [];
        }
        
        console.log('✅ Limited contacts fetched:', data?.length || 0, 'contacts');
        return data || [];
      }

      // Récupérer les contacts de l'entreprise
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('company_id', profile.company_id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Error fetching contacts:', error);
        return []; // Retourner un tableau vide au lieu de throw
      }
      
      console.log('✅ Contacts fetched successfully:', data?.length || 0, 'contacts');
      return data || [];
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: false, // Ne pas réessayer automatiquement
  });
};
