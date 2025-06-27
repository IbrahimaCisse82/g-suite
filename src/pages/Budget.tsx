import React, { useState, Suspense } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { useBudgets } from '@/hooks/useBudgets';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PageLoader } from '@/components/common/PageLoader';
import { usePerformance } from '@/hooks/usePerformance';

// Lazy load des composants
const BudgetHeader = React.lazy(() => 
  import('@/components/budget/BudgetHeader').then(module => ({ default: module.BudgetHeader }))
);
const BudgetForm = React.lazy(() => 
  import('@/components/budget/BudgetForm').then(module => ({ default: module.BudgetForm }))
);
const BudgetTable = React.lazy(() => 
  import('@/components/budget/BudgetTable').then(module => ({ default: module.BudgetTable }))
);
const BudgetDetailsView = React.lazy(() => 
  import('@/components/budget/BudgetDetailsView').then(module => ({ default: module.BudgetDetailsView }))
);

const Budget = React.memo(() => {
  const { budgets, loading, createBudget, deleteBudget } = useBudgets();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { measureOperation } = usePerformance('Budget');

  const handleCreateBudget = async (budgetData: any) => {
    const endMeasure = measureOperation('Create Budget');
    try {
      await createBudget(budgetData);
      setShowCreateForm(false);
    } catch (error) {
      // Error already handled in hook
    } finally {
      endMeasure();
    }
  };

  const handleViewBudget = (budget: any) => {
    setSelectedBudget(budget);
    setShowDetails(true);
  };

  const handleEditBudget = (budget: any) => {
    console.log('Editing budget:', budget);
  };

  const handleDeleteBudget = async (budget: any) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce budget ?')) {
      await deleteBudget(budget.id);
    }
  };

  if (loading) {
    return (
      <Layout>
        <PageLoader text="Chargement des budgets..." rows={4} />
      </Layout>
    );
  }

  if (showDetails && selectedBudget) {
    return (
      <Layout>
        <div className="p-8">
          <Suspense fallback={<PageLoader type="spinner" />}>
            <BudgetDetailsView
              budget={selectedBudget}
              onClose={() => {
                setShowDetails(false);
                setSelectedBudget(null);
              }}
            />
          </Suspense>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <Suspense fallback={<PageLoader type="skeleton" rows={1} />}>
          <BudgetHeader onCreateBudget={() => setShowCreateForm(true)} />
        </Suspense>

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
              <Suspense fallback={<PageLoader type="skeleton" rows={5} />}>
                <BudgetTable
                  budgets={budgets}
                  onView={handleViewBudget}
                  onEdit={handleEditBudget}
                  onDelete={handleDeleteBudget}
                />
              </Suspense>
            )}
          </CardContent>
        </Card>

        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent className="max-w-2xl">
            <Suspense fallback={<PageLoader type="spinner" />}>
              <BudgetForm
                onSubmit={handleCreateBudget}
                onCancel={() => setShowCreateForm(false)}
              />
            </Suspense>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
});

Budget.displayName = 'Budget';
export default Budget;
