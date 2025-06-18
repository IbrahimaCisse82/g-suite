
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, X } from 'lucide-react';

interface BudgetLine {
  id: string;
  category: string;
  amount: number;
}

interface BudgetFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (budget: any) => void;
}

export const BudgetForm = ({ isOpen, onClose, onSave }: BudgetFormProps) => {
  const [budgetYear, setBudgetYear] = useState(new Date().getFullYear());
  const [budgetLines, setBudgetLines] = useState<BudgetLine[]>([
    { id: '1', category: 'Personnel', amount: 0 },
    { id: '2', category: 'Marketing', amount: 0 },
    { id: '3', category: 'Opérations', amount: 0 },
    { id: '4', category: 'Autres', amount: 0 }
  ]);

  const addBudgetLine = () => {
    const newLine: BudgetLine = {
      id: Date.now().toString(),
      category: '',
      amount: 0
    };
    setBudgetLines([...budgetLines, newLine]);
  };

  const removeBudgetLine = (id: string) => {
    setBudgetLines(budgetLines.filter(line => line.id !== id));
  };

  const updateBudgetLine = (id: string, field: 'category' | 'amount', value: string | number) => {
    setBudgetLines(budgetLines.map(line => 
      line.id === id ? { ...line, [field]: value } : line
    ));
  };

  const calculateTotal = () => {
    return budgetLines.reduce((total, line) => total + (line.amount || 0), 0);
  };

  const handleSave = () => {
    if (budgetLines.some(line => !line.category || line.amount <= 0)) {
      toast.error('Veuillez remplir tous les champs du budget');
      return;
    }

    const budget = {
      year: budgetYear,
      lines: budgetLines,
      totalAmount: calculateTotal(),
      createdAt: new Date()
    };

    onSave(budget);
    toast.success(`Budget ${budgetYear} créé avec succès`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-readable-primary">
            Créer un Budget Annuel
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budgetYear" className="text-sm font-medium text-readable-primary">
                Année du budget
              </Label>
              <Input
                id="budgetYear"
                type="number"
                value={budgetYear}
                onChange={(e) => setBudgetYear(parseInt(e.target.value))}
                min={new Date().getFullYear()}
                max={new Date().getFullYear() + 5}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-readable-primary">Postes budgétaires</h3>
              <Button onClick={addBudgetLine} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un poste
              </Button>
            </div>

            <div className="space-y-3">
              {budgetLines.map((line, index) => (
                <div key={line.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <Input
                      placeholder="Nom du poste budgétaire"
                      value={line.category}
                      onChange={(e) => updateBudgetLine(line.id, 'category', e.target.value)}
                    />
                  </div>
                  <div className="w-48">
                    <Input
                      type="number"
                      placeholder="Montant (XOF)"
                      value={line.amount || ''}
                      onChange={(e) => updateBudgetLine(line.id, 'amount', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  {budgetLines.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBudgetLine(line.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span className="text-readable-primary">Total du budget :</span>
              <span className="text-green-600">
                {calculateTotal().toLocaleString('fr-FR')} XOF
              </span>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              Créer le budget
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
