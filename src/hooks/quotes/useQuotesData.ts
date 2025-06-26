
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useQuotesData() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Utilisateur non connecté');
        return;
      }

      const { data, error } = await supabase
        .from('quotes')
        .select(`
          *,
          contacts (
            id,
            name,
            email,
            phone
          ),
          quote_items (
            id,
            product_name,
            description,
            quantity,
            unit_price,
            total_price
          )
        `)
        .eq('company_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors du chargement des devis:', error);
        toast.error('Erreur lors du chargement des devis');
        return;
      }

      setQuotes(data || []);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement des devis');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return {
    quotes,
    loading,
    refetch: fetchQuotes
  };
}
