
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff } from 'lucide-react';

interface ChartOfAccount {
  id: string;
  accountNumber: string;
  accountTitle: string;
  accountType: string;
  hasCarryForward: boolean;
  isHidden: boolean;
}

interface AccountsTableProps {
  accounts: ChartOfAccount[];
  onToggleVisibility: (id: string) => void;
}

export const AccountsTable = ({ accounts, onToggleVisibility }: AccountsTableProps) => {
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Capitaux': 'bg-blue-100 text-blue-800',
      'Immobilisation': 'bg-green-100 text-green-800',
      'Stock': 'bg-yellow-100 text-yellow-800',
      'Client': 'bg-purple-100 text-purple-800',
      'Fournisseur': 'bg-orange-100 text-orange-800',
      'Banque': 'bg-cyan-100 text-cyan-800',
      'Charge': 'bg-red-100 text-red-800',
      'Produit': 'bg-emerald-100 text-emerald-800',
      'Salarie': 'bg-pink-100 text-pink-800',
      'Amortis/Provision': 'bg-gray-100 text-gray-800',
      'Titre': 'bg-indigo-100 text-indigo-800',
      'Résultat-Bilan': 'bg-violet-100 text-violet-800',
      'Resulat-Gestion': 'bg-teal-100 text-teal-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Compte</TableHead>
            <TableHead>Intitulé du compte</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Report à nouveau</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id} className={account.isHidden ? 'opacity-50' : ''}>
              <TableCell className="font-mono font-semibold">{account.accountNumber}</TableCell>
              <TableCell>{account.accountTitle}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={getTypeColor(account.accountType)}>
                  {account.accountType}
                </Badge>
              </TableCell>
              <TableCell>
                {account.hasCarryForward ? (
                  <Badge variant="default" className="bg-green-100 text-green-800">Oui</Badge>
                ) : (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">Non</Badge>
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleVisibility(account.id)}
                >
                  {account.isHidden ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
