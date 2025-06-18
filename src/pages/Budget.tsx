
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, DollarSign, TrendingUp, Calculator, Plus } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { BudgetForm } from '@/components/budget/BudgetForm';
import { toast } from 'sonner';

const Budget = () => {
  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);
  const [budgets, setBudgets] = useState<any[]>([]);

  const handleCreateBudget = () => {
    setIsBudgetFormOpen(true);
  };

  const handleSaveBudget = (budget: any) => {
    setBudgets([...budgets, budget]);
    console.log('Nouveau budget créé:', budget);
  };

  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-readable-primary mb-2 flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  Gestion du Budget
                </h1>
                <p className="text-xl text-readable-secondary">
                  Planifiez et suivez votre budget d'entreprise
                </p>
              </div>
              <Button 
                onClick={handleCreateBudget}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Créer un budget annuel
              </Button>
            </div>
          </div>

          {/* Budget Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg card-hover bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Budget Total</CardTitle>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-readable-primary mb-1">5 000 000 XOF</div>
                <p className="text-sm text-readable-secondary">
                  <span className="text-green-600 font-medium">+15%</span> par rapport à l'année dernière
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg card-hover bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Dépenses Réalisées</CardTitle>
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-red-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-readable-primary mb-1">3 200 000 XOF</div>
                <p className="text-sm text-readable-secondary">
                  <span className="text-orange-600 font-medium">64%</span> du budget utilisé
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg card-hover bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Budget Restant</CardTitle>
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-readable-primary mb-1">1 800 000 XOF</div>
                <p className="text-sm text-readable-secondary">
                  <span className="text-green-600 font-medium">36%</span> disponible
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg card-hover bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Postes Budgétaires</CardTitle>
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <PieChart className="h-5 w-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-readable-primary mb-1">12</div>
                <p className="text-sm text-readable-secondary">
                  <span className="text-blue-600 font-medium">+2</span> nouveaux postes
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Budget Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-readable-primary flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <PieChart className="w-4 h-4 text-white" />
                  </div>
                  Répartition par Poste
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-300 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-readable-primary">Personnel</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-readable-primary">2 000 000 XOF</span>
                      <p className="text-sm text-readable-secondary">40%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-300 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-readable-primary">Marketing</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-readable-primary">800 000 XOF</span>
                      <p className="text-sm text-readable-secondary">16%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-300 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      <span className="font-medium text-readable-primary">Opérations</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-readable-primary">1 200 000 XOF</span>
                      <p className="text-sm text-readable-secondary">24%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-300 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      <span className="font-medium text-readable-primary">Autres</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-readable-primary">1 000 000 XOF</span>
                      <p className="text-sm text-readable-secondary">20%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-readable-primary flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  Évolution Mensuelle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-300">
                    <span className="font-medium text-readable-primary">Janvier 2024</span>
                    <span className="text-readable-secondary">400 000 XOF</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-300">
                    <span className="font-medium text-readable-primary">Février 2024</span>
                    <span className="text-readable-secondary">520 000 XOF</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-300">
                    <span className="font-medium text-readable-primary">Mars 2024</span>
                    <span className="text-readable-secondary">480 000 XOF</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-300">
                    <span className="font-medium text-green-900">Avril 2024 (Actuel)</span>
                    <span className="text-green-600 font-bold">350 000 XOF</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Budget Form Dialog */}
          <BudgetForm
            isOpen={isBudgetFormOpen}
            onClose={() => setIsBudgetFormOpen(false)}
            onSave={handleSaveBudget}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Budget;
