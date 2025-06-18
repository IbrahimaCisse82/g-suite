
import React from 'react';
import { Layout } from '@/components/Layout';
import { FinancialStatementsGenerator } from '@/components/accounting/FinancialStatementsGenerator';

export const FinancialStatements = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-green-50">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">États Financiers SYSCOHADA</h1>
            <p className="text-gray-600 mt-2">
              Génération automatique des états financiers selon les normes SYSCOHADA
            </p>
          </div>
          
          <FinancialStatementsGenerator />
        </div>
      </div>
    </Layout>
  );
};

export default FinancialStatements;
