
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting contact:', id);
      
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting contact:', error);
        throw error;
      }

      console.log('Contact deleted successfully');
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(['contacts'], (oldData: Contact[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter(contact => contact.id !== deletedId);
      });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};
