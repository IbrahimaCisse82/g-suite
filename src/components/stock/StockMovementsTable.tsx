
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

interface StockMovementsTableProps {
  movements: any[];
}

export const StockMovementsTable = ({ movements }: StockMovementsTableProps) => {
  const getMovementTypeBadge = (type: string) => {
    const variants = {
      in: 'default',
      out: 'destructive',
      adjustment: 'secondary'
    } as const;
    
    const labels = {
      in: 'Entrée',
      out: 'Sortie',
      adjustment: 'Ajustement'
    };
    
    return <Badge variant={variants[type as keyof typeof variants]}>
      {labels[type as keyof typeof labels]}
    </Badge>;
  };

  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="table-text">Date</TableHead>
            <TableHead className="table-text">Produit</TableHead>
            <TableHead className="table-text">Type</TableHead>
            <TableHead className="table-text">Quantité</TableHead>
            <TableHead className="table-text">Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.map((movement) => (
            <TableRow key={movement.id}>
              <TableCell className="table-text-secondary">
                {new Date(movement.created_at).toLocaleDateString('fr-FR')}
              </TableCell>
              <TableCell className="table-text font-medium">
                {movement.products?.name} ({movement.products?.sku || 'Sans SKU'})
              </TableCell>
              <TableCell>{getMovementTypeBadge(movement.movement_type)}</TableCell>
              <TableCell className="table-text">{movement.quantity}</TableCell>
              <TableCell className="table-text-muted">{movement.notes || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
