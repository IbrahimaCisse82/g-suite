
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Edit, Trash2 } from 'lucide-react';

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
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Numéro de Compte</TableHead>
            <TableHead>Intitulé</TableHead>
            <TableHead>Nature du compte</TableHead>
            <TableHead className="text-center">Report à nouveau</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id} className={account.isHidden ? 'opacity-50' : ''}>
              <TableCell className="font-medium">{account.accountNumber}</TableCell>
              <TableCell>{account.accountTitle}</TableCell>
              <TableCell>{account.accountType}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Checkbox 
                    checked={account.hasCarryForward} 
                    disabled 
                    className="pointer-events-none"
                  />
                </div>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  account.isHidden 
                    ? 'bg-gray-100 text-gray-600' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {account.isHidden ? 'Masqué' : 'Visible'}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex justify-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onToggleVisibility(account.id)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {account.isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-green-600 hover:text-green-700"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
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
