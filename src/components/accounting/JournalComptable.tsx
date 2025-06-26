import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Search, Filter, Download, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { EcritureValidator } from './EcritureValidator';
import { useEcritureValidation } from '@/hooks/useEcritureValidation';

interface JournalEntry {
  id: string;
  piece_number: string;
  date: string;
  account_number: string;
  account_name: string;
  description: string;
  debit: number;
  credit: number;
  reference: string;
  created_at: string;
  is_validated: boolean;
}

export const JournalComptable = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedJournal, setSelectedJournal] = useState('all');
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  
  const { validateEcriture } = useEcritureValidation();

  useEffect(() => {
    loadJournalEntries();
  }, [selectedPeriod, selectedJournal]);

  const loadJournalEntries = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Utilisateur non connecté');
        return;
      }

      // Simuler des données de journal avec validation pour la démo
      const mockEntries: JournalEntry[] = [
        {
          id: '1',
          piece_number: 'VT001',
          date: '2024-01-15',
          account_number: '411000',
          account_name: 'Clients',
          description: 'Vente de marchandises',
          debit: 118000,
          credit: 0,
          reference: 'FAC-2024-001',
          created_at: '2024-01-15T10:00:00Z',
          is_validated: true
        },
        {
          id: '2',
          piece_number: 'VT001',
          date: '2024-01-15',
          account_number: '701000',
          account_name: 'Ventes de marchandises',
          description: 'Vente de marchandises',
          debit: 0,
          credit: 100000,
          reference: 'FAC-2024-001',
          created_at: '2024-01-15T10:00:00Z',
          is_validated: true
        },
        {
          id: '3',
          piece_number: 'VT001',
          date: '2024-01-15',
          account_number: '445700',
          account_name: 'TVA collectée',
          description: 'TVA sur vente',
          debit: 0,
          credit: 18000,
          reference: 'FAC-2024-001',
          created_at: '2024-01-15T10:00:00Z',
          is_validated: true
        },
        // Écriture déséquilibrée pour test
        {
          id: '4',
          piece_number: 'AC001',
          date: '2024-01-16',
          account_number: '601000',
          account_name: 'Achats de marchandises',
          description: 'Achat marchandises',
          debit: 50000,
          credit: 0,
          reference: 'FACT-FOUR-001',
          created_at: '2024-01-16T10:00:00Z',
          is_validated: false
        }
      ];

      setEntries(mockEntries);
    } catch (error) {
      console.error('Erreur lors du chargement du journal:', error);
      toast.error('Erreur lors du chargement du journal');
    } finally {
      setLoading(false);
    }
  };

  const validateAllEntries = () => {
    const pieceNumbers = [...new Set(entries.map(e => e.piece_number))];
    let hasErrors = false;

    pieceNumbers.forEach(pieceNumber => {
      const pieceEntries = entries.filter(e => e.piece_number === pieceNumber);
      const ecriture = {
        date: pieceEntries[0]?.date || '',
        piece_number: pieceNumber,
        description: pieceEntries[0]?.description || '',
        lines: pieceEntries.map(entry => ({
          account_number: entry.account_number,
          account_name: entry.account_name,
          debit: entry.debit,
          credit: entry.credit
        }))
      };

      const validation = validateEcriture(ecriture);
      if (!validation.isValid || !validation.isBalanced) {
        hasErrors = true;
      }
    });

    setShowValidationErrors(hasErrors);
    
    if (hasErrors) {
      toast.error('Des écritures non conformes ont été détectées');
    } else {
      toast.success('Toutes les écritures sont conformes SYSCOHADA');
    }
  };

  const exportJournal = () => {
    toast.success('Export du journal en cours...');
  };

  const filteredEntries = entries.filter(entry =>
    entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.account_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.piece_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDebit = filteredEntries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredit = filteredEntries.reduce((sum, entry) => sum + entry.credit, 0);
  const nonValidatedEntries = entries.filter(e => !e.is_validated).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Journal Comptable</h1>
            <p className="text-gray-600">Conforme SYSCOHADA - Toutes les écritures</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button onClick={validateAllEntries} variant="outline">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Valider Écritures
          </Button>
          <Button onClick={exportJournal} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle écriture
          </Button>
        </div>
      </div>

      {/* Alerte validation */}
      {nonValidatedEntries > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-yellow-800">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">
                {nonValidatedEntries} écriture(s) non validée(s) - Vérification SYSCOHADA requise
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <Select value={selectedJournal} onValueChange={setSelectedJournal}>
              <SelectTrigger>
                <SelectValue placeholder="Type de journal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les journaux</SelectItem>
                <SelectItem value="ventes">Ventes</SelectItem>
                <SelectItem value="achats">Achats</SelectItem>
                <SelectItem value="banque">Banque</SelectItem>
                <SelectItem value="caisse">Caisse</SelectItem>
                <SelectItem value="od">Opérations diverses</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Plus de filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Récapitulatif */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Débit</p>
              <p className="text-2xl font-bold text-green-600">
                {totalDebit.toLocaleString()} XOF
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Crédit</p>
              <p className="text-2xl font-bold text-blue-600">
                {totalCredit.toLocaleString()} XOF
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Équilibre</p>
              <p className={`text-2xl font-bold ${totalDebit === totalCredit ? 'text-green-600' : 'text-red-600'}`}>
                {totalDebit === totalCredit ? 'Équilibré' : 'Déséquilibré'}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Conformité</p>
              <p className={`text-2xl font-bold ${nonValidatedEntries === 0 ? 'text-green-600' : 'text-yellow-600'}`}>
                {nonValidatedEntries === 0 ? 'Conforme' : 'À vérifier'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table du journal */}
      <Card>
        <CardHeader>
          <CardTitle>Écritures comptables</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Chargement...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Pièce</TableHead>
                    <TableHead>Compte</TableHead>
                    <TableHead>Libellé</TableHead>
                    <TableHead>Référence</TableHead>
                    <TableHead className="text-right">Débit</TableHead>
                    <TableHead className="text-right">Crédit</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{new Date(entry.date).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{entry.piece_number}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{entry.account_number}</p>
                          <p className="text-sm text-gray-600">{entry.account_name}</p>
                        </div>
                      </TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>{entry.reference}</TableCell>
                      <TableCell className="text-right font-medium">
                        {entry.debit > 0 ? `${entry.debit.toLocaleString()} XOF` : ''}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {entry.credit > 0 ? `${entry.credit.toLocaleString()} XOF` : ''}
                      </TableCell>
                      <TableCell>
                        <Badge variant={entry.is_validated ? "default" : "secondary"}>
                          {entry.is_validated ? "Validée" : "Brouillon"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
