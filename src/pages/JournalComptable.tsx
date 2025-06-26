
import React from 'react';
import { Layout } from '@/components/Layout';
import { JournalComptable } from '@/components/accounting/JournalComptable';

const JournalComptablePage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <JournalComptable />
        </div>
      </div>
    </Layout>
  );
};

export default JournalComptablePage;
