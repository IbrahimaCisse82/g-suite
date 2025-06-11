
import React, { useState } from 'react';
import { Plus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { StockTable } from '@/components/stock/StockTable';
import { StockMovementForm } from '@/components/stock/StockMovementForm';
import { StockMovementsTable } from '@/components/stock/StockMovementsTable';
import { DeliveriesTable } from '@/components/stock/DeliveriesTable';
import { DeliveryForm } from '@/components/stock/DeliveryForm';
import { useStock, useStockMovements } from '@/hooks/useStock';
import { useDeliveries } from '@/hooks/useDeliveries';

export const Stock = () => {
  const [movementDialogOpen, setMovementDialogOpen] = useState(false);
  const [deliveryDialogOpen, setDeliveryDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: stock, isLoading: stockLoading } = useStock();
  const { data: movements, isLoading: movementsLoading } = useStockMovements();
  const { data: deliveries, isLoading: deliveriesLoading } = useDeliveries();

  const handleStockMovement = (product: any) => {
    setSelectedProduct(product);
    setMovementDialogOpen(true);
  };

  const handleCloseMovementDialog = () => {
    setMovementDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestion du Stock</h1>
      </div>

      <Tabs defaultValue="stock" className="space-y-6">
        <TabsList>
          <TabsTrigger value="stock">Stock Actuel</TabsTrigger>
          <TabsTrigger value="movements">Mouvements</TabsTrigger>
          <TabsTrigger value="deliveries">Livraisons</TabsTrigger>
        </TabsList>

        <TabsContent value="stock" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                État du Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stockLoading ? (
                <div>Chargement...</div>
              ) : (
                <StockTable 
                  stock={stock || []}
                  onStockMovement={handleStockMovement}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Mouvements de Stock</CardTitle>
              <Dialog open={movementDialogOpen} onOpenChange={setMovementDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau Mouvement
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Mouvement de Stock</DialogTitle>
                  </DialogHeader>
                  <StockMovementForm 
                    product={selectedProduct}
                    onClose={handleCloseMovementDialog}
                  />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {movementsLoading ? (
                <div>Chargement...</div>
              ) : (
                <StockMovementsTable movements={movements || []} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deliveries" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Gestion des Livraisons</CardTitle>
              <Dialog open={deliveryDialogOpen} onOpenChange={setDeliveryDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle Livraison
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Créer une Livraison</DialogTitle>
                  </DialogHeader>
                  <DeliveryForm onClose={() => setDeliveryDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {deliveriesLoading ? (
                <div>Chargement...</div>
              ) : (
                <DeliveriesTable deliveries={deliveries || []} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
