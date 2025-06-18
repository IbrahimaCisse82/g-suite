
import React from 'react';
import { CompanyProfileSettings } from '@/components/settings/CompanyProfileSettings';
import { Layout } from '@/components/Layout';

export default function ProfileSettings() {
  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-readable-primary">Profil de l'entreprise</h1>
            <p className="text-readable-secondary mt-2">Gérez les informations de votre entreprise</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg">
            <CompanyProfileSettings />
          </div>
        </div>
      </div>
    </Layout>
  );
}
