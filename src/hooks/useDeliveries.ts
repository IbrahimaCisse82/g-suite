
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
