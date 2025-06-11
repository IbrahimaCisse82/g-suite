
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Wallet, TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';
import { TreasuryTable } from '@/components/treasury/TreasuryTable';
import { TreasuryForm } from '@/components/treasury/TreasuryForm';

const mockTransactions = [
  {
    id: '1',
    transaction_date: '2024-06-10',
    transaction_type: 'income',
    amount: 150000,
    description: 'Paiement facture F-2024-001',
    category: 'Ventes'
  },
  {
    id: '2',
    transaction_date: '2024-06-08',
    transaction_type: 'expense',
    amount: 45000,
    description: 'Achat fournitures bureau',
    category: 'Fournitures'
  },
  {
    id: '3',
    transaction_date: '2024-06-05',
    transaction_type: 'income',
    amount: 200000,
    description: 'Vente produits',
    category: 'Ventes'
  }
];

export const Treasury = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactions] = useState(mockTransactions);

  const handleCreateTransaction = async (transactionData: any) => {
    console.log('Create transaction:', transactionData);
    setIsDialogOpen(false);
  };

  const handleEdit = (transaction: any) => {
    console.log('Edit transaction:', transaction);
  };

  const handleDelete = (id: string) => {
    console.log('Delete transaction:', id);
  };

  const totalIncome = transactions
    .filter(t => t.transaction_type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.transaction_type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpense;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trésorerie</h1>
          <p className="text-gray-600 mt-2">Suivez vos flux de trésorerie</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle transaction
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solde actuel</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'XOF'
              }).format(balance)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recettes</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'XOF'
              }).format(totalIncome)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dépenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'XOF'
              }).format(totalExpense)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mouvements de trésorerie</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length > 0 ? (
            <TreasuryTable 
              transactions={transactions} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="text-center py-8">
              <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aucune transaction trouvée</p>
              <Button 
                onClick={() => setIsDialogOpen(true)} 
                className="mt-4"
              >
                Créer votre première transaction
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nouvelle transaction</DialogTitle>
          </DialogHeader>
          <TreasuryForm 
            onSubmit={handleCreateTransaction}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
