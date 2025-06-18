
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
import { Edit } from 'lucide-react';

interface StockTableProps {
  stock: any[];
  onStockMovement: (product: any) => void;
}

export const StockTable = ({ stock, onStockMovement }: StockTableProps) => {
  const getStockStatus = (item: any) => {
    const { quantity_in_stock, minimum_stock_level } = item;
    
    if (quantity_in_stock <= 0) {
      return <Badge variant="destructive">Rupture</Badge>;
    } else if (quantity_in_stock <= minimum_stock_level) {
      return <Badge variant="secondary">Stock faible</Badge>;
    } else {
      return <Badge variant="default">En stock</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(price);
  };

  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="table-text">Produit</TableHead>
            <TableHead className="table-text">SKU</TableHead>
            <TableHead className="table-text">Catégorie</TableHead>
            <TableHead className="table-text">Stock Actuel</TableHead>
            <TableHead className="table-text">Seuil Minimum</TableHead>
            <TableHead className="table-text">Valeur Stock</TableHead>
            <TableHead className="table-text">Statut</TableHead>
            <TableHead className="table-text">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stock.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="table-text font-medium">{item.products?.name}</TableCell>
              <TableCell className="table-text-secondary">{item.products?.sku || '-'}</TableCell>
              <TableCell className="table-text-secondary">{item.products?.product_categories?.name}</TableCell>
              <TableCell className="table-text">{item.quantity_in_stock || 0}</TableCell>
              <TableCell className="table-text-secondary">{item.minimum_stock_level || 0}</TableCell>
              <TableCell className="table-text font-semibold">
                {formatPrice((item.quantity_in_stock || 0) * (item.products?.unit_price || 0))}
              </TableCell>
              <TableCell>{getStockStatus(item)}</TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onStockMovement(item.products)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
