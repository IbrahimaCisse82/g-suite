
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Eye, Download } from 'lucide-react';

interface InvoicesTableProps {
  invoices: any[];
  onView: (invoice: any) => void;
  onEdit: (invoice: any) => void;
  onDownload: (invoice: any) => void;
}

export const InvoicesTable = ({ invoices, onView, onEdit, onDownload }: InvoicesTableProps) => {
  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'secondary',
      sent: 'default',
      paid: 'default',
      overdue: 'destructive',
      cancelled: 'outline'
    } as const;
    
    const labels = {
      draft: 'Brouillon',
      sent: 'Envoyée',
      paid: 'Payée',
      overdue: 'En retard',
      cancelled: 'Annulée'
    };
    
    return <Badge variant={variants[status as keyof typeof variants]}>
      {labels[status as keyof typeof labels]}
    </Badge>;
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(amount);
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
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
              <TableCell>{invoice.contacts?.name}</TableCell>
              <TableCell>{new Date(invoice.invoice_date).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell>{new Date(invoice.due_date).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell>{formatAmount(invoice.total_amount)}</TableCell>
              <TableCell>{getStatusBadge(invoice.status)}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
