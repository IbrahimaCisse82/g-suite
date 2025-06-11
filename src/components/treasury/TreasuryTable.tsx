
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
import { Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react';

interface TreasuryTableProps {
  transactions: any[];
  onEdit: (transaction: any) => void;
  onDelete: (id: string) => void;
}

export const TreasuryTable = ({ transactions, onEdit, onDelete }: TreasuryTableProps) => {
  const getTypeBadge = (type: string) => {
    if (type === 'income') {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          <TrendingUp className="w-3 h-3 mr-1" />
          Recette
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive" className="bg-red-100 text-red-800">
          <TrendingDown className="w-3 h-3 mr-1" />
          Dépense
        </Badge>
      );
    }
  };

  const formatAmount = (amount: number, type: string) => {
    const formatted = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(amount);
    
    return (
      <span className={type === 'income' ? 'text-green-600' : 'text-red-600'}>
        {type === 'income' ? '+' : '-'}{formatted}
      </span>
    );
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead className="text-right">Montant</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{new Date(transaction.transaction_date).toLocaleDateString('fr-FR')}</TableCell>
              <TableCell>{getTypeBadge(transaction.transaction_type)}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell className="text-right">
                {formatAmount(transaction.amount, transaction.transaction_type)}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(transaction)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDelete(transaction.id)}>
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
