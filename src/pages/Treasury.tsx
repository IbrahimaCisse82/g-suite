import React, { useState, useMemo, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, DollarSign, TrendingUp, TrendingDown, Wallet, Banknote } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PageTransition } from '@/components/common/PageTransition';
import { OptimizedCard } from '@/components/common/OptimizedCard';
import { LoadingButton } from '@/components/common/LoadingButton';
import { PageLoader } from '@/components/common/PageLoader';
import { useTreasuryAccounts } from '@/hooks/useTreasuryAccounts';
import { useTreasuryTransactions, useCreateTreasuryTransaction } from '@/hooks/useTreasuryTransactions';
import { TreasuryAccountForm } from '@/components/treasury/TreasuryAccountForm';
import { TreasuryAccountsTable } from '@/components/treasury/TreasuryAccountsTable';
import { usePerformance } from '@/hooks/usePerformance';

// Lazy load des composants lourds
const TreasuryTable = React.lazy(() => 
  import('@/components/treasury/TreasuryTable').then(module => ({ default: module.TreasuryTable }))
);
const TreasuryForm = React.lazy(() => 
  import('@/components/treasury/TreasuryForm').then(module => ({ default: module.TreasuryForm }))
);

export const Treasury = React.memo(() => {
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { measureOperation } = usePerformance('Treasury');

  const { data: accounts = [] } = useTreasuryAccounts();
  const { data: transactions = [] } = useTreasuryTransactions();
  const createTransactionMutation = useCreateTreasuryTransaction();

  // Mémoisation optimisée des statistiques
  const treasuryStats = useMemo(() => {
    const endMeasure = measureOperation('Calculate Treasury Stats');
    
    const totalBalance = accounts.reduce((sum, account) => sum + (account.current_balance || 0), 0);
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.transaction_date);
      return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
    });
    
    const monthlyIncome = monthlyTransactions
      .filter(t => t.transaction_type === 'income')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    
    const monthlyExpenses = monthlyTransactions
      .filter(t => t.transaction_type === 'expense')
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    endMeasure();
    
    return {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      monthlyResult: monthlyIncome - monthlyExpenses
    };
  }, [accounts, transactions, measureOperation]);

  const handleTransactionSubmit = async (transactionData: any) => {
    const endMeasure = measureOperation('Submit Transaction');
    setIsLoading(true);
    try {
      await createTransactionMutation.mutateAsync(transactionData);
      setIsTransactionDialogOpen(false);
    } catch (error) {
      console.error('Error submitting transaction:', error);
    } finally {
      setIsLoading(false);
      endMeasure();
    }
  };

  const handleEditAccount = (account: any) => {
    setEditingAccount(account);
    setIsAccountDialogOpen(true);
  };

  const handleCloseAccountDialog = () => {
    setIsAccountDialogOpen(false);
    setEditingAccount(null);
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
              <p className="text-xl text-readable-secondary">Suivez vos flux de trésorerie et gérez vos comptes</p>
            </div>

            {/* KPI Cards optimisées */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <OptimizedCard className="animate-fade-in [animation-delay:0.1s]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-readable-primary">Solde total</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-readable-primary">{treasuryStats.totalBalance.toLocaleString()} XOF</div>
                  <p className="text-xs text-muted-foreground">Tous comptes confondus</p>
                </CardContent>
              </OptimizedCard>
              
              <OptimizedCard className="animate-fade-in [animation-delay:0.2s]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-readable-primary">Entrées ce mois</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{treasuryStats.monthlyIncome.toLocaleString()} XOF</div>
                </CardContent>
              </OptimizedCard>
              
              <OptimizedCard className="animate-fade-in [animation-delay:0.3s]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-readable-primary">Sorties ce mois</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{treasuryStats.monthlyExpenses.toLocaleString()} XOF</div>
                </CardContent>
              </OptimizedCard>
              
              <OptimizedCard className="animate-fade-in [animation-delay:0.4s]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-readable-primary">Résultat mensuel</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${treasuryStats.monthlyResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {treasuryStats.monthlyResult.toLocaleString()} XOF
                  </div>
                </CardContent>
              </OptimizedCard>
            </div>

            <Tabs defaultValue="transactions" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="accounts">Comptes</TabsTrigger>
              </TabsList>

              <TabsContent value="transactions" className="space-y-6">
                <div className="flex justify-between items-center animate-fade-in [animation-delay:0.5s]">
                  <h2 className="text-2xl font-semibold text-readable-primary">Transactions</h2>
                  <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
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
                      <Suspense fallback={<PageLoader type="spinner" />}>
                        <TreasuryForm 
                          onSubmit={handleTransactionSubmit}
                          onCancel={() => setIsTransactionDialogOpen(false)}
                          loading={isLoading}
                        />
                      </Suspense>
                    </DialogContent>
                  </Dialog>
                </div>

                <OptimizedCard className="animate-fade-in [animation-delay:0.6s]">
                  <CardContent className="p-0">
                    <Suspense fallback={<PageLoader type="skeleton" rows={5} />}>
                      <TreasuryTable 
                        transactions={transactions}
                        onEdit={() => {}}
                        onDelete={() => {}}
                      />
                    </Suspense>
                  </CardContent>
                </OptimizedCard>
              </TabsContent>

              <TabsContent value="accounts" className="space-y-6">
                <div className="flex justify-between items-center animate-fade-in [animation-delay:0.5s]">
                  <h2 className="text-2xl font-semibold text-readable-primary">Comptes de trésorerie</h2>
                  <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
                    <DialogTrigger asChild>
                      <LoadingButton className="bg-blue-600 hover:bg-blue-700">
                        <Banknote className="w-4 h-4 mr-2" />
                        Nouveau compte
                      </LoadingButton>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-white">
                      <DialogHeader>
                        <DialogTitle className="text-readable-primary">
                          {editingAccount ? 'Modifier le compte' : 'Créer un compte de trésorerie'}
                        </DialogTitle>
                      </DialogHeader>
                      <TreasuryAccountForm 
                        onCancel={handleCloseAccountDialog}
                        account={editingAccount}
                        mode={editingAccount ? 'edit' : 'create'}
                      />
                    </DialogContent>
                  </Dialog>
                </div>

                <OptimizedCard className="animate-fade-in [animation-delay:0.6s]">
                  <CardContent className="p-6">
                    <TreasuryAccountsTable onEdit={handleEditAccount} />
                  </CardContent>
                </OptimizedCard>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
});

Treasury.displayName = 'Treasury';
