
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { generatePurchaseNumber } from './purchases/purchaseNumberGenerator';
import type { Database } from '@/integrations/supabase/types';

type PurchaseOrder = Database['public']['Tables']['purchase_orders']['Row'];
type PurchaseOrderInsert = Database['public']['Tables']['purchase_orders']['Insert'];

export const usePurchases = () => {
  return useQuery({
    queryKey: ['purchases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select(`
          *,
          contacts (name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreatePurchase = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (purchase: Omit<PurchaseOrderInsert, 'company_id' | 'order_number'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error('No company associated with user');

      // Génération automatique du numéro d'achat
      const orderNumber = await generatePurchaseNumber(profile.company_id);

      const { data, error } = await supabase
        .from('purchase_orders')
        .insert({ 
          ...purchase, 
          company_id: profile.company_id,
          order_number: orderNumber
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
    },
  });
};
