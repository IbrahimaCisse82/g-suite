import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Package, Truck } from 'lucide-react';
import { useStock, useStockMovements } from '@/hooks/useStock';
import { useDeliveries } from '@/hooks/useDeliveries';
import { StockTable } from '@/components/stock/StockTable';
import { StockMovementForm } from '@/components/stock/StockMovementForm';
import { StockMovementsTable } from '@/components/stock/StockMovementsTable';
import { DeliveriesTable } from '@/components/stock/DeliveriesTable';
import { DeliveryForm } from '@/components/stock/DeliveryForm';
import { Layout } from '@/components/Layout';

export const Stock = () => {
  const [isMovementDialogOpen, setIsMovementDialogOpen] = useState(false);
  const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: stock, isLoading: stockLoading } = useStock();
  const { data: movements, isLoading: movementsLoading } = useStockMovements();
  const { data: deliveries, isLoading: deliveriesLoading } = useDeliveries();

  const handleStockMovement = (product: any) => {
    setSelectedProduct(product);
    setIsMovementDialogOpen(true);
  };

  const handleCloseMovementDialog = () => {
    setIsMovementDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseDeliveryDialog = () => {
    setIsDeliveryDialogOpen(false);
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion du stock</h1>
          <p className="text-gray-600">Suivez et gérez vos niveaux de stock</p>
        </div>

        <Tabs defaultValue="stock" className="space-y-6">
          <TabsList>
            <TabsTrigger value="stock">Stock actuel</TabsTrigger>
            <TabsTrigger value="movements">Mouvements</TabsTrigger>
            <TabsTrigger value="deliveries">Livraisons</TabsTrigger>
          </TabsList>

          <TabsContent value="stock" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">État du stock</h2>
              <Dialog open={isMovementDialogOpen} onOpenChange={setIsMovementDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedProduct(null)}>
                    <Package className="w-4 h-4 mr-2" />
                    Mouvement de stock
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nouveau mouvement de stock</DialogTitle>
                  </DialogHeader>
                  <StockMovementForm 
                    product={selectedProduct} 
                    onClose={handleCloseMovementDialog}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {stockLoading ? (
              <div className="text-center py-4">Chargement du stock...</div>
            ) : (
              <StockTable 
                stock={stock || []} 
                onStockMovement={handleStockMovement}
              />
            )}
          </TabsContent>

          <TabsContent value="movements" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Historique des mouvements</h2>
            </div>

            {movementsLoading ? (
              <div className="text-center py-4">Chargement des mouvements...</div>
            ) : (
              <StockMovementsTable movements={movements || []} />
            )}
          </TabsContent>

          <TabsContent value="deliveries" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gestion des livraisons</h2>
              <Dialog open={isDeliveryDialogOpen} onOpenChange={setIsDeliveryDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Truck className="w-4 h-4 mr-2" />
                    Nouvelle livraison
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Créer une livraison</DialogTitle>
                  </DialogHeader>
                  <DeliveryForm onClose={handleCloseDeliveryDialog} />
                </DialogContent>
              </Dialog>
            </div>

            {deliveriesLoading ? (
              <div className="text-center py-4">Chargement des livraisons...</div>
            ) : (
              <DeliveriesTable deliveries={deliveries || []} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};
