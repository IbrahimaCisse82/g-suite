
import React, { Suspense } from 'react';
import { OptimizedCard } from '@/components/common/OptimizedCard';
import { SmartLoader } from '@/components/common/SmartLoader';
import { FastSearch } from '@/components/common/FastSearch';
import { ConnectivityStatus } from '@/components/common/ConnectivityStatus';
import { SyncStatus } from '@/components/common/SyncStatus';
import { DashboardHeader } from './DashboardHeader';
import { StatsCards } from './StatsCards';
import { QuickActions } from './QuickActions';
import { RecentActivity } from './RecentActivity';
import { TrendingUp, Users, FileText, Package, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockSearchResults = [
  { id: '1', title: 'Créer une facture', subtitle: 'Nouvelle facturation client', category: 'Action', action: () => console.log('Navigate to invoice') },
  { id: '2', title: 'Voir les clients', subtitle: 'Gestion des contacts', category: 'Navigation', action: () => console.log('Navigate to contacts') },
  { id: '3', title: 'Rapport mensuel', subtitle: 'Analytics et rapports', category: 'Rapport', action: () => console.log('Navigate to reports') },
  { id: '4', title: 'Gérer le stock', subtitle: 'Inventaire et produits', category: 'Gestion', action: () => console.log('Navigate to stock') },
];

export const OptimizedDashboard = () => {
  const navigate = useNavigate();

  const handleQuickSearch = async (query: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return mockSearchResults.filter(result =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.subtitle.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearchSelect = (result: any) => {
    if (result.action) {
      result.action();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <DashboardHeader 
          title="Tableau de bord" 
          subtitle="Vue d'ensemble de votre activité" 
        />
        
        <div className="w-full sm:w-80">
          <FastSearch
            onSearch={handleQuickSearch}
            onResultSelect={handleSearchSelect}
            placeholder="Recherche rapide..."
            className="w-full"
          />
        </div>
      </div>

      {/* Indicateurs de connectivité et synchronisation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ConnectivityStatus showDetails />
        <SyncStatus 
          pendingCount={0} 
          onSync={() => console.log('Synchronisation manuelle')}
        />
      </div>

      <Suspense fallback={<SmartLoader isLoading={true} skeleton={true} rows={2} />}>
        <StatsCards />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <OptimizedCard
            title="Actions rapides"
            icon={TrendingUp}
            priority="high"
          >
            <Suspense fallback={<SmartLoader isLoading={true} skeleton={true} rows={2} />}>
              <QuickActions />
            </Suspense>
          </OptimizedCard>

          <OptimizedCard
            title="Activité récente"
            icon={FileText}
            priority="medium"
          >
            <Suspense fallback={<SmartLoader isLoading={true} skeleton={true} rows={4} />}>
              <RecentActivity />
            </Suspense>
          </OptimizedCard>
        </div>

        <div className="space-y-6">
          <OptimizedCard
            title="Clients actifs"
            icon={Users}
            priority="medium"
          >
            <div className="space-y-3">
              <div className="text-3xl font-bold text-green-600">124</div>
              <div className="text-sm text-gray-500">+12% ce mois</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </OptimizedCard>

          <OptimizedCard
            title="Chiffre d'affaires"
            icon={DollarSign}
            priority="high"
          >
            <div className="space-y-3">
              <div className="text-3xl font-bold text-blue-600">2,45M XOF</div>
              <div className="text-sm text-gray-500">Mois courant</div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.5% vs mois dernier
              </div>
            </div>
          </OptimizedCard>

          <OptimizedCard
            title="Stock critique"
            icon={Package}
            priority="high"
          >
            <div className="space-y-3">
              <div className="text-3xl font-bold text-red-600">3</div>
              <div className="text-sm text-gray-500">Produits en rupture</div>
              <button className="w-full bg-red-50 text-red-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                Voir les alertes
              </button>
            </div>
          </OptimizedCard>
        </div>
      </div>
    </div>
  );
};
