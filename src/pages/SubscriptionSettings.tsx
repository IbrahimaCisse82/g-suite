
import React from 'react';
import { Layout } from '../components/Layout';
import { SubscriptionManager } from '../components/subscriptions/SubscriptionManager';

export const SubscriptionSettings = () => {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des abonnements</h1>
          <p className="text-muted-foreground">
            Gérez votre plan d'abonnement et soumettez des demandes d'upgrade
          </p>
        </div>
        <SubscriptionManager />
      </div>
    </Layout>
  );
};
