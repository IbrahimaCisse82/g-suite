
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scale, Search, Download, TrendingUp, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BalanceAccount {
  account_number: string;
  account_name: string;
  class: string;
  opening_balance_debit: number;
  opening_balance_credit: number;
  period_movements_debit: number;
  period_movements_credit: number;
  closing_balance_debit: number;
  closing_balance_credit: number;
}

interface BalanceClass {
  class_number: string;
  class_name: string;
  total_debit: number;
  total_credit: number;
  accounts: BalanceAccount[];
}

export const BalanceGenerale = () => {
  const [balanceData, setBalanceData] = useState<BalanceClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  useEffect(() => {
    loadBalance();
  }, [selectedPeriod, selectedClass]);

  const loadBalance = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Utilisateur non connecté');
        return;
      }

      // Simuler les données de la Balance pour la démo
      const mockBalance: BalanceClass[] = [
        {
          class_number: '1',
          class_name: 'Comptes de ressources durables',
          total_debit: 0,
          total_credit: 2500000,
          accounts: [
            {
              account_number: '101000',
              account_name: 'Capital',
              class: '1',
              opening_balance_debit: 0,
              opening_balance_credit: 2000000,
              period_movements_debit: 0,
              period_movements_credit: 500000,
              closing_balance_debit: 0,
              closing_balance_credit: 2500000
            }
          ]
        },
        {
          class_number: '2',
          class_name: 'Comptes d\'actif immobilisé',
          total_debit: 1200000,
          total_credit: 0,
          accounts: [
            {
              account_number: '241000',
              account_name: 'Matériel et outillage',
              class: '2',
              opening_balance_debit: 1000000,
              opening_balance_credit: 0,
              period_movements_debit: 200000,
              period_movements_credit: 0,
              closing_balance_debit: 1200000,
              closing_balance_credit: 0
            }
          ]
        },
        {
          class_number: '4',
          class_name: 'Comptes de tiers',
          total_debit: 350000,
          total_credit: 180000,
          accounts: [
            {
              account_number: '411000',
              account_name: 'Clients',
              class: '4',
              opening_balance_debit: 150000,
              opening_balance_credit: 0,
              period_movements_debit: 200000,
              period_movements_credit: 0,
              closing_balance_debit: 350000,
              closing_balance_credit: 0
            },
            {
              account_number: '401000',
              account_name: 'Fournisseurs',
              class: '4',
              opening_balance_debit: 0,
              opening_balance_credit: 120000,
              period_movements_debit: 0,
              period_movements_credit: 60000,
              closing_balance_debit: 0,
              closing_balance_credit: 180000
            }
          ]
        },
        {
          class_number: '7',
          class_name: 'Comptes de produits',
          total_debit: 0,
          total_credit: 500000,
          accounts: [
            {
              account_number: '701000',
              account_name: 'Ventes de marchandises',
              class: '7',
              opening_balance_debit: 0,
              opening_balance_credit: 0,
              period_movements_debit: 0,
              period_movements_credit: 500000,
              closing_balance_debit: 0,
              closing_balance_credit: 500000
            }
          ]
        }
      ];

      setBalanceData(mockBalance);
    } catch (error) {
      console.error('Erreur lors du chargement de la Balance:', error);
      toast.error('Erreur lors du chargement de la Balance');
    } finally {
      setLoading(false);
    }
  };

  const exportBalance = () => {
    toast.success('Export de la Balance en cours...');
  };

  const getTotalDebits = () => {
    return balanceData.reduce((sum, classe) => sum + classe.total_debit, 0);
  };

  const getTotalCredits = () => {
    return balanceData.reduce((sum, classe) => sum + classe.total_credit, 0);
  };

  const isBalanced = () => {
    return getTotalDebits() === getTotalCredits();
  };

  const filteredClasses = selectedClass === 'all' 
    ? balanceData 
    : balanceData.filter(classe => classe.class_number === selectedClass);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Scale className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Balance Générale</h1>
            <p className="text-gray-600">Conforme SYSCOHADA - Équilibre des comptes</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportBalance} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Mois courant</SelectItem>
                <SelectItem value="last-month">Mois dernier</SelectItem>
                <SelectItem value="current-quarter">Trimestre courant</SelectItem>
                <SelectItem value="current-year">Année courante</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Classe de comptes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les classes</SelectItem>
                <SelectItem value="1">Classe 1 - Ressources durables</SelectItem>
                <SelectItem value="2">Classe 2 - Actif immobilisé</SelectItem>
                <SelectItem value="3">Classe 3 - Stocks</SelectItem>
                <SelectItem value="4">Classe 4 - Tiers</SelectItem>
                <SelectItem value="5">Classe 5 - Trésorerie</SelectItem>
                <SelectItem value="6">Classe 6 - Charges</SelectItem>
                <SelectItem value="7">Classe 7 - Produits</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Indicateurs d'équilibre */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Débits</p>
              <p className="text-2xl font-bold text-green-600">
                {getTotalDebits().toLocaleString()} XOF
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Crédits</p>
              <p className="text-2xl font-bold text-blue-600">
                {getTotalCredits().toLocaleString()} XOF
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                {isBalanced() ? (
                  <TrendingUp className="w-5 h-5 text-green-500 mr-1" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500 mr-1" />
                )}
                <p className="text-sm text-gray-600">État de la Balance</p>
              </div>
              <p className={`text-2xl font-bold ${isBalanced() ? 'text-green-600' : 'text-red-600'}`}>
                {isBalanced() ? 'Équilibrée' : 'Déséquilibrée'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs pour différentes vues */}
      <Tabs defaultValue="synthese" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="synthese">Vue Synthèse</TabsTrigger>
          <TabsTrigger value="detaillee">Vue Détaillée</TabsTrigger>
        </TabsList>
        
        <TabsContent value="synthese" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Balance par classe de comptes</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Chargement...</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Classe</TableHead>
                      <TableHead>Libellé</TableHead>
                      <TableHead className="text-right">Total Débit</TableHead>
                      <TableHead className="text-right">Total Crédit</TableHead>
                      <TableHead className="text-right">Solde</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClasses.map((classe) => (
                      <TableRow key={classe.class_number}>
                        <TableCell className="font-medium">Classe {classe.class_number}</TableCell>
                        <TableCell>{classe.class_name}</TableCell>
                        <TableCell className="text-right font-medium">
                          {classe.total_debit.toLocaleString()} XOF
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {classe.total_credit.toLocaleString()} XOF
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant={classe.total_debit > classe.total_credit ? "default" : "secondary"}>
                            {Math.abs(classe.total_debit - classe.total_credit).toLocaleString()} XOF
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detaillee" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Balance détaillée par compte</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Chargement...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Compte</TableHead>
                        <TableHead>Libellé</TableHead>
                        <TableHead className="text-right">Solde d'ouverture Débit</TableHead>
                        <TableHead className="text-right">Solde d'ouverture Crédit</TableHead>
                        <TableHead className="text-right">Mouvements Débit</TableHead>
                        <TableHead className="text-right">Mouvements Crédit</TableHead>
                        <TableHead className="text-right">Solde de clôture Débit</TableHead>
                        <TableHead className="text-right">Solde de clôture Crédit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClasses.map((classe) =>
                        classe.accounts
                          .filter(account => 
                            account.account_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            account.account_number.includes(searchTerm)
                          )
                          .map((account) => (
                            <TableRow key={account.account_number}>
                              <TableCell className="font-medium">{account.account_number}</TableCell>
                              <TableCell>{account.account_name}</TableCell>
                              <TableCell className="text-right">
                                {account.opening_balance_debit > 0 ? `${account.opening_balance_debit.toLocaleString()} XOF` : ''}
                              </TableCell>
                              <TableCell className="text-right">
                                {account.opening_balance_credit > 0 ? `${account.opening_balance_credit.toLocaleString()} XOF` : ''}
                              </TableCell>
                              <TableCell className="text-right">
                                {account.period_movements_debit > 0 ? `${account.period_movements_debit.toLocaleString()} XOF` : ''}
                              </TableCell>
                              <TableCell className="text-right">
                                {account.period_movements_credit > 0 ? `${account.period_movements_credit.toLocaleString()} XOF` : ''}
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                {account.closing_balance_debit > 0 ? `${account.closing_balance_debit.toLocaleString()} XOF` : ''}
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                {account.closing_balance_credit > 0 ? `${account.closing_balance_credit.toLocaleString()} XOF` : ''}
                              </TableCell>
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
