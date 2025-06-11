
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PurchaseForm } from '@/components/purchases/PurchaseForm';
import { PurchasesHeader } from '@/components/purchases/PurchasesHeader';
import { PurchasesKPICards } from '@/components/purchases/PurchasesKPICards';
import { PurchasesListCard } from '@/components/purchases/PurchasesListCard';
import { PurchasesViewDialog } from '@/components/purchases/PurchasesViewDialog';
import { PurchasesDeleteDialog } from '@/components/purchases/PurchasesDeleteDialog';
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

  return (
    <div className="p-8">
      <PurchasesHeader onCreatePurchase={() => setIsDialogOpen(true)} />
      
      <PurchasesKPICards purchases={purchases} />

      <PurchasesListCard 
        purchases={purchases}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreatePurchase={() => setIsDialogOpen(true)}
      />

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
      <PurchasesViewDialog 
        isOpen={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        purchase={selectedPurchase}
      />

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
      <PurchasesDeleteDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        purchase={selectedPurchase}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
