
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useStock = () => {
  return useQuery({
    queryKey: ['stock'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_stock')
        .select(`
          *,
          products (
            id,
            name,
            sku,
            unit_price,
            product_categories (
              name
            )
          )
        `)
        .order('last_stock_update', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useStockMovements = () => {
  return useQuery({
    queryKey: ['stock-movements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stock_movements')
        .select(`
          *,
          products (
            name,
            sku
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateStock = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ productId, quantity, movementType, notes }: {
      productId: string;
      quantity: number;
      movementType: 'in' | 'out' | 'adjustment';
      notes?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error('No company found');

      // Récupérer le stock actuel
      const { data: currentStock } = await supabase
        .from('product_stock')
        .select('quantity_in_stock')
        .eq('product_id', productId)
        .eq('company_id', profile.company_id)
        .single();

      if (!currentStock) throw new Error('Stock not found');

      let newQuantity = currentStock.quantity_in_stock;
      
      if (movementType === 'in') {
        newQuantity += quantity;
      } else if (movementType === 'out') {
        newQuantity -= quantity;
      } else if (movementType === 'adjustment') {
        newQuantity = quantity;
      }

      // Mettre à jour le stock
      const { error: stockError } = await supabase
        .from('product_stock')
        .update({ 
          quantity_in_stock: newQuantity,
          last_stock_update: new Date().toISOString()
        })
        .eq('product_id', productId)
        .eq('company_id', profile.company_id);

      if (stockError) throw stockError;

      // Enregistrer le mouvement
      const { error: movementError } = await supabase
        .from('stock_movements')
        .insert([{
          company_id: profile.company_id,
          product_id: productId,
          movement_type: movementType,
          quantity: movementType === 'adjustment' ? quantity - currentStock.quantity_in_stock : quantity,
          notes
        }]);

      if (movementError) throw movementError;

      return { newQuantity };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] });
      queryClient.invalidateQueries({ queryKey: ['stock-movements'] });
      toast({
        title: "Stock mis à jour",
        description: "Le stock a été mis à jour avec succès.",
      });
    },
  });
};
