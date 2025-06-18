
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
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('User not authenticated');
        throw new Error('Vous devez être connecté pour créer un contact');
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) {
        console.error('No company associated with user');
        throw new Error('Aucune entreprise associée à votre compte');
      }

      const contactNumber = await generateContactNumber(contact.type || 'client', profile.company_id);

      const { data, error } = await supabase
        .from('contacts')
        .insert({ 
          ...contact, 
          company_id: profile.company_id,
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
