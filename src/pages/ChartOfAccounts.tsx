
import React from 'react';
import { Layout } from '@/components/Layout';
import { ChartOfAccountsTable } from '@/components/accounting/ChartOfAccountsTable';
import { FileBarChart } from 'lucide-react';

export const ChartOfAccounts = () => {
  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <FileBarChart className="w-5 h-5 text-white" />
              </div>
              Plan comptable
            </h1>
            <p className="text-muted-foreground">Gérez votre plan comptable et les comptes</p>
          </div>

          <ChartOfAccountsTable />
        </div>
      </div>
    </Layout>
  );
};
