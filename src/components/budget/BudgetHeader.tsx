
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface BudgetHeaderProps {
  onCreateBudget: () => void;
}

export const BudgetHeader = ({ onCreateBudget }: BudgetHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Budget</h1>
        <p className="text-gray-600">Gestion et suivi des budgets prévisionnels</p>
      </div>
      <Button onClick={onCreateBudget} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Nouveau Budget
      </Button>
    </div>
  );
};
