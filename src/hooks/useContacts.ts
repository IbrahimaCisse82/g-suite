import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Contact = Database['public']['Tables']['contacts']['Row'];
type ContactInsert = Database['public']['Tables']['contacts']['Insert'];

export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });
};

// Fonction pour générer le prochain numéro de contact avec 6 caractères
const generateContactNumber = async (type: string, companyId: string): Promise<string> => {
  const prefix = type === 'client' ? 'C' : type === 'fournisseur' ? 'F' : 'CT';
  
  // Récupérer le dernier numéro pour ce type et cette entreprise
  const { data, error } = await supabase
    .from('contacts')
    .select('contact_number')
    .eq('company_id', companyId)
    .eq('type', type)
    .like('contact_number', `${prefix}%`)
    .order('contact_number', { ascending: false })
    .limit(1);

  if (error) throw error;

  let nextNumber = 1;
  if (data && data.length > 0 && data[0].contact_number) {
    // Extraire le numéro de la chaîne (ex: "C000001" -> 1)
    const currentNumber = parseInt(data[0].contact_number.substring(1));
    nextNumber = currentNumber + 1;
  }

  // Formater avec des zéros en préfixe pour avoir 6 caractères (ex: 1 -> "000001")
  return `${prefix}${nextNumber.toString().padStart(6, '0')}`;
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (contact: Omit<ContactInsert, 'company_id' | 'contact_number'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error('No company associated with user');

      // Générer automatiquement le numéro de contact
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

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};
