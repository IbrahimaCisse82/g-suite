
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface Quote {
  id: string;
  quote_number: string;
  contact_id: string;
  quote_date: string;
  validity_date: string;
  status: string;
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  terms_conditions?: string;
  notes?: string;
  created_at: string;
}

interface QuoteLine {
  id: string;
  quote_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  line_total: number;
}

export const useQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quoteLines, setQuoteLines] = useState<QuoteLine[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select(`
          *,
          contacts(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des devis:', error);
      toast.error('Erreur lors du chargement des devis');
    } finally {
      setLoading(false);
    }
  };

  const fetchQuoteLines = async (quoteId: string) => {
    try {
      const { data, error } = await supabase
        .from('quote_lines')
        .select('*')
        .eq('quote_id', quoteId)
        .order('created_at');

      if (error) throw error;
      setQuoteLines(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des lignes de devis:', error);
      toast.error('Erreur lors du chargement des lignes de devis');
    }
  };

  const createQuote = async (quoteData: any) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user?.id)
        .single();

      const { quote_lines, ...quoteInfo } = quoteData;

      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert([{
          ...quoteInfo,
          company_id: profile?.company_id
        }])
        .select()
        .single();

      if (quoteError) throw quoteError;

      // Ajouter les lignes du devis
      if (quote_lines && quote_lines.length > 0) {
        const linesWithQuoteId = quote_lines.map((line: any) => ({
          ...line,
          quote_id: quote.id
        }));

        const { error: linesError } = await supabase
          .from('quote_lines')
          .insert(linesWithQuoteId);

        if (linesError) throw linesError;
      }
      
      setQuotes(prev => [quote, ...prev]);
      toast.success('Devis créé avec succès');
      return quote;
    } catch (error) {
      console.error('Erreur lors de la création du devis:', error);
      toast.error('Erreur lors de la création du devis');
      throw error;
    }
  };

  const updateQuoteStatus = async (quoteId: string, status: string) => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .update({ status })
        .eq('id', quoteId)
        .select()
        .single();

      if (error) throw error;
      
      setQuotes(prev => prev.map(quote => quote.id === quoteId ? data : quote));
      toast.success('Statut du devis mis à jour');
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour');
      throw error;
    }
  };

  const convertQuoteToInvoice = async (quoteId: string) => {
    try {
      // Récupérer le devis et ses lignes
      const { data: quote } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', quoteId)
        .single();

      const { data: lines } = await supabase
        .from('quote_lines')
        .select('*')
        .eq('quote_id', quoteId);

      if (!quote) throw new Error('Devis non trouvé');

      // Créer la facture
      const invoiceNumber = `FAC-${new Date().getFullYear()}-${Date.now()}`;
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert([{
          invoice_number: invoiceNumber,
          contact_id: quote.contact_id,
          company_id: quote.company_id,
          invoice_date: new Date().toISOString().split('T')[0],
          due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          subtotal: quote.subtotal,
          tax_amount: quote.tax_amount,
          total_amount: quote.total_amount,
          status: 'draft',
          payment_status: 'unpaid',
          notes: `Convertie du devis ${quote.quote_number}`
        }])
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      // Marquer le devis comme converti
      await updateQuoteStatus(quoteId, 'converted');

      toast.success('Devis converti en facture avec succès');
      return invoice;
    } catch (error) {
      console.error('Erreur lors de la conversion:', error);
      toast.error('Erreur lors de la conversion');
      throw error;
    }
  };

  const deleteQuote = async (quoteId: string) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', quoteId);

      if (error) throw error;
      
      setQuotes(prev => prev.filter(q => q.id !== quoteId));
      toast.success('Devis supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression');
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      fetchQuotes();
    }
  }, [user]);

  return {
    quotes,
    quoteLines,
    loading,
    createQuote,
    updateQuoteStatus,
    convertQuoteToInvoice,
    deleteQuote,
    fetchQuoteLines,
    refetch: fetchQuotes
  };
};
