
import React from 'react';
import { Layout } from '@/components/Layout';
import { JournalEntriesManager } from '@/components/accounting/JournalEntriesManager';

export const JournalEntries = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Écritures Comptables</h1>
            <p className="text-gray-600 mt-2">
              Saisie et gestion des écritures comptables selon les normes SYSCOHADA
            </p>
          </div>
          
          <JournalEntriesManager />
        </div>
      </div>
    </Layout>
  );
};

export default JournalEntries;
