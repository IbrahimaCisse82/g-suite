
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Calculator, BarChart3, TrendingUp, PieChart, FileBarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Accounting = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: 'Plan Comptable',
      description: 'Gestion du plan comptable SYSCOHADA',
      icon: FileText,
      path: '/chart-of-accounts',
      color: 'bg-blue-500'
    },
    {
      title: 'États Financiers',
      description: 'Génération des états financiers SYSCOHADA',
      icon: FileBarChart,
      path: '/financial-statements',
      color: 'bg-green-500'
    },
    {
      title: 'Écritures Comptables',
      description: 'Saisie et gestion des écritures',
      icon: Calculator,
      path: '/journal-entries',
      color: 'bg-purple-500'
    },
    {
      title: 'Grand Livre',
      description: 'Consultation du grand livre',
      icon: BarChart3,
      path: '/ledger',
      color: 'bg-orange-500'
    },
    {
      title: 'Balance',
      description: 'Balance générale et auxiliaire',
      icon: TrendingUp,
      path: '/balance',
      color: 'bg-red-500'
    },
    {
      title: 'Rapports',
      description: 'Rapports comptables et analytiques',
      icon: PieChart,
      path: '/accounting-reports',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Comptabilité Générale</h1>
            <p className="text-gray-600">
              Module de comptabilité conforme aux normes SYSCOHADA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Card key={module.path} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${module.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{module.description}</p>
                    <Button 
                      onClick={() => navigate(module.path)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Accéder
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fonctionnalités Comptables</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Plan comptable SYSCOHADA conforme</li>
                  <li>✓ Saisie d'écritures par lot</li>
                  <li>✓ Lettrage automatique</li>
                  <li>✓ États financiers normalisés</li>
                  <li>✓ Gestion des immobilisations</li>
                  <li>✓ Calcul automatique des amortissements</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conformité SYSCOHADA</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Bilan SYSCOHADA</li>
                  <li>✓ Compte de résultat</li>
                  <li>✓ Tableau des flux de trésorerie</li>
                  <li>✓ État annexé</li>
                  <li>✓ Livre journal</li>
                  <li>✓ Grand livre</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};
