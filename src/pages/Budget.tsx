
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { BudgetHeader } from '@/components/budget/BudgetHeader';
import { BudgetForm } from '@/components/budget/BudgetForm';
import { BudgetTable } from '@/components/budget/BudgetTable';
import { BudgetDetailsView } from '@/components/budget/BudgetDetailsView';
import { Card, CardContent } from '@/components/ui/card';
import { useBudgets } from '@/hooks/useBudgets';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Budget = () => {
  const { budgets, loading, createBudget, deleteBudget } = useBudgets();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCreateBudget = async (budgetData: any) => {
    try {
      await createBudget(budgetData);
      setShowCreateForm(false);
    } catch (error) {
      // Error already handled in hook
    }
  };

  const handleViewBudget = (budget: any) => {
    setSelectedBudget(budget);
    setShowDetails(true);
  };

  const handleEditBudget = (budget: any) => {
    console.log('Editing budget:', budget);
    // TODO: Implement budget editing
  };

  const handleDeleteBudget = async (budget: any) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce budget ?')) {
      await deleteBudget(budget.id);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Chargement des budgets...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (showDetails && selectedBudget) {
    return (
      <Layout>
        <div className="p-8">
          <BudgetDetailsView
            budget={selectedBudget}
            onClose={() => {
              setShowDetails(false);
              setSelectedBudget(null);
            }}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <BudgetHeader onCreateBudget={() => setShowCreateForm(true)} />

        <Card>
          <CardContent className="p-6">
            {budgets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Aucun budget créé pour le moment</p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Créer votre premier budget
                </button>
              </div>
            ) : (
              <BudgetTable
                budgets={budgets}
                onView={handleViewBudget}
                onEdit={handleEditBudget}
                onDelete={handleDeleteBudget}
              />
            )}
          </CardContent>
        </Card>

        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent className="max-w-2xl">
            <BudgetForm
              onSubmit={handleCreateBudget}
              onCancel={() => setShowCreateForm(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Budget;
