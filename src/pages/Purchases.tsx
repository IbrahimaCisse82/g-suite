
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, ShoppingCart, TrendingUp, AlertCircle } from 'lucide-react';
import { PurchasesTable } from '@/components/purchases/PurchasesTable';
import { PurchaseForm } from '@/components/purchases/PurchaseForm';
import { useToast } from '@/hooks/use-toast';

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
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);
  const [purchases, setPurchases] = useState(mockPurchases);
  const { toast } = useToast();

  const handleCreatePurchase = async (purchaseData: any) => {
    console.log('Create purchase:', purchaseData);
    toast({
      title: "Achat créé",
      description: "Le nouvel achat a été créé avec succès.",
    });
    setIsDialogOpen(false);
  };

  const handleView = (purchase: any) => {
    console.log('View purchase:', purchase);
    setSelectedPurchase(purchase);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (purchase: any) => {
    console.log('Edit purchase:', purchase);
    setSelectedPurchase(purchase);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async (purchaseData: any) => {
    console.log('Update purchase:', purchaseData);
    toast({
      title: "Achat modifié",
      description: "L'achat a été modifié avec succès.",
    });
    setIsEditDialogOpen(false);
    setSelectedPurchase(null);
  };

  const handleDelete = (id: string) => {
    const purchase = purchases.find(p => p.id === id);
    setSelectedPurchase(purchase);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedPurchase) {
      setPurchases(purchases.filter(p => p.id !== selectedPurchase.id));
      toast({
        title: "Achat supprimé",
        description: "L'achat a été supprimé avec succès.",
        variant: "destructive",
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedPurchase(null);
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

      {/* Dialogue de création */}
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

      {/* Dialogue de visualisation */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de l'achat</DialogTitle>
          </DialogHeader>
          {selectedPurchase && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Numéro d'achat</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPurchase.purchase_number}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fournisseur</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPurchase.supplier}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date d'achat</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedPurchase.purchase_date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Statut</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPurchase.status}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Montant total</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Intl.NumberFormat('fr-FR', {
                      style: 'currency',
                      currency: 'XOF'
                    }).format(selectedPurchase.total_amount)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialogue d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Modifier l'achat</DialogTitle>
          </DialogHeader>
          {selectedPurchase && (
            <PurchaseForm 
              initialData={selectedPurchase}
              onSubmit={handleEditSubmit}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedPurchase(null);
              }}
              loading={false}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialogue de confirmation de suppression */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'achat</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'achat {selectedPurchase?.purchase_number} ? 
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setIsDeleteDialogOpen(false);
              setSelectedPurchase(null);
            }}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
