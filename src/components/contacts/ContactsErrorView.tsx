
import React from 'react';
import { Layout } from '@/components/Layout';

export const ContactsErrorView = () => {
  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur de chargement</h1>
            <p className="text-gray-600">
              Impossible de charger les contacts. Veuillez rafraîchir la page.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
