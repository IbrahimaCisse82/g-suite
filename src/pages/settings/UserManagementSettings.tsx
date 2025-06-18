
import React from 'react';
import { UserManagementSettings } from '@/components/settings/UserManagementSettings';
import { Layout } from '@/components/Layout';

export default function UserManagementSettingsPage() {
  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-readable-primary mb-2">Gestion des utilisateurs</h1>
            <p className="text-xl text-readable-secondary">Ajoutez et gérez les utilisateurs de votre équipe</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg">
            <UserManagementSettings />
          </div>
        </div>
      </div>
    </Layout>
  );
}
