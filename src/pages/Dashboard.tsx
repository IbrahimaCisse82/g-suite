
import React from 'react';
import { Layout } from '@/components/Layout';
import { InitialSetupModal } from '@/components/setup/InitialSetupModal';
import { TPESimplifiedDashboard } from '@/components/tpe/TPESimplifiedDashboard';
import { useInitialSetup } from '@/hooks/useInitialSetup';
import { useProfileAccess } from '@/hooks/useProfileAccess';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

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
            <DashboardHeader 
              title="Mon activité" 
              subtitle="Vue d'ensemble simplifiée pour votre TPE" 
            />
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
          <DashboardHeader 
            title="Tableau de bord" 
            subtitle="Aperçu de votre activité commerciale" 
          />
          <StatsCards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuickActions />
            <RecentActivity />
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
