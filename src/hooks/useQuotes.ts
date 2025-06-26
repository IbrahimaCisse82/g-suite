
import { useQuotesData } from './quotes/useQuotesData';
import { useQuoteActions } from './quotes/useQuoteActions';
import { useQuoteConversion } from './quotes/useQuoteConversion';

export function useQuotes() {
  const { quotes, loading, refetch } = useQuotesData();
  const { createQuote, deleteQuote } = useQuoteActions(refetch);
  const { convertQuoteToInvoice } = useQuoteConversion(refetch);

  return {
    quotes,
    loading,
    createQuote,
    deleteQuote,
    convertQuoteToInvoice,
    refetch
  };
}
