
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

      // Insert the transaction
      const { data: transactionData, error: transactionError } = await supabase
        .from('treasury_transactions')
        .insert({ 
          ...transaction, 
          company_id: profile.company_id
        })
        .select()
        .single();

      if (transactionError) throw transactionError;

      // Update account balance if account_id is provided
      if (transaction.account_id) {
        const multiplier = transaction.transaction_type === 'income' ? 1 : -1;
        const balanceChange = transaction.amount * multiplier;

        // Get current balance
        const { data: currentAccount, error: fetchError } = await supabase
          .from('treasury_accounts')
          .select('current_balance')
          .eq('id', transaction.account_id)
          .single();

        if (fetchError) {
          console.warn('Could not fetch current balance:', fetchError);
        } else {
          // Update the balance
          const newBalance = (currentAccount.current_balance || 0) + balanceChange;
          
          const { error: updateError } = await supabase
            .from('treasury_accounts')
            .update({ current_balance: newBalance })
            .eq('id', transaction.account_id);

          if (updateError) {
            console.warn('Could not update account balance:', updateError);
          }
        }
      }

      return transactionData;
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
