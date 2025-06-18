
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface PurchasesHeaderProps {
  onCreatePurchase?: () => void;
}

export const PurchasesHeader = ({ onCreatePurchase }: PurchasesHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Achats</h1>
        <p className="text-gray-600 mt-2">Gérez vos achats et fournisseurs</p>
      </div>
      {onCreatePurchase && (
        <Button onClick={onCreatePurchase}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvel achat
        </Button>
      )}
    </div>
  );
};
