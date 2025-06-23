
import React from 'react';
import { AdminBackofficeLayout } from '@/components/admin/AdminBackofficeLayout';
import { AdminCredentialsManager } from '@/components/admin/AdminCredentialsManager';

export const AdminSetup = () => {
  return (
    <AdminBackofficeLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuration Administrateurs</h1>
          <p className="text-gray-600">
            Gérez les comptes et identifiants des administrateurs système
          </p>
        </div>
        <AdminCredentialsManager />
      </div>
    </AdminBackofficeLayout>
  );
};
