
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type TreasuryAccount = Database['public']['Tables']['treasury_accounts']['Row'];
type TreasuryAccountInsert = Database['public']['Tables']['treasury_accounts']['Insert'];
type TreasuryAccountUpdate = Database['public']['Tables']['treasury_accounts']['Update'];

export const useTreasuryAccounts = () => {
  return useQuery({
    queryKey: ['treasury-accounts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('treasury_accounts')
        .select('*')
        .eq('is_active', true)
        .order('account_name');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateTreasuryAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (account: Omit<TreasuryAccountInsert, 'company_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error('No company associated with user');

      const { data, error } = await supabase
        .from('treasury_accounts')
        .insert({ 
          ...account, 
          company_id: profile.company_id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treasury-accounts'] });
      toast.success('Compte de trésorerie créé avec succès');
    },
    onError: (error) => {
      console.error('Error creating treasury account:', error);
      toast.error('Erreur lors de la création du compte');
    },
  });
};

export const useUpdateTreasuryAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: TreasuryAccountUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('treasury_accounts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treasury-accounts'] });
      toast.success('Compte mis à jour avec succès');
    },
    onError: (error) => {
      console.error('Error updating treasury account:', error);
      toast.error('Erreur lors de la mise à jour du compte');
    },
  });
};

export const useDeleteTreasuryAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('treasury_accounts')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treasury-accounts'] });
      toast.success('Compte supprimé avec succès');
    },
    onError: (error) => {
      console.error('Error deleting treasury account:', error);
      toast.error('Erreur lors de la suppression du compte');
    },
  });
};
