
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];
type ContactInsert = Database['public']['Tables']['contacts']['Insert'];

export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      console.log('Fetching contacts...');
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching contacts:', error);
        throw error;
      }
      
      console.log('Contacts fetched successfully:', data?.length || 0, 'contacts');
      return data || [];
    },
  });
};

// Fonction pour générer le prochain numéro de contact
const generateContactNumber = async (type: string, companyId: string): Promise<string> => {
  console.log('Generating contact number for type:', type, 'company:', companyId);
  
  const prefix = type === 'client' ? 'C' : type === 'fournisseur' ? 'F' : 'CT';
  
  const { data, error } = await supabase
    .from('contacts')
    .select('contact_number')
    .eq('company_id', companyId)
    .eq('type', type)
    .like('contact_number', `${prefix}%`)
    .order('contact_number', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error generating contact number:', error);
    throw error;
  }

  let nextNumber = 1;
  if (data && data.length > 0 && data[0].contact_number) {
    const currentNumber = parseInt(data[0].contact_number.substring(1));
    if (!isNaN(currentNumber)) {
      nextNumber = currentNumber + 1;
    }
  }

  const contactNumber = `${prefix}${nextNumber.toString().padStart(6, '0')}`;
  console.log('Generated contact number:', contactNumber);
  return contactNumber;
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (contact: Omit<ContactInsert, 'company_id' | 'contact_number'>) => {
      console.log('Creating contact with data:', contact);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('User not authenticated');
        throw new Error('User not authenticated');
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) {
        console.error('No company associated with user');
        throw new Error('No company associated with user');
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
    onSuccess: () => {
      console.log('Invalidating contacts query...');
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (error) => {
      console.error('Error in contact creation mutation:', error);
    }
  });
};

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};
