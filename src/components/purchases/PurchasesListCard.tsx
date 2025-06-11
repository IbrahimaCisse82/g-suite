
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { PurchasesTable } from './PurchasesTable';

interface PurchasesListCardProps {
  purchases: any[];
  onView: (purchase: any) => void;
  onEdit: (purchase: any) => void;
  onDelete: (id: string) => void;
  onCreatePurchase: () => void;
  onReceive?: (purchase: any) => void;
}

export const PurchasesListCard = ({ purchases, onView, onEdit, onDelete, onCreatePurchase, onReceive }: PurchasesListCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des achats</CardTitle>
      </CardHeader>
      <CardContent>
        {purchases.length > 0 ? (
          <PurchasesTable 
            purchases={purchases} 
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onReceive={onReceive}
          />
        ) : (
          <div className="text-center py-8">
            <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aucun achat trouvé</p>
            <Button 
              onClick={onCreatePurchase} 
              className="mt-4"
            >
              Créer votre premier achat
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
