
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, FileText, Users, Package, AlertCircle, CheckCircle } from 'lucide-react';

interface TPEMetrics {
  chiffreAffaires: number;
  chiffreAffairesEvolution: number;
  facturesEnAttente: number;
  clientsActifs: number;
  produitsStock: number;
  alertesStock: number;
  facturations: Array<{
    id: string;
    client: string;
    montant: number;
    statut: 'payee' | 'en_attente' | 'en_retard';
    date: string;
  }>;
}

export const TPETableauBordSimple = () => {
  const [metrics, setMetrics] = useState<TPEMetrics>({
    chiffreAffaires: 2450000,
    chiffreAffairesEvolution: 12.5,
    facturesEnAttente: 3,
    clientsActifs: 12,
    produitsStock: 45,
    alertesStock: 2,
    facturations: [
      {
        id: '1',
        client: 'Boutique Fatou',
        montant: 125000,
        statut: 'en_attente',
        date: '2024-01-15'
      },
      {
        id: '2',
        client: 'Restaurant Teranga',
        montant: 89000,
        statut: 'payee',
        date: '2024-01-14'
      },
      {
        id: '3',
        client: 'Salon Aida',
        montant: 156000,
        statut: 'en_retard',
        date: '2024-01-10'
      }
    ]
  });

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'payee': return 'bg-green-100 text-green-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'en_retard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'payee': return <CheckCircle className="w-4 h-4" />;
      case 'en_attente': return <AlertCircle className="w-4 h-4" />;
      case 'en_retard': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Titre avec message d'accueil */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-2">Bonjour ! 👋</h1>
        <p className="text-blue-100">Voici un résumé de votre activité</p>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Ventes ce mois</p>
                <p className="text-2xl font-bold text-green-900">
                  {(metrics.chiffreAffaires / 1000).toFixed(0)}K XOF
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-700">
                    +{metrics.chiffreAffairesEvolution}% vs mois dernier
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Factures en attente</p>
                <p className="text-2xl font-bold text-blue-900">{metrics.facturesEnAttente}</p>
                <p className="text-sm text-blue-700 mt-1">À faire suivre</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">Clients actifs</p>
                <p className="text-2xl font-bold text-purple-900">{metrics.clientsActifs}</p>
                <p className="text-sm text-purple-700 mt-1">Ce mois-ci</p>
              </div>
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800">Stock</p>
                <p className="text-2xl font-bold text-orange-900">{metrics.produitsStock}</p>
                <div className="flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 text-orange-600 mr-1" />
                  <span className="text-sm text-orange-700">
                    {metrics.alertesStock} alertes
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Factures récentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Factures récentes</span>
            <Button variant="outline" size="sm">Voir tout</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.facturations.map((facture) => (
              <div key={facture.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatutIcon(facture.statut)}
                  <div>
                    <p className="font-medium text-gray-900">{facture.client}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(facture.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {facture.montant.toLocaleString()} XOF
                  </p>
                  <Badge className={getStatutColor(facture.statut)}>
                    {facture.statut.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-16 flex flex-col items-center justify-center space-y-1">
              <FileText className="w-6 h-6" />
              <span className="text-sm">Nouvelle facture</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
              <Users className="w-6 h-6" />
              <span className="text-sm">Ajouter client</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
              <Package className="w-6 h-6" />
              <span className="text-sm">Gérer stock</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">Voir rapports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
