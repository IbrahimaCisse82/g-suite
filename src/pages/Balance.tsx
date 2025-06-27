
import React from 'react';
import { Layout } from '@/components/Layout';
import { BalanceGenerale } from '@/components/accounting/BalanceGenerale';

const Balance = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <BalanceGenerale />
        </div>
      </div>
    </Layout>
  );
};

export default Balance;
