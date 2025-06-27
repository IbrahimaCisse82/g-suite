
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQuoteValidation } from './useQuoteValidation';
import { generateQuoteNumber } from './quoteNumberGenerator';

export function useQuoteActions(refetch: () => void) {
  const { validateQuoteData } = useQuoteValidation();

  const createQuote = async (quoteData: any) => {
    try {
      // Valider et nettoyer les données
      const validation = validateQuoteData(quoteData);
      if (!validation.isValid) {
        return;
      }

      const sanitizedData = validation.sanitizedData;
      
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

      // Génération automatique du numéro de devis
      const quoteNumber = await generateQuoteNumber(profile.company_id);

      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert({
          quote_number: quoteNumber,
          company_id: profile.company_id,
          contact_id: sanitizedData.contact_id,
          quote_date: sanitizedData.quote_date,
          validity_date: sanitizedData.validity_date,
          status: 'draft',
          subtotal: sanitizedData.subtotal || 0,
          tax_amount: sanitizedData.tax_amount || 0,
          total_amount: sanitizedData.total_amount || 0,
          notes: sanitizedData.notes
        })
        .select()
        .single();

      if (quoteError) {
        console.error('Erreur lors de la création du devis:', quoteError);
        toast.error('Erreur lors de la création du devis');
        return;
      }

      // Ajouter les lignes du devis
      if (sanitizedData.items && sanitizedData.items.length > 0) {
        const { error: itemsError } = await supabase
          .from('quote_lines')
          .insert(
            sanitizedData.items.map((item: any) => ({
              quote_id: quote.id,
              description: item.description || item.product_name,
              quantity: item.quantity || 1,
              unit_price: item.unit_price || 0,
              product_id: item.product_id
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

  return {
    createQuote,
    deleteQuote
  };
}
