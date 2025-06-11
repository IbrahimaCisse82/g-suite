
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';

interface InvoiceLine {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  line_total: number;
}

interface InvoiceLineItemProps {
  line: InvoiceLine;
  onUpdate: (id: string, field: keyof InvoiceLine, value: any) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export const InvoiceLineItem = ({ line, onUpdate, onRemove, canRemove }: InvoiceLineItemProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
      <div className="md:col-span-2">
        <Label>Description</Label>
        <Input
          value={line.description}
          onChange={(e) => onUpdate(line.id, 'description', e.target.value)}
          placeholder="Description du produit/service"
        />
      </div>
      <div>
        <Label>Quantité</Label>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={line.quantity}
          onChange={(e) => onUpdate(line.id, 'quantity', parseFloat(e.target.value) || 0)}
        />
      </div>
      <div>
        <Label>Prix unitaire</Label>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={line.unit_price}
          onChange={(e) => onUpdate(line.id, 'unit_price', parseFloat(e.target.value) || 0)}
        />
      </div>
      <div>
        <Label>TVA (%)</Label>
        <Input
          type="number"
          min="0"
          max="100"
          step="0.01"
          value={line.tax_rate}
          onChange={(e) => onUpdate(line.id, 'tax_rate', parseFloat(e.target.value) || 0)}
        />
      </div>
      <div className="flex items-end">
        <div className="flex-1">
          <Label>Total</Label>
          <div className="text-lg font-semibold">
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'XOF'
            }).format(line.line_total)}
          </div>
        </div>
        {canRemove && (
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={() => onRemove(line.id)}
            className="ml-2"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
