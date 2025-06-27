
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { generateInvoiceNumber } from '../invoices/invoiceNumberGenerator';

export function useQuoteConversion(refetch: () => void) {
  const convertQuoteToInvoice = async (quoteId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Utilisateur non connecté');
        return;
      }

      // Récupérer le profil utilisateur pour obtenir company_id
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (profileError || !profile?.company_id) {
        console.error('No company associated with user:', profileError);
        toast.error('Aucune entreprise associée à votre compte');
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

      // Générer automatiquement le numéro de facture
      const invoiceNumber = await generateInvoiceNumber(profile.company_id);

      // Créer la facture
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          invoice_number: invoiceNumber,
          company_id: profile.company_id,
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

  return {
    convertQuoteToInvoice
  };
}
