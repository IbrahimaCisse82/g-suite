
import React, { Suspense } from 'react';
import { Layout } from '@/components/Layout';
import { PageLoader } from '@/components/common/PageLoader';
import { PageTransition } from '@/components/common/PageTransition';
import { usePerformance } from '@/hooks/usePerformance';

const Analytics = React.memo(() => {
  const { measureOperation } = usePerformance('Analytics');

  return (
    <Layout>
      <PageTransition>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold text-readable-primary mb-2">Analytics</h1>
              <p className="text-xl text-readable-secondary">Analysez vos données et performances</p>
            </div>

            <Suspense fallback={<PageLoader text="Chargement des analytics..." rows={6} />}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-sm animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Métrique {i}</h3>
                    <p className="text-3xl font-bold text-green-600">0</p>
                    <p className="text-sm text-gray-500 mt-1">Données en cours de chargement...</p>
                  </div>
                ))}
              </div>
            </Suspense>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tableau de bord analytique</h2>
              <p className="text-gray-600">Les fonctionnalités analytiques avancées seront bientôt disponibles.</p>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
});

Analytics.displayName = 'Analytics';
export default Analytics;
