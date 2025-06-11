
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, ShoppingCart, TrendingUp, AlertCircle } from 'lucide-react';
import { PurchasesTable } from '@/components/purchases/PurchasesTable';
import { PurchaseForm } from '@/components/purchases/PurchaseForm';

const mockPurchases = [
  {
    id: '1',
    purchase_number: 'A-2024-001',
    supplier: 'Fournisseur ABC',
    purchase_date: '2024-06-01',
    status: 'received',
    total_amount: 125000,
  },
  {
    id: '2',
    purchase_number: 'A-2024-002',
    supplier: 'Société XYZ',
    purchase_date: '2024-06-05',
    status: 'pending',
    total_amount: 75000,
  },
];

export const Purchases = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [purchases] = useState(mockPurchases);

  const handleCreatePurchase = async (purchaseData: any) => {
    console.log('Create purchase:', purchaseData);
    setIsDialogOpen(false);
  };

  const handleView = (purchase: any) => {
    console.log('View purchase:', purchase);
  };

  const handleEdit = (purchase: any) => {
    console.log('Edit purchase:', purchase);
  };

  const handleDelete = (id: string) => {
    console.log('Delete purchase:', id);
  };

  const totalAmount = purchases.reduce((sum, purchase) => sum + purchase.total_amount, 0);
  const receivedPurchases = purchases.filter(p => p.status === 'received');
  const pendingPurchases = purchases.filter(p => p.status === 'pending');

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Achats</h1>
          <p className="text-gray-600 mt-2">Gérez vos achats et fournisseurs</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvel achat
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total achats</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{purchases.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Montant total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Achats reçus</CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{receivedPurchases.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingPurchases.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des achats</CardTitle>
        </CardHeader>
        <CardContent>
          {purchases.length > 0 ? (
            <PurchasesTable 
              purchases={purchases} 
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aucun achat trouvé</p>
              <Button 
                onClick={() => setIsDialogOpen(true)} 
                className="mt-4"
              >
                Créer votre premier achat
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Nouvel achat</DialogTitle>
          </DialogHeader>
          <PurchaseForm 
            onSubmit={handleCreatePurchase}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
