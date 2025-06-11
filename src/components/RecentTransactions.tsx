
import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const transactions = [
  { id: 1, type: 'income', description: 'Facture FAC-2024-001', amount: 2450.00, date: '2024-06-10', client: 'Entreprise ABC' },
  { id: 2, type: 'expense', description: 'Fournitures bureau', amount: -340.50, date: '2024-06-09', client: 'Office Plus' },
  { id: 3, type: 'income', description: 'Facture FAC-2024-002', amount: 1800.00, date: '2024-06-08', client: 'Client XYZ' },
  { id: 4, type: 'expense', description: 'Électricité', amount: -185.30, date: '2024-06-07', client: 'EDF' },
  { id: 5, type: 'income', description: 'Virement bancaire', amount: 5000.00, date: '2024-06-06', client: 'Associé' },
];

export const RecentTransactions = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Transactions récentes</h2>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
          Voir tout
        </button>
      </div>
      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${
                transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowUpCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <ArrowDownCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-600">{transaction.client} • {transaction.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('fr-FR', { 
                  style: 'currency', 
                  currency: 'EUR' 
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
