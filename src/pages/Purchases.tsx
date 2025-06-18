
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PurchasesHeader } from '@/components/purchases/PurchasesHeader';
import { PurchasesKPICards } from '@/components/purchases/PurchasesKPICards';
import { PurchasesListCard } from '@/components/purchases/PurchasesListCard';
import { PurchaseForm } from '@/components/purchases/PurchaseForm';
import { Layout } from '@/components/Layout';

export const Purchases = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <PurchasesHeader />
          
          <div className="mb-8">
            <PurchasesKPICards />
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
                <PurchaseForm onClose={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          <PurchasesListCard />
        </div>
      </div>
    </Layout>
  );
};
