
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';

interface EmployeeHeaderProps {
  onCreateEmployee: () => void;
  totalEmployees: number;
}

export const EmployeeHeader = ({ onCreateEmployee, totalEmployees }: EmployeeHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Employés</h1>
        <p className="text-gray-600 flex items-center gap-2">
          <Users className="h-4 w-4" />
          {totalEmployees} employé{totalEmployees > 1 ? 's' : ''} actif{totalEmployees > 1 ? 's' : ''}
        </p>
      </div>
      <Button onClick={onCreateEmployee} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Nouvel Employé
      </Button>
    </div>
  );
};
