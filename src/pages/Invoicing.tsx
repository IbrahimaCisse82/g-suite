
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, FileText, DollarSign, Clock } from 'lucide-react';
import { InvoicesTable } from '@/components/invoices/InvoicesTable';
import { InvoiceForm } from '@/components/invoices/InvoiceForm';
import { useInvoices, useCreateInvoice } from '@/hooks/useInvoices';
import { useToast } from '@/hooks/use-toast';

const Invoicing = () => {
  const { data: invoices = [], isLoading } = useInvoices();
  const createInvoice = useCreateInvoice();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const handleCreateInvoice = async (invoiceData: any) => {
    try {
      await createInvoice.mutateAsync(invoiceData);
      toast({
        title: 'Facture créée',
        description: 'La facture a été créée avec succès',
      });
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer la facture',
        variant: 'destructive',
      });
    }
  };

  const handleView = (invoice: any) => {
    console.log('View invoice:', invoice);
    setSelectedInvoice(invoice);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (invoice: any) => {
    console.log('Edit invoice:', invoice);
    setSelectedInvoice(invoice);
    setIsEditDialogOpen(true);
  };

  const handleDownload = (invoice: any) => {
    console.log('Download invoice:', invoice);
    toast({
      title: 'Téléchargement',
      description: `Téléchargement de la facture ${invoice.invoice_number}`,
    });
  };

  const handleUpdateInvoice = async (invoiceData: any) => {
    try {
      // Here you would implement the update logic
      toast({
        title: 'Facture modifiée',
        description: 'La facture a été modifiée avec succès',
      });
      setIsEditDialogOpen(false);
      setSelectedInvoice(null);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier la facture',
        variant: 'destructive',
      });
    }
  };

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.total_amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === 'paid');
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');

  if (isLoading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Facturation</h1>
            <p className="text-gray-600 mt-2">Gérez vos factures et devis</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle facture
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total factures</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{invoices.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Montant total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'XOF'
                }).format(totalAmount)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Factures payées</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{paidInvoices.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En retard</CardTitle>
              <Clock className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{overdueInvoices.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des factures</CardTitle>
          </CardHeader>
          <CardContent>
            {invoices.length > 0 ? (
              <InvoicesTable 
                invoices={invoices} 
                onView={handleView}
                onEdit={handleEdit}
                onDownload={handleDownload}
              />
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucune facture trouvée</p>
                <Button 
                  onClick={() => setIsDialogOpen(true)} 
                  className="mt-4"
                >
                  Créer votre première facture
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dialog for creating new invoice */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Nouvelle facture</DialogTitle>
            </DialogHeader>
            <InvoiceForm 
              onSubmit={handleCreateInvoice}
              onCancel={() => setIsDialogOpen(false)}
              loading={createInvoice.isPending}
            />
          </DialogContent>
        </Dialog>

        {/* Dialog for viewing invoice */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Détails de la facture</DialogTitle>
            </DialogHeader>
            {selectedInvoice && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Numéro</label>
                    <p className="text-lg font-semibold">{selectedInvoice.invoice_number}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Client</label>
                    <p className="text-lg">{selectedInvoice.contacts?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date de facture</label>
                    <p className="text-lg">{new Date(selectedInvoice.invoice_date).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date d'échéance</label>
                    <p className="text-lg">{new Date(selectedInvoice.due_date).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Montant total</label>
                    <p className="text-lg font-semibold">
                      {new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'XOF'
                      }).format(selectedInvoice.total_amount)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Statut</label>
                    <p className="text-lg capitalize">{selectedInvoice.status}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog for editing invoice */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Modifier la facture</DialogTitle>
            </DialogHeader>
            {selectedInvoice && (
              <InvoiceForm 
                initialData={selectedInvoice}
                onSubmit={handleUpdateInvoice}
                onCancel={() => {
                  setIsEditDialogOpen(false);
                  setSelectedInvoice(null);
                }}
                loading={false}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Invoicing;
