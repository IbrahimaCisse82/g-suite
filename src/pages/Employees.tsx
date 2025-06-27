
import React, { useState, useMemo, useCallback } from 'react';
import { Layout } from '@/components/Layout';
import { EmployeeHeader } from '@/components/employees/EmployeeHeader';
import { EmployeeForm } from '@/components/employees/EmployeeForm';
import { EmployeeTable } from '@/components/employees/EmployeeTable';
import { EmployeeStats } from '@/components/employees/EmployeeStats';
import { Card, CardContent } from '@/components/ui/card';
import { useEmployees } from '@/hooks/useEmployees';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

const Employees = () => {
  const { employees, loading, createEmployee, deleteEmployee } = useEmployees();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateEmployee = useCallback(async (employeeData: any) => {
    try {
      await createEmployee(employeeData);
      setShowCreateForm(false);
    } catch (error) {
      // Error already handled in hook
    }
  }, [createEmployee]);

  const handleViewEmployee = useCallback((employee: any) => {
    console.log('Viewing employee:', employee);
    // TODO: Implement employee details view
  }, []);

  const handleEditEmployee = useCallback((employee: any) => {
    console.log('Editing employee:', employee);
    // TODO: Implement employee editing
  }, []);

  const handleDeleteEmployee = useCallback(async (employee: any) => {
    if (confirm('Êtes-vous sûr de vouloir désactiver cet employé ?')) {
      await deleteEmployee(employee.id);
    }
  }, [deleteEmployee]);

  const handleOpenCreateForm = useCallback(() => {
    setShowCreateForm(true);
  }, []);

  const handleCloseCreateForm = useCallback(() => {
    setShowCreateForm(false);
  }, []);

  const employeeStats = useMemo(() => employees, [employees]);

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner fullScreen text="Chargement des employés..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 p-6">
        <EmployeeHeader 
          onCreateEmployee={handleOpenCreateForm}
          totalEmployees={employees.length}
        />

        <EmployeeStats employees={employeeStats} />

        <Card className="shadow-sm">
          <CardContent className="p-6">
            {employees.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Aucun employé enregistré pour le moment</p>
                <button
                  onClick={handleOpenCreateForm}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Ajouter votre premier employé
                </button>
              </div>
            ) : (
              <EmployeeTable
                employees={employees}
                onView={handleViewEmployee}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
              />
            )}
          </CardContent>
        </Card>

        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <EmployeeForm
              onSubmit={handleCreateEmployee}
              onCancel={handleCloseCreateForm}
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Employees;
