
import { useState, useCallback } from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import { usePerformance } from '@/hooks/usePerformance';

export const useEmployeesLogic = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { employees, loading, createEmployee, deleteEmployee } = useEmployees();
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

  return {
    employees,
    loading,
    showCreateForm,
    setShowCreateForm,
    handleCreateEmployee,
    handleViewEmployee,
    handleEditEmployee,
    handleDeleteEmployee,
  };
};
