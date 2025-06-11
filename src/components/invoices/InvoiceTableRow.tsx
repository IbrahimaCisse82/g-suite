
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Download } from 'lucide-react';
import { InvoiceStatusBadge } from './InvoiceStatusBadge';

interface InvoiceTableRowProps {
  invoice: any;
  onView: (invoice: any) => void;
  onEdit: (invoice: any) => void;
  onDownload: (invoice: any) => void;
  formatAmount: (amount: number) => string;
}

export const InvoiceTableRow = ({ 
  invoice, 
  onView, 
  onEdit, 
  onDownload,
  formatAmount 
}: InvoiceTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
      <TableCell>{invoice.contacts?.name}</TableCell>
      <TableCell>{new Date(invoice.invoice_date).toLocaleDateString('fr-FR')}</TableCell>
      <TableCell>{new Date(invoice.due_date).toLocaleDateString('fr-FR')}</TableCell>
      <TableCell>{formatAmount(invoice.total_amount)}</TableCell>
      <TableCell>
        <InvoiceStatusBadge status={invoice.status} />
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => onView(invoice)}>
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => onEdit(invoice)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDownload(invoice)}>
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
