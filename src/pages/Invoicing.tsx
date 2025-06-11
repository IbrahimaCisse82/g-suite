
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, DollarSign, Clock } from 'lucide-react';
import { InvoicesTable } from '@/components/invoices/InvoicesTable';
import { useInvoices } from '@/hooks/useInvoices';

export const Invoicing = () => {
  const { data: invoices = [], isLoading } = useInvoices();

  const handleView = (invoice: any) => {
    console.log('View invoice:', invoice);
  };

  const handleEdit = (invoice: any) => {
    console.log('Edit invoice:', invoice);
  };

  const handleDownload = (invoice: any) => {
    console.log('Download invoice:', invoice);
  };

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.total_amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === 'paid');
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Facturation</h1>
          <p className="text-gray-600 mt-2">Gérez vos factures et devis</p>
        </div>
        <Button>
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
                currency: 'EUR'
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
              <Button className="mt-4">
                Créer votre première facture
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
