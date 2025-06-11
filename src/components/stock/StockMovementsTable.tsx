
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
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Produit</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Quantité</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.map((movement) => (
            <TableRow key={movement.id}>
              <TableCell>
                {new Date(movement.created_at).toLocaleDateString('fr-FR')}
              </TableCell>
              <TableCell>
                {movement.products?.name} ({movement.products?.sku || 'Sans SKU'})
              </TableCell>
              <TableCell>{getMovementTypeBadge(movement.movement_type)}</TableCell>
              <TableCell>{movement.quantity}</TableCell>
              <TableCell>{movement.notes || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
