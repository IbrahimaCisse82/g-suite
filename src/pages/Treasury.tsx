
import React, { useState, useMemo, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PageTransition } from '@/components/common/PageTransition';
import { OptimizedCard } from '@/components/common/OptimizedCard';
import { LoadingButton } from '@/components/common/LoadingButton';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load des composants lourds
const TreasuryTable = lazy(() => import('@/components/treasury/TreasuryTable').then(module => ({ default: module.TreasuryTable })));
const EnhancedTreasuryForm = lazy(() => import('@/components/treasury/EnhancedTreasuryForm').then(module => ({ default: module.EnhancedTreasuryForm })));

export const Treasury = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const transactions: any[] = []; // Mock data - replace with actual data hook

  // Mémoisation des données pour éviter les recalculs
  const treasuryStats = useMemo(() => ({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    monthlyResult: 0
  }), [transactions]);

  const handleTreasurySubmit = async (transactionData: any) => {
    setIsLoading(true);
    try {
      console.log('Treasury transaction submitted:', transactionData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error submitting transaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (transaction: any) => {
    console.log('Edit transaction:', transaction);
  };

  const handleDelete = (id: string) => {
    console.log('Delete transaction:', id);
  };

  return (
    <Layout>
      <PageTransition>
        <div className="gradient-bg min-h-full">
          <div className="p-8">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold text-readable-primary mb-2 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 transform transition-transform hover:scale-110">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                Gestion de trésorerie
              </h1>
              <p className="text-xl text-readable-secondary">Suivez vos flux de trésorerie et transactions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <OptimizedCard className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-readable-primary">Solde total</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-readable-primary">{treasuryStats.totalBalance} FCFA</div>
                </CardContent>
              </OptimizedCard>
              
              <OptimizedCard className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-readable-primary">Entrées ce mois</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{treasuryStats.monthlyIncome} FCFA</div>
                </CardContent>
              </OptimizedCard>
              
              <OptimizedCard className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-readable-primary">Sorties ce mois</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{treasuryStats.monthlyExpenses} FCFA</div>
                </CardContent>
              </OptimizedCard>
              
              <OptimizedCard className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-readable-primary">Résultat mensuel</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-readable-primary">{treasuryStats.monthlyResult} FCFA</div>
                </CardContent>
              </OptimizedCard>
            </div>

            <div className="flex justify-between items-center mb-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-2xl font-semibold text-readable-primary">Transactions</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <LoadingButton className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle transaction
                  </LoadingButton>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-readable-primary">Ajouter une transaction</DialogTitle>
                  </DialogHeader>
                  <Suspense fallback={<div className="space-y-4"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div>}>
                    <EnhancedTreasuryForm 
                      onSubmit={handleTreasurySubmit}
                      onCancel={() => setIsDialogOpen(false)}
                      loading={isLoading}
                    />
                  </Suspense>
                </DialogContent>
              </Dialog>
            </div>

            <OptimizedCard className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <CardContent className="p-0">
                <Suspense fallback={<div className="p-6 space-y-4">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>}>
                  <TreasuryTable 
                    transactions={transactions}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </Suspense>
              </CardContent>
            </OptimizedCard>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};
