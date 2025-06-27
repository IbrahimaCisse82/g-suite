
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];

export const useContactsQuery = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async (): Promise<Contact[]> => {
      console.log('🔍 Fetching contacts with authentication...');
      
      // Mode développement - permettre l'accès sans authentification
      const isDevelopmentMode = import.meta.env.DEV || window.location.hostname === 'localhost';
      
      // Vérifier l'authentification
      const { data: { user } } = await supabase.auth.getUser();
      if (!user && !isDevelopmentMode) {
        console.error('User not authenticated');
        throw new Error('Vous devez être connecté pour voir les contacts');
      }

      // En mode développement sans utilisateur, retourner des données mock
      if (!user && isDevelopmentMode) {
        console.log('🔧 Development mode - returning mock data');
        return [
          {
            id: 'mock-1',
            contact_number: 'C000001',
            company_name: 'Entreprise Demo',
            first_name: 'Jean',
            last_name: 'Dupont',
            email: 'jean.dupont@demo.fr',
            phone: '01 23 45 67 89',
            type: 'client',
            address: '123 Rue de la Demo',
            city: 'Paris',
            postal_code: '75001',
            country: 'France',
            company_id: 'mock-company',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            notes: 'Contact de démonstration'
          } as Contact,
          {
            id: 'mock-2',
            contact_number: 'F000001',
            company_name: 'Fournisseur Demo',
            first_name: 'Marie',
            last_name: 'Martin',
            email: 'marie.martin@fournisseur.fr',
            phone: '01 98 76 54 32',
            type: 'fournisseur',
            address: '456 Avenue du Test',
            city: 'Lyon',
            postal_code: '69000',
            country: 'France',
            company_id: 'mock-company',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            notes: 'Fournisseur de test'
          } as Contact
        ];
      }

      // Récupérer le profil utilisateur pour obtenir company_id
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (profileError || !profile?.company_id) {
        console.error('No company associated with user:', profileError);
        throw new Error('Aucune entreprise associée à votre compte');
      }

      // Récupérer les contacts de l'entreprise
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('company_id', profile.company_id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Error fetching contacts:', error);
        throw error;
      }
      
      console.log('✅ Contacts fetched successfully:', data?.length || 0, 'contacts');
      return data || [];
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: false,
  });
};
