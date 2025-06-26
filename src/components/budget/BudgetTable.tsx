
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Budget {
  id: string;
  name: string;
  fiscal_year: number;
  start_date: string;
  end_date: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface BudgetTableProps {
  budgets: Budget[];
  onView: (budget: Budget) => void;
  onEdit: (budget: Budget) => void;
  onDelete: (budget: Budget) => void;
}

export const BudgetTable = ({ budgets, onView, onEdit, onDelete }: BudgetTableProps) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Brouillon', variant: 'secondary' as const },
      approved: { label: 'Approuvé', variant: 'default' as const },
      active: { label: 'Actif', variant: 'default' as const },
      closed: { label: 'Clôturé', variant: 'outline' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Exercice</TableHead>
          <TableHead>Période</TableHead>
          <TableHead>Montant total</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {budgets.map((budget) => (
          <TableRow key={budget.id}>
            <TableCell className="font-medium">{budget.name}</TableCell>
            <TableCell>{budget.fiscal_year}</TableCell>
            <TableCell>
              {format(new Date(budget.start_date), 'dd/MM/yyyy', { locale: fr })} - {' '}
              {format(new Date(budget.end_date), 'dd/MM/yyyy', { locale: fr })}
            </TableCell>
            <TableCell>{budget.total_amount.toLocaleString('fr-FR')} XOF</TableCell>
            <TableCell>{getStatusBadge(budget.status)}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(budget)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(budget)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(budget)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
