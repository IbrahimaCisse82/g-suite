
import React from 'react';
import { Layout } from '../components/Layout';
import { AdminCredentialsManager } from '../components/admin/AdminCredentialsManager';

export const AdminSetup = () => {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Configuration Administrateurs</h1>
          <p className="text-muted-foreground">
            Gérez les comptes et identifiants des administrateurs système
          </p>
        </div>
        <AdminCredentialsManager />
      </div>
    </Layout>
  );
};
