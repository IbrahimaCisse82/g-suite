
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, Users, FileText, Package, TrendingUp, DollarSign } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { InitialSetupModal } from '@/components/setup/InitialSetupModal';
import { useInitialSetup } from '@/hooks/useInitialSetup';

const mockStats = [
  {
    title: 'Chiffre d\'affaires',
    value: '2 450 000 XOF',
    change: '+12%',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    title: 'Factures en attente',
    value: '8',
    change: '-3',
    icon: FileText,
    color: 'text-orange-600'
  },
  {
    title: 'Produits en stock',
    value: '156',
    change: '+24',
    icon: Package,
    color: 'text-blue-600'
  },
  {
    title: 'Clients actifs',
    value: '42',
    change: '+5',
    icon: Users,
    color: 'text-purple-600'
  }
];

const Dashboard = () => {
  const { needsSetup, isLoading, completeSetup } = useInitialSetup();

  if (isLoading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center">
            <LayoutDashboard className="w-8 h-8 mr-3 text-green-600" />
            Tableau de bord
          </h1>
          <p className="text-muted-foreground">
            Aperçu de votre activité commerciale
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
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
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Créer une facture</span>
                  </div>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-green-600" />
                    <span>Ajouter un client</span>
                  </div>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-purple-600" />
                    <span>Gérer le stock</span>
                  </div>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>Facture F-2024-001 créée</span>
                  <span className="text-muted-foreground">Il y a 2h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Client "Entreprise ABC" ajouté</span>
                  <span className="text-muted-foreground">Il y a 5h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Stock produit "Ordinateur" mis à jour</span>
                  <span className="text-muted-foreground">Hier</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Paiement reçu - 150 000 XOF</span>
                  <span className="text-muted-foreground">Il y a 2 jours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Initial Setup Modal */}
      <InitialSetupModal 
        isOpen={needsSetup} 
        onComplete={completeSetup}
      />
    </Layout>
  );
};

export default Dashboard;
