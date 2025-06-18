
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, DollarSign, TrendingUp, Calculator } from 'lucide-react';
import { Layout } from '@/components/Layout';

const Budget = () => {
  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              Gestion du Budget
            </h1>
            <p className="text-xl text-slate-600">
              Planifiez et suivez votre budget d'entreprise
            </p>
          </div>

          {/* Budget Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg card-hover bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">Budget Total</CardTitle>
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 mb-1">5 000 000 XOF</div>
                <p className="text-sm text-slate-600">
                  <span className="text-green-600 font-medium">+15%</span> par rapport à l'année dernière
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg card-hover bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">Dépenses Réalisées</CardTitle>
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-red-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 mb-1">3 200 000 XOF</div>
                <p className="text-sm text-slate-600">
                  <span className="text-orange-600 font-medium">64%</span> du budget utilisé
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg card-hover bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">Budget Restant</CardTitle>
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 mb-1">1 800 000 XOF</div>
                <p className="text-sm text-slate-600">
                  <span className="text-green-600 font-medium">36%</span> disponible
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg card-hover bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">Postes Budgétaires</CardTitle>
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <PieChart className="h-5 w-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 mb-1">12</div>
                <p className="text-sm text-slate-600">
                  <span className="text-blue-600 font-medium">+2</span> nouveaux postes
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Budget Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <PieChart className="w-4 h-4 text-white" />
                  </div>
                  Répartition par Poste
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-slate-900">Personnel</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">2 000 000 XOF</span>
                      <p className="text-sm text-slate-600">40%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-slate-900">Marketing</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">800 000 XOF</span>
                      <p className="text-sm text-slate-600">16%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      <span className="font-medium text-slate-900">Opérations</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">1 200 000 XOF</span>
                      <p className="text-sm text-slate-600">24%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      <span className="font-medium text-slate-900">Autres</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">1 000 000 XOF</span>
                      <p className="text-sm text-slate-600">20%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  Évolution Mensuelle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-900">Janvier 2024</span>
                    <span className="text-slate-500">400 000 XOF</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-900">Février 2024</span>
                    <span className="text-slate-500">520 000 XOF</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-900">Mars 2024</span>
                    <span className="text-slate-500">480 000 XOF</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="font-medium text-green-900">Avril 2024 (Actuel)</span>
                    <span className="text-green-600 font-bold">350 000 XOF</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Budget;
