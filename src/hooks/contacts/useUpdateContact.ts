
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...contact }: Partial<Contact> & { id: string }) => {
      console.log('Updating contact:', id, contact);
      
      const { data, error } = await supabase
        .from('contacts')
        .update(contact)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating contact:', error);
        throw error;
      }

      console.log('Contact updated successfully:', data);
      return data;
    },
    onSuccess: (updatedContact) => {
      queryClient.setQueryData(['contacts'], (oldData: Contact[] | undefined) => {
        if (!oldData) return [updatedContact];
        return oldData.map(contact => 
          contact.id === updatedContact.id ? updatedContact : contact
        );
      });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};
