
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { QuoteForm } from '@/components/quotes/QuoteForm';
import { useQuotes } from '@/hooks/useQuotes';
import { useContacts } from '@/hooks/useContacts';
import { Plus, FileText, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Brouillon', variant: 'secondary' as const },
      sent: { label: 'Envoyé', variant: 'default' as const },
      accepted: { label: 'Accepté', variant: 'default' as const },
      rejected: { label: 'Refusé', variant: 'destructive' as const },
      expired: { label: 'Expiré', variant: 'outline' as const },
      converted: { label: 'Converti', variant: 'default' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <FileText className="mr-3 h-8 w-8" />
              Devis
            </h1>
            <p className="text-gray-600">Gestion des devis et propositions commerciales</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouveau Devis
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            {quotes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Aucun devis créé pour le moment</p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Créer votre premier devis
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Numéro</th>
                      <th className="text-left py-3">Client</th>
                      <th className="text-left py-3">Date</th>
                      <th className="text-left py-3">Validité</th>
                      <th className="text-right py-3">Montant</th>
                      <th className="text-left py-3">Statut</th>
                      <th className="text-right py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((quote) => (
                      <tr key={quote.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 font-medium">{quote.quote_number}</td>
                        <td className="py-3">{(quote as any).contacts?.name || 'N/A'}</td>
                        <td className="py-3">
                          {format(new Date(quote.quote_date), 'dd/MM/yyyy', { locale: fr })}
                        </td>
                        <td className="py-3">
                          {format(new Date(quote.validity_date), 'dd/MM/yyyy', { locale: fr })}
                        </td>
                        <td className="text-right py-3">
                          {quote.total_amount.toLocaleString('fr-FR')} XOF
                        </td>
                        <td className="py-3">{getStatusBadge(quote.status)}</td>
                        <td className="text-right py-3">
                          <div className="flex justify-end space-x-2">
                            {quote.status === 'accepted' && (
                              <Button
                                size="sm"
                                onClick={() => handleConvertToInvoice(quote.id)}
                                className="flex items-center gap-1"
                              >
                                <ArrowRight className="h-3 w-3" />
                                Convertir
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteQuote(quote.id)}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
