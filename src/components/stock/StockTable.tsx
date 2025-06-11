
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
import { Plus, Minus, Edit } from 'lucide-react';

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
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produit</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Stock Actuel</TableHead>
            <TableHead>Seuil Minimum</TableHead>
            <TableHead>Valeur Stock</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stock.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.products?.name}</TableCell>
              <TableCell>{item.products?.sku || '-'}</TableCell>
              <TableCell>{item.products?.product_categories?.name}</TableCell>
              <TableCell>{item.quantity_in_stock}</TableCell>
              <TableCell>{item.minimum_stock_level || 0}</TableCell>
              <TableCell>
                {formatPrice(item.quantity_in_stock * (item.products?.unit_price || 0))}
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
