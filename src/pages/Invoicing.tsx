
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, FileText, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { useInvoices } from '@/hooks/useInvoices';
import { InvoicesTable } from '@/components/invoices/InvoicesTable';
import { EnhancedInvoiceForm } from '@/components/invoices/EnhancedInvoiceForm';
import { Layout } from '@/components/Layout';

export const Invoicing = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: invoices = [], isLoading } = useInvoices();

  const handleInvoiceSubmit = (invoiceData: any) => {
    console.log('Invoice submitted:', invoiceData);
    setIsDialogOpen(false);
  };

  const handleView = (invoice: any) => {
    console.log('View invoice:', invoice);
  };

  const handleEdit = (invoice: any) => {
    console.log('Edit invoice:', invoice);
  };

  const handleDownload = (invoice: any) => {
    console.log('Download invoice:', invoice);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const totalAmount = invoices.reduce((sum, invoice) => sum + (invoice.total_amount || 0), 0);
  const paidInvoices = invoices.filter(invoice => invoice.status === 'paid');
  const pendingInvoices = invoices.filter(invoice => invoice.status === 'pending');
  const overdueInvoices = invoices.filter(invoice => invoice.status === 'overdue');

  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-readable-primary mb-2 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              Facturation
            </h1>
            <p className="text-xl text-readable-secondary">Gérez vos factures et suivez vos paiements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Total des factures</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-readable-primary">{invoices.length}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Montant total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-readable-primary">
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'XOF'
                  }).format(totalAmount)}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Payées</CardTitle>
                <Clock className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{paidInvoices.length}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">En retard</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{overdueInvoices.length}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList className="bg-white shadow-lg">
                <TabsTrigger value="all" className="text-readable-primary">Toutes</TabsTrigger>
                <TabsTrigger value="pending" className="text-readable-primary">En attente</TabsTrigger>
                <TabsTrigger value="paid" className="text-readable-primary">Payées</TabsTrigger>
                <TabsTrigger value="overdue" className="text-readable-primary">En retard</TabsTrigger>
              </TabsList>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle facture
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-readable-primary">Créer une nouvelle facture</DialogTitle>
                  </DialogHeader>
                  <EnhancedInvoiceForm 
                    onSubmit={handleInvoiceSubmit} 
                    onCancel={() => setIsDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <TabsContent value="all">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-readable-primary">Toutes les factures</CardTitle>
                </CardHeader>
                <CardContent>
                  <InvoicesTable 
                    invoices={invoices} 
                    onView={handleView}
                    onEdit={handleEdit}
                    onDownload={handleDownload}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-readable-primary">Factures en attente</CardTitle>
                </CardHeader>
                <CardContent>
                  <InvoicesTable 
                    invoices={pendingInvoices} 
                    onView={handleView}
                    onEdit={handleEdit}
                    onDownload={handleDownload}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="paid">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-readable-primary">Factures payées</CardTitle>
                </CardHeader>
                <CardContent>
                  <InvoicesTable 
                    invoices={paidInvoices} 
                    onView={handleView}
                    onEdit={handleEdit}
                    onDownload={handleDownload}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overdue">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-readable-primary">Factures en retard</CardTitle>
                </CardHeader>
                <CardContent>
                  <InvoicesTable 
                    invoices={overdueInvoices} 
                    onView={handleView}
                    onEdit={handleEdit}
                    onDownload={handleDownload}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};
