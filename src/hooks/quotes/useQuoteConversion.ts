
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useQuoteConversion(refetch: () => void) {
  const convertQuoteToInvoice = async (quoteId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Utilisateur non connecté');
        return;
      }

      // Récupérer le devis avec ses lignes
      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .select(`
          *,
          quote_lines (*)
        `)
        .eq('id', quoteId)
        .single();

      if (quoteError) {
        console.error('Erreur lors de la récupération du devis:', quoteError);
        toast.error('Erreur lors de la récupération du devis');
        return;
      }

      // Générer le numéro de facture
      const invoiceNumber = await generateInvoiceNumber();

      // Créer la facture
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          invoice_number: invoiceNumber,
          company_id: user.id,
          contact_id: quote.contact_id,
          invoice_date: new Date().toISOString().split('T')[0],
          due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'pending',
          subtotal: quote.subtotal || 0,
          tax_amount: quote.tax_amount || 0,
          total_amount: quote.total_amount || 0,
          notes: quote.notes
        })
        .select()
        .single();

      if (invoiceError) {
        console.error('Erreur lors de la création de la facture:', invoiceError);
        toast.error('Erreur lors de la création de la facture');
        return;
      }

      // Note: Invoice items would need to be added to a separate table if it exists
      // For now, we'll skip this step since invoice_items table doesn't exist in the schema
      
      // Mettre à jour le statut du devis
      const { error: updateError } = await supabase
        .from('quotes')
        .update({ status: 'converted' })
        .eq('id', quoteId);

      if (updateError) {
        console.error('Erreur lors de la mise à jour du devis:', updateError);
      }

      toast.success('Devis converti en facture avec succès');
      refetch();
    } catch (error) {
      console.error('Erreur lors de la conversion:', error);
      toast.error('Erreur lors de la conversion du devis');
    }
  };

  const generateInvoiceNumber = async (): Promise<string> => {
    const currentYear = new Date().getFullYear();
    const prefix = `FAC-${currentYear}-`;
    
    const { data, error } = await supabase
      .from('invoices')
      .select('invoice_number')
      .like('invoice_number', `${prefix}%`)
      .order('invoice_number', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Erreur lors de la génération du numéro de facture:', error);
      return `${prefix}001`;
    }

    if (data && data.length > 0) {
      const lastNumber = data[0].invoice_number.split('-').pop();
      const nextNumber = parseInt(lastNumber || '0', 10) + 1;
      return `${prefix}${nextNumber.toString().padStart(3, '0')}`;
    }

    return `${prefix}001`;
  };

  return {
    convertQuoteToInvoice
  };
}
