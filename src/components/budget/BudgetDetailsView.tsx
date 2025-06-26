
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { BudgetLineForm } from './BudgetLineForm';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useBudgets } from '@/hooks/useBudgets';

interface BudgetDetailsViewProps {
  budget: any;
  onClose: () => void;
}

export const BudgetDetailsView = ({ budget, onClose }: BudgetDetailsViewProps) => {
  const [showLineForm, setShowLineForm] = useState(false);
  const { budgetLines, createBudgetLine, fetchBudgetLines } = useBudgets();

  React.useEffect(() => {
    if (budget?.id) {
      fetchBudgetLines(budget.id);
    }
  }, [budget?.id, fetchBudgetLines]);

  const handleAddLine = async (lineData: any) => {
    try {
      await createBudgetLine(budget.id, lineData);
      setShowLineForm(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la ligne:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Brouillon', variant: 'secondary' as const },
      approved: { label: 'Approuvé', variant: 'default' as const },
      active: { label: 'Actif', variant: 'default' as const },
      closed: { label: 'Clôturé', variant: 'outline' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const calculateTotals = () => {
    const totalBudgeted = budgetLines.reduce((sum, line) => sum + Number(line.budgeted_amount), 0);
    const totalActual = budgetLines.reduce((sum, line) => sum + Number(line.actual_amount), 0);
    const totalVariance = totalBudgeted - totalActual;
    
    return { totalBudgeted, totalActual, totalVariance };
  };

  const { totalBudgeted, totalActual, totalVariance } = calculateTotals();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{budget.name}</h2>
          <p className="text-gray-600">Exercice fiscal {budget.fiscal_year}</p>
        </div>
        <div className="flex items-center gap-4">
          {getStatusBadge(budget.status)}
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Période</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Du {format(new Date(budget.start_date), 'dd MMMM yyyy', { locale: fr })}
              <br />
              Au {format(new Date(budget.end_date), 'dd MMMM yyyy', { locale: fr })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Budget total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {totalBudgeted.toLocaleString('fr-FR')} XOF
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Écart</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${totalVariance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalVariance.toLocaleString('fr-FR')} XOF
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lignes budgétaires</CardTitle>
            <Button onClick={() => setShowLineForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une ligne
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {budgetLines.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucune ligne budgétaire définie
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Compte</th>
                    <th className="text-left py-2">Catégorie</th>
                    <th className="text-right py-2">Budgété</th>
                    <th className="text-right py-2">Réalisé</th>
                    <th className="text-right py-2">Écart</th>
                    <th className="text-right py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetLines.map((line) => (
                    <tr key={line.id} className="border-b">
                      <td className="py-2">
                        <div>
                          <div className="font-medium">{line.account_name}</div>
                          <div className="text-sm text-gray-500">{line.account_number}</div>
                        </div>
                      </td>
                      <td className="py-2">{line.category}</td>
                      <td className="text-right py-2">
                        {Number(line.budgeted_amount).toLocaleString('fr-FR')} XOF
                      </td>
                      <td className="text-right py-2">
                        {Number(line.actual_amount).toLocaleString('fr-FR')} XOF
                      </td>
                      <td className={`text-right py-2 ${line.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {Number(line.variance || (line.budgeted_amount - line.actual_amount)).toLocaleString('fr-FR')} XOF
                      </td>
                      <td className="text-right py-2">
                        <div className="flex justify-end space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showLineForm} onOpenChange={setShowLineForm}>
        <DialogContent className="max-w-2xl">
          <BudgetLineForm
            onSubmit={handleAddLine}
            onCancel={() => setShowLineForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
