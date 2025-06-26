
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { QuoteForm } from '@/components/quotes/QuoteForm';
import { QuotesHeader } from '@/components/quotes/QuotesHeader';
import { QuotesTable } from '@/components/quotes/QuotesTable';
import { useQuotes } from '@/hooks/useQuotes';
import { useContacts } from '@/hooks/useContacts';

const Quotes = () => {
  const { quotes, loading, createQuote, convertQuoteToInvoice, deleteQuote } = useQuotes();
  const { data: contacts = [] } = useContacts();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateQuote = async (quoteData: any) => {
    try {
      await createQuote(quoteData);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Erreur lors de la création du devis:', error);
    }
  };

  const handleConvertToInvoice = async (quoteId: string) => {
    try {
      await convertQuoteToInvoice(quoteId);
    } catch (error) {
      console.error('Erreur lors de la conversion:', error);
    }
  };

  const handleViewQuote = (quote: any) => {
    console.log('Viewing quote:', quote);
    // TODO: Implement quote details view
  };

  const handleEditQuote = (quote: any) => {
    console.log('Editing quote:', quote);
    // TODO: Implement quote editing
  };

  const handleDeleteQuote = async (quote: any) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce devis ?')) {
      await deleteQuote(quote.id);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Chargement des devis...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <QuotesHeader 
          onCreateQuote={() => setShowCreateForm(true)}
          totalQuotes={quotes.length}
        />

        <Card>
          <CardContent className="p-6">
            <QuotesTable
              quotes={quotes}
              onView={handleViewQuote}
              onEdit={handleEditQuote}
              onDelete={handleDeleteQuote}
              onConvertToInvoice={handleConvertToInvoice}
            />
          </CardContent>
        </Card>

        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <QuoteForm
              onSubmit={handleCreateQuote}
              onCancel={() => setShowCreateForm(false)}
              contacts={contacts}
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Quotes;
