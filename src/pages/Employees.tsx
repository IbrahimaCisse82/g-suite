
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { EmployeeHeader } from '@/components/employees/EmployeeHeader';
import { EmployeeForm } from '@/components/employees/EmployeeForm';
import { EmployeeTable } from '@/components/employees/EmployeeTable';
import { EmployeeStats } from '@/components/employees/EmployeeStats';
import { Card, CardContent } from '@/components/ui/card';
import { useEmployees } from '@/hooks/useEmployees';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Employees = () => {
  const { employees, loading, createEmployee, deleteEmployee } = useEmployees();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateEmployee = async (employeeData: any) => {
    try {
      await createEmployee(employeeData);
      setShowCreateForm(false);
    } catch (error) {
      // Error already handled in hook
    }
  };

  const handleViewEmployee = (employee: any) => {
    console.log('Viewing employee:', employee);
    // TODO: Implement employee details view
  };

  const handleEditEmployee = (employee: any) => {
    console.log('Editing employee:', employee);
    // TODO: Implement employee editing
  };

  const handleDeleteEmployee = async (employee: any) => {
    if (confirm('Êtes-vous sûr de vouloir désactiver cet employé ?')) {
      await deleteEmployee(employee.id);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Chargement des employés...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <EmployeeHeader 
          onCreateEmployee={() => setShowCreateForm(true)}
          totalEmployees={employees.length}
        />

        <EmployeeStats employees={employees} />

        <Card>
          <CardContent className="p-6">
            {employees.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Aucun employé enregistré pour le moment</p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="text-blue-600 hover:text-blue-800"
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
          <DialogContent className="max-w-4xl">
            <EmployeeForm
              onSubmit={handleCreateEmployee}
              onCancel={() => setShowCreateForm(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Employees;
