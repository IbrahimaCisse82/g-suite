
import { supabase } from '@/integrations/supabase/client';

export const generateInvoiceNumber = async (companyId: string): Promise<string> => {
  console.log('Generating invoice number for company:', companyId);
  
  const currentYear = new Date().getFullYear();
  const prefix = `FAC-${currentYear}-`;
  
  try {
    // Récupérer toutes les factures existantes de cette année pour calculer le prochain numéro
    const { data, error } = await supabase
      .from('invoices')
      .select('invoice_number')
      .eq('company_id', companyId)
      .like('invoice_number', `${prefix}%`)
      .order('invoice_number', { ascending: false });

    if (error) {
      console.error('Error generating invoice number:', error);
      // En cas d'erreur, utiliser un numéro par défaut
      const invoiceNumber = `${prefix}001`;
      console.log('Using default invoice number:', invoiceNumber);
      return invoiceNumber;
    }

    let nextNumber = 1;
    if (data && data.length > 0) {
      // Trouver le plus grand numéro existant
      const numbers = data
        .map(invoice => {
          if (!invoice.invoice_number) return 0;
          const numStr = invoice.invoice_number.split('-').pop();
          return parseInt(numStr || '0') || 0;
        })
        .filter(num => num > 0);
      
      if (numbers.length > 0) {
        nextNumber = Math.max(...numbers) + 1;
      }
    }

    const invoiceNumber = `${prefix}${nextNumber.toString().padStart(3, '0')}`;
    console.log('Generated invoice number:', invoiceNumber);
    return invoiceNumber;
  } catch (error) {
    console.error('Unexpected error in invoice number generation:', error);
    // Fallback en cas d'erreur inattendue
    const invoiceNumber = `${prefix}001`;
    console.log('Using fallback invoice number:', invoiceNumber);
    return invoiceNumber;
  }
};
