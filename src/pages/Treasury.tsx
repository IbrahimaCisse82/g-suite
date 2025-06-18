
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { TreasuryTable } from '@/components/treasury/TreasuryTable';
import { EnhancedTreasuryForm } from '@/components/treasury/EnhancedTreasuryForm';
import { Layout } from '@/components/Layout';

export const Treasury = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const transactions: any[] = []; // Mock data - replace with actual data hook

  const handleTreasurySubmit = (transactionData: any) => {
    console.log('Treasury transaction submitted:', transactionData);
    setIsDialogOpen(false);
  };

  const handleEdit = (transaction: any) => {
    console.log('Edit transaction:', transaction);
  };

  const handleDelete = (id: string) => {
    console.log('Delete transaction:', id);
  };

  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-readable-primary mb-2 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              Gestion de trésorerie
            </h1>
            <p className="text-xl text-readable-secondary">Suivez vos flux de trésorerie et transactions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Solde total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-readable-primary">0 FCFA</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Entrées ce mois</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">0 FCFA</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Sorties ce mois</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">0 FCFA</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-readable-primary">Résultat mensuel</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-readable-primary">0 FCFA</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-readable-primary">Transactions</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle transaction
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                  <DialogTitle className="text-readable-primary">Ajouter une transaction</DialogTitle>
                </DialogHeader>
                <EnhancedTreasuryForm 
                  onSubmit={handleTreasurySubmit}
                  onCancel={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-0">
              <TreasuryTable 
                transactions={transactions}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
