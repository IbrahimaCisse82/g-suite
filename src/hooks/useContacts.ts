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

// Fonction pour générer le prochain numéro de contact
const generateContactNumber = async (type: string, companyId: string): Promise<string> => {
  console.log('Generating contact number for type:', type, 'company:', companyId);
  
  const prefix = type === 'client' ? 'C' : type === 'fournisseur' ? 'F' : 'CT';
  
  // Récupérer tous les contacts existants du même type pour calculer le prochain numéro
  const { data, error } = await supabase
    .from('contacts')
    .select('contact_number')
    .eq('company_id', companyId)
    .eq('type', type)
    .like('contact_number', `${prefix}%`)
    .order('contact_number', { ascending: false });

  if (error) {
    console.error('Error generating contact number:', error);
    throw error;
  }

  let nextNumber = 1;
  if (data && data.length > 0) {
    // Trouver le plus grand numéro existant
    const numbers = data
      .map(contact => {
        if (!contact.contact_number) return 0;
        const numStr = contact.contact_number.substring(1);
        return parseInt(numStr) || 0;
      })
      .filter(num => num > 0);
    
    if (numbers.length > 0) {
      nextNumber = Math.max(...numbers) + 1;
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
