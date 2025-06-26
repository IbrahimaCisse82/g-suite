
import React from 'react';
import { Layout } from '@/components/Layout';
import { GrandLivre } from '@/components/accounting/GrandLivre';

const GrandLivrePage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <GrandLivre />
        </div>
      </div>
    </Layout>
  );
};

export default GrandLivrePage;
