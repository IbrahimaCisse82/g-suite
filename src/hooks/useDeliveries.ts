
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useDeliveries = () => {
  return useQuery({
    queryKey: ['deliveries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('deliveries')
        .select(`
          *,
          invoices (
            invoice_number,
            contacts (
              name
            )
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useInvoicesForDelivery = () => {
  return useQuery({
    queryKey: ['invoices-for-delivery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          id,
          invoice_number,
          contacts (
            name
          )
        `)
        .eq('status', 'paid')
        .order('invoice_date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateDelivery = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (deliveryData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error('No company found');

      const { data, error } = await supabase
        .from('deliveries')
        .insert([{ ...deliveryData, company_id: profile.company_id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });
      toast({
        title: "Livraison créée",
        description: "La livraison a été créée avec succès.",
      });
    },
  });
};

export const useCompleteDelivery = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (deliveryId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error('No company found');

      // Marquer la livraison comme livrée
      const { error: deliveryError } = await supabase
        .from('deliveries')
        .update({ 
          status: 'delivered',
          delivery_date: new Date().toISOString().split('T')[0]
        })
        .eq('id', deliveryId)
        .eq('company_id', profile.company_id);

      if (deliveryError) throw deliveryError;

      // Débiter le stock pour chaque produit livré
      const { data: deliveryLines } = await supabase
        .from('delivery_lines')
        .select('product_id, quantity_delivered')
        .eq('delivery_id', deliveryId);

      if (deliveryLines) {
        for (const line of deliveryLines) {
          // Récupérer le stock actuel
          const { data: currentStock } = await supabase
            .from('product_stock')
            .select('quantity_in_stock')
            .eq('product_id', line.product_id)
            .eq('company_id', profile.company_id)
            .single();

          if (currentStock) {
            const newQuantity = currentStock.quantity_in_stock - line.quantity_delivered;
            
            // Mettre à jour le stock
            await supabase
              .from('product_stock')
              .update({ 
                quantity_in_stock: newQuantity,
                last_stock_update: new Date().toISOString()
              })
              .eq('product_id', line.product_id)
              .eq('company_id', profile.company_id);

            // Enregistrer le mouvement
            await supabase
              .from('stock_movements')
              .insert([{
                company_id: profile.company_id,
                product_id: line.product_id,
                movement_type: 'out',
                quantity: line.quantity_delivered,
                reference_type: 'delivery',
                reference_id: deliveryId,
                notes: 'Sortie automatique suite à livraison'
              }]);
          }
        }
      }

      return { deliveryId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });
      queryClient.invalidateQueries({ queryKey: ['stock'] });
      queryClient.invalidateQueries({ queryKey: ['stock-movements'] });
      toast({
        title: "Livraison validée",
        description: "La livraison a été validée et le stock a été débité.",
      });
    },
  });
};
