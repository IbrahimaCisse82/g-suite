
import React from 'react';
import { CompanyProfileSettings } from '@/components/settings/CompanyProfileSettings';
import { Layout } from '@/components/Layout';

export default function ProfileSettings() {
  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-readable-primary mb-2">Profil de l'entreprise</h1>
            <p className="text-xl text-readable-secondary">Gérez les informations de votre entreprise</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg">
            <CompanyProfileSettings />
          </div>
        </div>
      </div>
    </Layout>
  );
}
