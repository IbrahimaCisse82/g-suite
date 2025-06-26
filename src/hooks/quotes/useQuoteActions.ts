
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useQuoteActions(refetch: () => void) {
  const createQuote = async (quoteData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Utilisateur non connecté');
        return;
      }

      // Génération du numéro de devis
      const quoteNumber = await generateQuoteNumber();

      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert({
          quote_number: quoteNumber,
          company_id: user.id,
          client_id: quoteData.client_id,
          quote_date: quoteData.quote_date,
          validity_date: quoteData.validity_date,
          status: 'draft',
          subtotal_amount: quoteData.subtotal_amount,
          tax_amount: quoteData.tax_amount,
          total_amount: quoteData.total_amount,
          notes: quoteData.notes
        })
        .select()
        .single();

      if (quoteError) {
        console.error('Erreur lors de la création du devis:', quoteError);
        toast.error('Erreur lors de la création du devis');
        return;
      }

      // Ajouter les lignes du devis
      if (quoteData.items && quoteData.items.length > 0) {
        const { error: itemsError } = await supabase
          .from('quote_items')
          .insert(
            quoteData.items.map((item: any) => ({
              quote_id: quote.id,
              product_name: item.product_name,
              description: item.description,
              quantity: item.quantity,
              unit_price: item.unit_price,
              total_price: item.total_price
            }))
          );

        if (itemsError) {
          console.error('Erreur lors de l\'ajout des lignes:', itemsError);
          toast.error('Erreur lors de l\'ajout des lignes du devis');
          return;
        }
      }

      toast.success('Devis créé avec succès');
      refetch();
    } catch (error) {
      console.error('Erreur lors de la création du devis:', error);
      toast.error('Erreur lors de la création du devis');
    }
  };

  const deleteQuote = async (quoteId: string) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', quoteId);

      if (error) {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Erreur lors de la suppression du devis');
        return;
      }

      toast.success('Devis supprimé avec succès');
      refetch();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression du devis');
    }
  };

  const generateQuoteNumber = async (): Promise<string> => {
    const currentYear = new Date().getFullYear();
    const prefix = `DEV-${currentYear}-`;
    
    const { data, error } = await supabase
      .from('quotes')
      .select('quote_number')
      .like('quote_number', `${prefix}%`)
      .order('quote_number', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Erreur lors de la génération du numéro:', error);
      return `${prefix}001`;
    }

    if (data && data.length > 0) {
      const lastNumber = data[0].quote_number.split('-').pop();
      const nextNumber = parseInt(lastNumber || '0', 10) + 1;
      return `${prefix}${nextNumber.toString().padStart(3, '0')}`;
    }

    return `${prefix}001`;
  };

  return {
    createQuote,
    deleteQuote
  };
}
