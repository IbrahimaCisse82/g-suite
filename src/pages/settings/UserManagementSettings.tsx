
import React from 'react';
import { UserManagementSettings } from '@/components/settings/UserManagementSettings';
import { Layout } from '@/components/Layout';

export default function UserManagementSettingsPage() {
  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-readable-primary">Gestion des utilisateurs</h1>
            <p className="text-readable-secondary mt-2">Ajoutez et gérez les utilisateurs de votre équipe</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg">
            <UserManagementSettings />
          </div>
        </div>
      </div>
    </Layout>
  );
}
