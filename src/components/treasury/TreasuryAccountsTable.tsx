
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Banknote, Wallet, Smartphone } from 'lucide-react';
import { useTreasuryAccounts, useDeleteTreasuryAccount } from '@/hooks/useTreasuryAccounts';

interface TreasuryAccountsTableProps {
  onEdit: (account: any) => void;
}

export const TreasuryAccountsTable = ({ onEdit }: TreasuryAccountsTableProps) => {
  const { data: accounts = [], isLoading } = useTreasuryAccounts();
  const deleteMutation = useDeleteTreasuryAccount();

  const getAccountTypeIcon = (type: string) => {
    switch (type) {
      case 'bank':
        return <Banknote className="w-4 h-4" />;
      case 'cash':
        return <Wallet className="w-4 h-4" />;
      case 'electronic_money':
        return <Smartphone className="w-4 h-4" />;
      default:
        return <Banknote className="w-4 h-4" />;
    }
  };

  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case 'bank':
        return 'Banque';
      case 'cash':
        return 'Caisse';
      case 'electronic_money':
        return 'Monnaie électronique';
      default:
        return type;
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  if (isLoading) {
    return <div className="text-center py-4">Chargement des comptes...</div>;
  }

  if (accounts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun compte de trésorerie trouvé</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom du compte</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Numéro</TableHead>
          <TableHead>Banque</TableHead>
          <TableHead>Solde actuel</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow key={account.id}>
            <TableCell className="font-medium">{account.account_name}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                {getAccountTypeIcon(account.account_type)}
                <span>{getAccountTypeLabel(account.account_type)}</span>
              </div>
            </TableCell>
            <TableCell>{account.account_number || '-'}</TableCell>
            <TableCell>{account.bank_name || '-'}</TableCell>
            <TableCell>
              <Badge variant={account.current_balance >= 0 ? 'default' : 'destructive'}>
                {formatAmount(account.current_balance, account.currency)}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(account)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMutation.mutate(account.id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
