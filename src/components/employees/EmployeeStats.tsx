
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Calendar, TrendingUp } from 'lucide-react';

interface EmployeeStatsProps {
  employees: any[];
}

export const EmployeeStats = ({ employees }: EmployeeStatsProps) => {
  const calculateStats = () => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp => emp.is_active).length;
    const contractTypes = employees.reduce((acc, emp) => {
      acc[emp.contract_type] = (acc[emp.contract_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const averageSalary = employees
      .filter(emp => emp.salary)
      .reduce((sum, emp) => sum + Number(emp.salary), 0) / employees.filter(emp => emp.salary).length || 0;

    const newHiresThisMonth = employees.filter(emp => {
      const hireDate = new Date(emp.hire_date);
      const currentDate = new Date();
      return hireDate.getMonth() === currentDate.getMonth() && 
             hireDate.getFullYear() === currentDate.getFullYear();
    }).length;

    return {
      totalEmployees,
      activeEmployees,
      contractTypes,
      averageSalary,
      newHiresThisMonth
    };
  };

  const stats = calculateStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total employés</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalEmployees}</div>
          <p className="text-xs text-muted-foreground">
            {stats.activeEmployees} actifs
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nouvelles embauches</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.newHiresThisMonth}</div>
          <p className="text-xs text-muted-foreground">
            Ce mois-ci
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Salaire moyen</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.averageSalary.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} XOF
          </div>
          <p className="text-xs text-muted-foreground">
            Brut mensuel
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CDI</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.contractTypes.cdi || 0}</div>
          <p className="text-xs text-muted-foreground">
            CDD: {stats.contractTypes.cdd || 0}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
