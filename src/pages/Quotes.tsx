
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { QuoteForm } from '@/components/quotes/QuoteForm';
import { QuotesHeader } from '@/components/quotes/QuotesHeader';
import { QuotesTable } from '@/components/quotes/QuotesTable';
import { useQuotes } from '@/hooks/useQuotes';
import { useContacts } from '@/hooks/useContacts';
import { PageTransition } from '@/components/common/PageTransition';
import { OptimizedCard } from '@/components/common/OptimizedCard';

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
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageTransition>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="space-y-6">
              <QuotesHeader 
                onCreateQuote={() => setShowCreateForm(true)}
                totalQuotes={quotes.length}
              />

              <OptimizedCard className="animate-fade-in">
                <CardContent className="p-0">
                  <QuotesTable
                    quotes={quotes}
                    onView={handleViewQuote}
                    onEdit={handleEditQuote}
                    onDelete={handleDeleteQuote}
                    onConvertToInvoice={handleConvertToInvoice}
                  />
                </CardContent>
              </OptimizedCard>

              <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
                  <QuoteForm
                    onSubmit={handleCreateQuote}
                    onCancel={() => setShowCreateForm(false)}
                    contacts={contacts}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Quotes;
