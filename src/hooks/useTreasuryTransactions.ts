
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type TreasuryTransaction = Database['public']['Tables']['treasury_transactions']['Row'];
type TreasuryTransactionInsert = Database['public']['Tables']['treasury_transactions']['Insert'];

export const useTreasuryTransactions = () => {
  return useQuery({
    queryKey: ['treasury-transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('treasury_transactions')
        .select(`
          *,
          treasury_accounts (
            account_name,
            account_type
          )
        `)
        .order('transaction_date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateTreasuryTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (transaction: Omit<TreasuryTransactionInsert, 'company_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error('No company associated with user');

      // Start a transaction to update both the transaction and account balance
      const { data, error } = await supabase.rpc('create_treasury_transaction', {
        p_company_id: profile.company_id,
        p_account_id: transaction.account_id,
        p_transaction_type: transaction.transaction_type,
        p_amount: transaction.amount,
        p_description: transaction.description,
        p_category: transaction.category,
        p_transaction_date: transaction.transaction_date
      });

      if (error) {
        // Fallback to simple insert if RPC doesn't exist
        const { data: insertData, error: insertError } = await supabase
          .from('treasury_transactions')
          .insert({ 
            ...transaction, 
            company_id: profile.company_id
          })
          .select()
          .single();

        if (insertError) throw insertError;

        // Update account balance manually
        if (transaction.account_id) {
          const multiplier = transaction.transaction_type === 'income' ? 1 : -1;
          const { error: balanceError } = await supabase.rpc('update_account_balance', {
            account_id: transaction.account_id,
            amount_change: transaction.amount * multiplier
          });

          if (balanceError) {
            console.warn('Could not update account balance:', balanceError);
          }
        }

        return insertData;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treasury-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['treasury-accounts'] });
      toast.success('Transaction créée avec succès');
    },
    onError: (error) => {
      console.error('Error creating treasury transaction:', error);
      toast.error('Erreur lors de la création de la transaction');
    },
  });
};
