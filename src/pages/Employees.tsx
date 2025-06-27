import React, { useState, useMemo, useCallback, Suspense } from 'react';
import { Layout } from '@/components/Layout';
import { EmployeeHeader } from '@/components/employees/EmployeeHeader';
import { Card, CardContent } from '@/components/ui/card';
import { useEmployees } from '@/hooks/useEmployees';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PageLoader } from '@/components/common/PageLoader';
import { usePerformance } from '@/hooks/usePerformance';
import { OptimizedCard } from '@/components/common/OptimizedCard';

// Lazy load des composants lourds
const EmployeeForm = React.lazy(() => 
  import('@/components/employees/EmployeeForm').then(module => ({ default: module.EmployeeForm }))
);
const EmployeeTable = React.lazy(() => 
  import('@/components/employees/EmployeeTable').then(module => ({ default: module.EmployeeTable }))
);
const EmployeeStats = React.lazy(() => 
  import('@/components/employees/EmployeeStats').then(module => ({ default: module.EmployeeStats }))
);

const Employees = React.memo(() => {
  const { employees, loading, createEmployee, deleteEmployee } = useEmployees();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { measureOperation } = usePerformance('Employees');

  const handleCreateEmployee = useCallback(async (employeeData: any) => {
    const endMeasure = measureOperation('Create Employee');
    try {
      await createEmployee(employeeData);
      setShowCreateForm(false);
    } catch (error) {
      // Error already handled in hook
    } finally {
      endMeasure();
    }
  }, [createEmployee, measureOperation]);

  const handleViewEmployee = useCallback((employee: any) => {
    console.log('Viewing employee:', employee);
  }, []);

  const handleEditEmployee = useCallback((employee: any) => {
    console.log('Editing employee:', employee);
  }, []);

  const handleDeleteEmployee = useCallback(async (employee: any) => {
    if (confirm('Êtes-vous sûr de vouloir désactiver cet employé ?')) {
      const endMeasure = measureOperation('Delete Employee');
      try {
        await deleteEmployee(employee.id);
      } finally {
        endMeasure();
      }
    }
  }, [deleteEmployee, measureOperation]);

  const memoizedStats = useMemo(() => employees, [employees]);

  if (loading) {
    return (
      <Layout>
        <PageLoader text="Chargement des employés..." rows={5} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 p-6">
        <EmployeeHeader 
          onCreateEmployee={() => setShowCreateForm(true)}
          totalEmployees={employees.length}
        />

        <Suspense fallback={<PageLoader type="skeleton" rows={2} />}>
          <EmployeeStats employees={memoizedStats} />
        </Suspense>

        <OptimizedCard className="shadow-sm">
          <CardContent className="p-6">
            {employees.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Aucun employé enregistré pour le moment</p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Ajouter votre premier employé
                </button>
              </div>
            ) : (
              <Suspense fallback={<PageLoader type="skeleton" rows={5} />}>
                <EmployeeTable
                  employees={employees}
                  onView={handleViewEmployee}
                  onEdit={handleEditEmployee}
                  onDelete={handleDeleteEmployee}
                />
              </Suspense>
            )}
          </CardContent>
        </OptimizedCard>

        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <Suspense fallback={<PageLoader type="spinner" />}>
              <EmployeeForm
                onSubmit={handleCreateEmployee}
                onCancel={() => setShowCreateForm(false)}
              />
            </Suspense>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
});

Employees.displayName = 'Employees';
export default Employees;
