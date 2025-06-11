
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { InvoiceTableRow } from './InvoiceTableRow';
import { useInvoicePDFGenerator } from './InvoicePDFGenerator';

interface InvoicesTableProps {
  invoices: any[];
  onView: (invoice: any) => void;
  onEdit: (invoice: any) => void;
  onDownload: (invoice: any) => void;
}

export const InvoicesTable = ({ invoices, onView, onEdit, onDownload }: InvoicesTableProps) => {
  const { generateInvoicePDF } = useInvoicePDFGenerator();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(amount);
  };

  const handleDownload = (invoice: any) => {
    generateInvoicePDF(invoice);
    onDownload(invoice);
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Numéro</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Échéance</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <InvoiceTableRow
              key={invoice.id}
              invoice={invoice}
              onView={onView}
              onEdit={onEdit}
              onDownload={handleDownload}
              formatAmount={formatAmount}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
