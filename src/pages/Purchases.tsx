
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, ShoppingCart } from 'lucide-react';
import { PurchasesKPICards } from '@/components/purchases/PurchasesKPICards';
import { PurchasesListCard } from '@/components/purchases/PurchasesListCard';
import { PurchaseForm } from '@/components/purchases/PurchaseForm';
import { Layout } from '@/components/Layout';

export const Purchases = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const purchases: any[] = []; // Mock data - replace with actual data hook

  const handleCreatePurchase = () => {
    setIsDialogOpen(true);
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

  const handlePurchaseSubmit = (purchaseData: any) => {
    console.log('Purchase submitted:', purchaseData);
    setIsDialogOpen(false);
  };

  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-readable-primary mb-2 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              Gestion des achats
            </h1>
            <p className="text-xl text-readable-secondary">Gérez vos achats et fournisseurs</p>
          </div>
          
          <div className="mb-8">
            <PurchasesKPICards purchases={purchases} />
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-readable-primary">Liste des achats</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvel achat
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                  <DialogTitle className="text-readable-primary">Enregistrer un nouvel achat</DialogTitle>
                </DialogHeader>
                <PurchaseForm 
                  onSubmit={handlePurchaseSubmit}
                  onCancel={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          <PurchasesListCard 
            purchases={purchases}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreatePurchase={handleCreatePurchase}
          />
        </div>
      </div>
    </Layout>
  );
};
