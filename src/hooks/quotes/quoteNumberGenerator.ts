
import { supabase } from '@/integrations/supabase/client';

export const generateQuoteNumber = async (companyId: string): Promise<string> => {
  console.log('Generating quote number for company:', companyId);
  
  const currentYear = new Date().getFullYear();
  const prefix = `DEV-${currentYear}-`;
  
  try {
    // Récupérer tous les devis existants de cette année pour calculer le prochain numéro
    const { data, error } = await supabase
      .from('quotes')
      .select('quote_number')
      .eq('company_id', companyId)
      .like('quote_number', `${prefix}%`)
      .order('quote_number', { ascending: false });

    if (error) {
      console.error('Error generating quote number:', error);
      // En cas d'erreur, utiliser un numéro par défaut
      const quoteNumber = `${prefix}001`;
      console.log('Using default quote number:', quoteNumber);
      return quoteNumber;
    }

    let nextNumber = 1;
    if (data && data.length > 0) {
      // Trouver le plus grand numéro existant
      const numbers = data
        .map(quote => {
          if (!quote.quote_number) return 0;
          const numStr = quote.quote_number.split('-').pop();
          return parseInt(numStr || '0') || 0;
        })
        .filter(num => num > 0);
      
      if (numbers.length > 0) {
        nextNumber = Math.max(...numbers) + 1;
      }
    }

    const quoteNumber = `${prefix}${nextNumber.toString().padStart(3, '0')}`;
    console.log('Generated quote number:', quoteNumber);
    return quoteNumber;
  } catch (error) {
    console.error('Unexpected error in quote number generation:', error);
    // Fallback en cas d'erreur inattendue
    const quoteNumber = `${prefix}001`;
    console.log('Using fallback quote number:', quoteNumber);
    return quoteNumber;
  }
};
