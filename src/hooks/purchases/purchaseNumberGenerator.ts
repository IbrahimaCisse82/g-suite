
import { supabase } from '@/integrations/supabase/client';

export const generatePurchaseNumber = async (companyId: string): Promise<string> => {
  console.log('Generating purchase number for company:', companyId);
  
  const currentYear = new Date().getFullYear();
  const prefix = `ACH-${currentYear}-`;
  
  try {
    // Récupérer tous les achats existants de cette année pour calculer le prochain numéro
    const { data, error } = await supabase
      .from('purchase_orders')
      .select('order_number')
      .eq('company_id', companyId)
      .like('order_number', `${prefix}%`)
      .order('order_number', { ascending: false });

    if (error) {
      console.error('Error generating purchase number:', error);
      // En cas d'erreur, utiliser un numéro par défaut
      const purchaseNumber = `${prefix}001`;
      console.log('Using default purchase number:', purchaseNumber);
      return purchaseNumber;
    }

    let nextNumber = 1;
    if (data && data.length > 0) {
      // Trouver le plus grand numéro existant
      const numbers = data
        .map(purchase => {
          if (!purchase.order_number) return 0;
          const numStr = purchase.order_number.split('-').pop();
          return parseInt(numStr || '0') || 0;
        })
        .filter(num => num > 0);
      
      if (numbers.length > 0) {
        nextNumber = Math.max(...numbers) + 1;
      }
    }

    const purchaseNumber = `${prefix}${nextNumber.toString().padStart(3, '0')}`;
    console.log('Generated purchase number:', purchaseNumber);
    return purchaseNumber;
  } catch (error) {
    console.error('Unexpected error in purchase number generation:', error);
    // Fallback en cas d'erreur inattendue
    const purchaseNumber = `${prefix}001`;
    console.log('Using fallback purchase number:', purchaseNumber);
    return purchaseNumber;
  }
};
