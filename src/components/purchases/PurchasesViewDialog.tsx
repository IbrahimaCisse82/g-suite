
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PurchasesViewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  purchase: any;
}

export const PurchasesViewDialog = ({ isOpen, onOpenChange, purchase }: PurchasesViewDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Détails de l'achat</DialogTitle>
        </DialogHeader>
        {purchase && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Numéro d'achat</label>
                <p className="mt-1 text-sm text-gray-900">{purchase.purchase_number}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fournisseur</label>
                <p className="mt-1 text-sm text-gray-900">{purchase.supplier}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date d'achat</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(purchase.purchase_date).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Statut</label>
                <p className="mt-1 text-sm text-gray-900">{purchase.status}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Montant total</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'XOF'
                  }).format(purchase.total_amount)}
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
