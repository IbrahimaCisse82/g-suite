
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
import { Edit, Eye, Trash2 } from 'lucide-react';

interface PurchasesTableProps {
  purchases: any[];
  onView: (purchase: any) => void;
  onEdit: (purchase: any) => void;
  onDelete: (id: string) => void;
}

export const PurchasesTable = ({ purchases, onView, onEdit, onDelete }: PurchasesTableProps) => {
  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'secondary',
      received: 'default',
      paid: 'default',
      cancelled: 'destructive'
    } as const;
    
    const labels = {
      pending: 'En attente',
      received: 'Reçu',
      paid: 'Payé',
      cancelled: 'Annulé'
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
            <TableHead>Fournisseur</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell className="font-medium">{purchase.purchase_number}</TableCell>
              <TableCell>{purchase.supplier}</TableCell>
              <TableCell>{new Date(purchase.purchase_date).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell>{formatAmount(purchase.total_amount)}</TableCell>
              <TableCell>{getStatusBadge(purchase.status)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onView(purchase)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onEdit(purchase)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDelete(purchase.id)}>
                    <Trash2 className="w-4 h-4" />
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
