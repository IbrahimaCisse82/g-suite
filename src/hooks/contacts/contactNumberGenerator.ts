
import { supabase } from '@/integrations/supabase/client';

export const generateContactNumber = async (type: string, companyId: string): Promise<string> => {
  console.log('Generating contact number for type:', type, 'company:', companyId);
  
  const prefix = type === 'client' ? 'C' : type === 'fournisseur' ? 'F' : 'CT';
  
  try {
    // Récupérer tous les contacts existants du même type pour calculer le prochain numéro
    const { data, error } = await supabase
      .from('contacts')
      .select('contact_number')
      .eq('company_id', companyId)
      .eq('type', type)
      .like('contact_number', `${prefix}%`)
      .order('contact_number', { ascending: false });

    if (error) {
      console.error('Error generating contact number:', error);
      // En cas d'erreur, utiliser un numéro par défaut
      const contactNumber = `${prefix}000001`;
      console.log('Using default contact number:', contactNumber);
      return contactNumber;
    }

    let nextNumber = 1;
    if (data && data.length > 0) {
      // Trouver le plus grand numéro existant
      const numbers = data
        .map(contact => {
          if (!contact.contact_number) return 0;
          const numStr = contact.contact_number.substring(1);
          return parseInt(numStr) || 0;
        })
        .filter(num => num > 0);
      
      if (numbers.length > 0) {
        nextNumber = Math.max(...numbers) + 1;
      }
    }

    const contactNumber = `${prefix}${nextNumber.toString().padStart(6, '0')}`;
    console.log('Generated contact number:', contactNumber);
    return contactNumber;
  } catch (error) {
    console.error('Unexpected error in contact number generation:', error);
    // Fallback en cas d'erreur inattendue
    const contactNumber = `${prefix}000001`;
    console.log('Using fallback contact number:', contactNumber);
    return contactNumber;
  }
};
