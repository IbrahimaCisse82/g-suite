import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Layout } from '@/components/Layout';
import { toast } from 'sonner';

const accounts = [
  { code: '411000', name: 'Clients', debit: 15420.50, credit: 0, balance: 15420.50 },
  { code: '401000', name: 'Fournisseurs', debit: 0, credit: 8750.30, balance: -8750.30 },
  { code: '512000', name: 'Banque', debit: 45000.00, credit: 12300.00, balance: 32700.00 },
  { code: '701000', name: 'Ventes', debit: 0, credit: 65400.00, balance: -65400.00 },
  { code: '601000', name: 'Achats', debit: 28500.00, credit: 0, balance: 28500.00 },
  { code: '445660', name: 'TVA déductible', debit: 5700.00, credit: 0, balance: 5700.00 },
  { code: '445710', name: 'TVA collectée', debit: 0, credit: 13080.00, balance: -13080.00 },
];

export const Accounting = () => {
  const [isNewEntryDialogOpen, setIsNewEntryDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);

  const handleNewEntry = () => {
    setIsNewEntryDialogOpen(true);
    toast.info('Ouverture du formulaire de nouvelle écriture');
  };

  const handleFilter = () => {
    toast.info('Filtres appliqués avec succès');
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = accounts.filter(account => 
      account.name.toLowerCase().includes(value.toLowerCase()) ||
      account.code.includes(value)
    );
    setFilteredAccounts(filtered);
    console.log('Recherche effectuée pour:', value);
  };

  const handleAccountDetails = (accountCode: string) => {
    toast.success(`Affichage des détails du compte ${accountCode}`);
    console.log('Détails du compte demandés:', accountCode);
  };

  const handleViewAccount = (accountCode: string) => {
    toast.info(`Consultation du compte ${accountCode}`);
  };

  const handleEditAccount = (accountCode: string) => {
    toast.info(`Modification du compte ${accountCode}`);
  };

  const handleDeleteAccount = (accountCode: string) => {
    toast.error(`Suppression du compte ${accountCode} demandée`);
  };

  const handleCreateEntry = () => {
    toast.success('Nouvelle écriture créée avec succès');
    setIsNewEntryDialogOpen(false);
  };

  return (
    <Layout>
      <div className="gradient-bg min-h-full">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Comptabilité générale</h1>
            <p className="text-muted-foreground">Plan comptable et écritures</p>
          </div>

          {/* Actions Bar */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-3">
                <Button onClick={handleNewEntry} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle écriture
                </Button>
                <Button variant="outline" onClick={handleFilter}>
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </div>
              
              <div className="relative">
                <Search className="w-5 h-5 text-muted-foreground absolute left-3 top-2.5" />
                <Input
                  type="text"
                  placeholder="Rechercher un compte..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Accounts Table */}
          <div className="bg-card rounded-xl shadow-sm border border-border">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-card-foreground">Plan comptable</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Libellé
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Débit
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Crédit
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Solde
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {filteredAccounts.map((account) => (
                    <tr key={account.code} className="hover:bg-muted/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        {account.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        {account.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-foreground">
                        {account.debit > 0 ? account.debit.toLocaleString('fr-FR', { 
                          style: 'currency', 
                          currency: 'EUR' 
                        }) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-foreground">
                        {account.credit > 0 ? account.credit.toLocaleString('fr-FR', { 
                          style: 'currency', 
                          currency: 'EUR' 
                        }) : '-'}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                        account.balance > 0 ? 'text-green-600' : account.balance < 0 ? 'text-red-600' : 'text-foreground'
                      }`}>
                        {account.balance.toLocaleString('fr-FR', { 
                          style: 'currency', 
                          currency: 'EUR' 
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewAccount(account.code)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditAccount(account.code)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteAccount(account.code)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dialog for new entry */}
          <Dialog open={isNewEntryDialogOpen} onOpenChange={setIsNewEntryDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nouvelle écriture comptable</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Référence</label>
                    <Input placeholder="REF-001" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Libellé</label>
                  <Input placeholder="Description de l'écriture" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Compte</label>
                    <Input placeholder="Compte" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Débit</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Crédit</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setIsNewEntryDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleCreateEntry} className="bg-green-600 hover:bg-green-700">
                    Créer l'écriture
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};
