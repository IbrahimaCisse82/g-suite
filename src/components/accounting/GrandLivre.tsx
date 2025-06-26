
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Filter, Download, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GrandLivreEntry {
  id: string;
  date: string;
  piece_number: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  reference: string;
}

interface CompteGrandLivre {
  account_number: string;
  account_name: string;
  entries: GrandLivreEntry[];
  opening_balance: number;
  total_debit: number;
  total_credit: number;
  closing_balance: number;
}

export const GrandLivre = () => {
  const [comptes, setComptes] = useState<CompteGrandLivre[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadGrandLivre();
  }, [selectedAccount, selectedPeriod]);

  const loadGrandLivre = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Utilisateur non connecté');
        return;
      }

      // Simuler les données du Grand Livre pour la démo
      const mockGrandLivre: CompteGrandLivre[] = [
        {
          account_number: '411000',
          account_name: 'Clients',
          opening_balance: 150000,
          entries: [
            {
              id: '1',
              date: '2024-01-15',
              piece_number: 'VT001',
              description: 'Vente de marchandises',
              debit: 118000,
              credit: 0,
              balance: 268000,
              reference: 'FAC-2024-001'
            },
            {
              id: '2',
              date: '2024-01-20',
              piece_number: 'EN001',
              description: 'Encaissement client',
              debit: 0,
              credit: 100000,
              balance: 168000,
              reference: 'REC-2024-001'
            }
          ],
          total_debit: 118000,
          total_credit: 100000,
          closing_balance: 168000
        },
        {
          account_number: '701000',
          account_name: 'Ventes de marchandises',
          opening_balance: 0,
          entries: [
            {
              id: '3',
              date: '2024-01-15',
              piece_number: 'VT001',
              description: 'Vente de marchandises',
              debit: 0,
              credit: 100000,
              balance: -100000,
              reference: 'FAC-2024-001'
            }
          ],
          total_debit: 0,
          total_credit: 100000,
          closing_balance: -100000
        }
      ];

      setComptes(mockGrandLivre);
    } catch (error) {
      console.error('Erreur lors du chargement du Grand Livre:', error);
      toast.error('Erreur lors du chargement du Grand Livre');
    } finally {
      setLoading(false);
    }
  };

  const exportGrandLivre = () => {
    toast.success('Export du Grand Livre en cours...');
  };

  const filteredAccounts = comptes.filter(compte =>
    compte.account_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    compte.account_number.includes(searchTerm)
  );

  const selectedAccountData = selectedAccount === 'all' 
    ? null 
    : comptes.find(c => c.account_number === selectedAccount);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Grand Livre</h1>
            <p className="text-gray-600">Conforme SYSCOHADA - Détail par compte</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportGrandLivre} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher compte..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Mois courant</SelectItem>
                <SelectItem value="last-month">Mois dernier</SelectItem>
                <SelectItem value="current-quarter">Trimestre courant</SelectItem>
                <SelectItem value="current-year">Année courante</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Compte spécifique" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les comptes</SelectItem>
                {comptes.map((compte) => (
                  <SelectItem key={compte.account_number} value={compte.account_number}>
                    {compte.account_number} - {compte.account_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Plus de filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vue détaillée d'un compte */}
      {selectedAccountData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Compte {selectedAccountData.account_number} - {selectedAccountData.account_name}</span>
              <Badge variant="outline">
                Solde: {selectedAccountData.closing_balance.toLocaleString()} XOF
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Solde d'ouverture</p>
                <p className="text-xl font-bold text-blue-900">
                  {selectedAccountData.opening_balance.toLocaleString()} XOF
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600">Total Débit</p>
                <p className="text-xl font-bold text-green-900">
                  {selectedAccountData.total_debit.toLocaleString()} XOF
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-600">Total Crédit</p>
                <p className="text-xl font-bold text-red-900">
                  {selectedAccountData.total_credit.toLocaleString()} XOF
                </p>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Pièce</TableHead>
                  <TableHead>Libellé</TableHead>
                  <TableHead>Référence</TableHead>
                  <TableHead className="text-right">Débit</TableHead>
                  <TableHead className="text-right">Crédit</TableHead>
                  <TableHead className="text-right">Solde</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-gray-50">
                  <TableCell colSpan={6} className="font-medium">
                    Solde d'ouverture
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {selectedAccountData.opening_balance.toLocaleString()} XOF
                  </TableCell>
                </TableRow>
                {selectedAccountData.entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{new Date(entry.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{entry.piece_number}</Badge>
                    </TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell>{entry.reference}</TableCell>
                    <TableCell className="text-right">
                      {entry.debit > 0 ? `${entry.debit.toLocaleString()} XOF` : ''}
                    </TableCell>
                    <TableCell className="text-right">
                      {entry.credit > 0 ? `${entry.credit.toLocaleString()} XOF` : ''}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {entry.balance.toLocaleString()} XOF
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Vue synthétique - tous les comptes */}
      {selectedAccount === 'all' && (
        <Card>
          <CardHeader>
            <CardTitle>Synthèse des comptes</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Chargement...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Compte</TableHead>
                    <TableHead>Libellé</TableHead>
                    <TableHead className="text-right">Solde d'ouverture</TableHead>
                    <TableHead className="text-right">Total Débit</TableHead>
                    <TableHead className="text-right">Total Crédit</TableHead>
                    <TableHead className="text-right">Solde de clôture</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.map((compte) => (
                    <TableRow 
                      key={compte.account_number}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedAccount(compte.account_number)}
                    >
                      <TableCell className="font-medium">{compte.account_number}</TableCell>
                      <TableCell>{compte.account_name}</TableCell>
                      <TableCell className="text-right">
                        {compte.opening_balance.toLocaleString()} XOF
                      </TableCell>
                      <TableCell className="text-right">
                        {compte.total_debit.toLocaleString()} XOF
                      </TableCell>
                      <TableCell className="text-right">
                        {compte.total_credit.toLocaleString()} XOF
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {compte.closing_balance.toLocaleString()} XOF
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
