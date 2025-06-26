
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Employee {
  id: string;
  employee_number: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  position: string;
  department?: string;
  hire_date: string;
  contract_type: string;
  salary?: number;
  is_active: boolean;
}

interface EmployeeTableProps {
  employees: Employee[];
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export const EmployeeTable = ({ employees, onView, onEdit, onDelete }: EmployeeTableProps) => {
  const getContractTypeBadge = (type: string) => {
    const typeConfig = {
      cdi: { label: 'CDI', variant: 'default' as const },
      cdd: { label: 'CDD', variant: 'secondary' as const },
      stage: { label: 'Stage', variant: 'outline' as const },
      freelance: { label: 'Freelance', variant: 'secondary' as const }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.cdi;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employé</TableHead>
          <TableHead>Poste</TableHead>
          <TableHead>Département</TableHead>
          <TableHead>Embauché le</TableHead>
          <TableHead>Contrat</TableHead>
          <TableHead>Salaire</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>
              <div>
                <div className="font-medium">
                  {employee.first_name} {employee.last_name}
                </div>
                <div className="text-sm text-gray-500">{employee.employee_number}</div>
              </div>
            </TableCell>
            <TableCell>{employee.position}</TableCell>
            <TableCell>{employee.department || '-'}</TableCell>
            <TableCell>
              {format(new Date(employee.hire_date), 'dd/MM/yyyy', { locale: fr })}
            </TableCell>
            <TableCell>{getContractTypeBadge(employee.contract_type)}</TableCell>
            <TableCell>
              {employee.salary ? `${employee.salary.toLocaleString('fr-FR')} XOF` : '-'}
            </TableCell>
            <TableCell>
              <div className="flex space-x-1">
                {employee.email && (
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Mail className="h-3 w-3" />
                  </Button>
                )}
                {employee.phone && (
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Phone className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(employee)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(employee)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(employee)}
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
