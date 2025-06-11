
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface InvoiceTotalsSectionProps {
  subtotal: number;
  taxAmount: number;
  total: number;
}

export const InvoiceTotalsSection = ({ subtotal, taxAmount, total }: InvoiceTotalsSectionProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2 max-w-md ml-auto">
          <div className="flex justify-between">
            <span>Sous-total:</span>
            <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>TVA:</span>
            <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(taxAmount)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total:</span>
            <span>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
