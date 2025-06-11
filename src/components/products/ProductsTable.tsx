
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

interface ProductsTableProps {
  products: any[];
  onEdit: (product: any) => void;
}

export const ProductsTable = ({ products, onEdit }: ProductsTableProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(price);
  };

  const getStockStatus = (stock: any) => {
    if (!stock) return <Badge variant="secondary">Non défini</Badge>;
    
    const { quantity_in_stock, minimum_stock_level } = stock;
    
    if (quantity_in_stock <= 0) {
      return <Badge variant="destructive">Rupture</Badge>;
    } else if (quantity_in_stock <= minimum_stock_level) {
      return <Badge variant="secondary">Stock faible</Badge>;
    } else {
      return <Badge variant="default">En stock</Badge>;
    }
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Prix de vente</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Statut Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sku || '-'}</TableCell>
              <TableCell>{product.product_categories?.name}</TableCell>
              <TableCell>{formatPrice(product.unit_price)}</TableCell>
              <TableCell>
                {product.product_stock?.[0]?.quantity_in_stock || 0}
              </TableCell>
              <TableCell>
                {getStockStatus(product.product_stock?.[0])}
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
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
