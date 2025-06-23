
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { generateContactNumber } from './contactNumberGenerator';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];
type ContactInsert = Database['public']['Tables']['contacts']['Insert'];

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (contact: Omit<ContactInsert, 'company_id' | 'contact_number'>) => {
      console.log('Creating contact with data:', contact);
      
      // Mode test : créer un contact sans authentification
      console.log('🧪 Mode test : Création de contact sans authentification');
      
      // Utiliser un company_id fictif pour les tests
      const testCompanyId = '00000000-0000-0000-0000-000000000001';
      
      const contactNumber = await generateContactNumber(contact.type || 'client', testCompanyId);

      const { data, error } = await supabase
        .from('contacts')
        .insert({ 
          ...contact, 
          company_id: testCompanyId,
          contact_number: contactNumber
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating contact:', error);
        throw error;
      }

      console.log('Contact created successfully:', data);
      return data;
    },
    onSuccess: (newContact) => {
      console.log('Contact created, updating cache...');
      queryClient.setQueryData(['contacts'], (oldData: Contact[] | undefined) => {
        if (!oldData) return [newContact];
        return [newContact, ...oldData];
      });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (error) => {
      console.error('Error in contact creation mutation:', error);
    }
  });
};
