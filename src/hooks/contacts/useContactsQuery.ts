
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];

export const useContactsQuery = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async (): Promise<Contact[]> => {
      console.log('🔍 Fetching contacts (mode test sans authentification)...');
      
      // Récupérer tous les contacts pour le mode test
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50); // Limiter pour éviter de récupérer trop de données
      
      if (error) {
        console.error('❌ Error fetching contacts:', error);
        return [];
      }
      
      console.log('✅ Contacts fetched successfully (mode test):', data?.length || 0, 'contacts');
      return data || [];
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: false,
  });
};
