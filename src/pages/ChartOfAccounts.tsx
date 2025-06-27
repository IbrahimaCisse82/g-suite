
import React from 'react';
import { Layout } from '@/components/Layout';
import { ChartOfAccountsTable } from '@/components/accounting/ChartOfAccountsTable';

const ChartOfAccounts = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Plan Comptable SYSCOHADA</h1>
            <p className="text-gray-600 mt-2">
              Gestion du plan comptable conforme aux normes SYSCOHADA
            </p>
          </div>
          
          <ChartOfAccountsTable />
        </div>
      </div>
    </Layout>
  );
};

export default ChartOfAccounts;
