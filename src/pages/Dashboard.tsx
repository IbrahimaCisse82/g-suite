import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, Users, FileText, Package, TrendingUp, DollarSign } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { InitialSetupModal } from '@/components/setup/InitialSetupModal';
import { TPESimplifiedDashboard } from '@/components/tpe/TPESimplifiedDashboard';
import { useInitialSetup } from '@/hooks/useInitialSetup';
import { useProfileAccess } from '@/hooks/useProfileAccess';

const mockStats = [
  {
    title: 'Chiffre d\'affaires',
    value: '2 450 000 XOF',
    change: '+12%',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Factures en attente',
    value: '8',
    change: '-3',
    icon: FileText,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    title: 'Produits en stock',
    value: '156',
    change: '+24',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Clients actifs',
    value: '42',
    change: '+5',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
];

const Dashboard = () => {
  const { needsSetup, isLoading, completeSetup } = useInitialSetup();
  const { moduleType, profile } = useProfileAccess();

  // Vérifier si l'utilisateur préfère l'interface TPE simplifiée
  const isTPEMode = localStorage.getItem('tpe_selected_module') || moduleType === 'entreprise';
  // Simuler une taille d'entreprise pour la démo - peut être 'solo', 'micro', ou 'small'
  const companySize = Math.random() > 0.5 ? 'micro' : 'solo';

  if (isLoading) {
    return (
      <Layout>
        <div className="p-8 gradient-bg min-h-full">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Interface TPE simplifiée pour les petites entreprises
  if (isTPEMode && (companySize === 'solo' || companySize === 'micro')) {
    return (
      <Layout>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-slate-900 mb-2 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                Mon activité
              </h1>
              <p className="text-xl text-slate-600">
                Vue d'ensemble simplifiée pour votre TPE
              </p>
            </div>

            <TPESimplifiedDashboard />
          </div>

          <InitialSetupModal 
            isOpen={needsSetup} 
            onComplete={completeSetup}
          />
        </div>
      </Layout>
    );
  }

  // Interface complète pour les entreprises plus importantes
  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              Tableau de bord
            </h1>
            <p className="text-xl text-slate-600">
              Aperçu de votre activité commerciale
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mockStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="border-0 shadow-lg card-hover bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-700">{stat.title}</CardTitle>
                    <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                    <p className="text-sm text-slate-600">
                      <span className={stat.change.startsWith('+') ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        {stat.change}
                      </span>
                      {' '}par rapport au mois dernier
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-white card-hover">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-slate-900">Créer une facture</span>
                    </div>
                    <TrendingUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-medium text-slate-900">Ajouter un client</span>
                    </div>
                    <TrendingUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                        <Package className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="font-medium text-slate-900">Gérer le stock</span>
                    </div>
                    <TrendingUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white card-hover">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  Activité récente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-900">Facture F-2024-001 créée</span>
                    <span className="text-slate-500">Il y a 2h</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-900">Client "Entreprise ABC" ajouté</span>
                    <span className="text-slate-500">Il y a 5h</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-900">Stock produit "Ordinateur" mis à jour</span>
                    <span className="text-slate-500">Hier</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-900">Paiement reçu - 150 000 XOF</span>
                    <span className="text-slate-500">Il y a 2 jours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <InitialSetupModal 
          isOpen={needsSetup} 
          onComplete={completeSetup}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
