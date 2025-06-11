
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { InvoiceLineItem } from './InvoiceLineItem';

interface InvoiceLine {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  line_total: number;
}

interface InvoiceLinesSectionProps {
  lines: InvoiceLine[];
  onUpdateLine: (id: string, field: keyof InvoiceLine, value: any) => void;
  onAddLine: () => void;
  onRemoveLine: (id: string) => void;
}

export const InvoiceLinesSection = ({ 
  lines, 
  onUpdateLine, 
  onAddLine, 
  onRemoveLine 
}: InvoiceLinesSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Lignes de facture
          <Button type="button" onClick={onAddLine} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une ligne
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lines.map((line) => (
            <InvoiceLineItem
              key={line.id}
              line={line}
              onUpdate={onUpdateLine}
              onRemove={onRemoveLine}
              canRemove={lines.length > 1}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
