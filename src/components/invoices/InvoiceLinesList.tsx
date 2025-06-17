
import React from 'react';
import { InvoiceLineItem } from './InvoiceLineItem';

interface InvoiceLine {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  line_total: number;
}

interface InvoiceLinesListProps {
  lines: InvoiceLine[];
  onUpdateLine: (id: string, field: keyof InvoiceLine, value: any) => void;
  onRemoveLine: (id: string) => void;
}

export const InvoiceLinesList = ({ lines, onUpdateLine, onRemoveLine }: InvoiceLinesListProps) => {
  return (
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
  );
};
