
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Upload, Download, Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ChartOfAccount {
  id: string;
  accountNumber: string;
  accountTitle: string;
  accountType: string;
  openingBalance: number;
  isHidden: boolean;
}

const mockAccounts: ChartOfAccount[] = [
  { id: '1', accountNumber: '101000', accountTitle: 'Capital social', accountType: 'Capitaux propres', openingBalance: 1000000, isHidden: false },
  { id: '2', accountNumber: '411000', accountTitle: 'Clients', accountType: 'Actif circulant', openingBalance: 150000, isHidden: false },
  { id: '3', accountNumber: '401000', accountTitle: 'Fournisseurs', accountType: 'Dettes', openingBalance: -85000, isHidden: false },
  { id: '4', accountNumber: '512000', accountTitle: 'Banque', accountType: 'Actif circulant', openingBalance: 450000, isHidden: false },
  { id: '5', accountNumber: '701000', accountTitle: 'Ventes de marchandises', accountType: 'Produits', openingBalance: 0, isHidden: false },
];

export const ChartOfAccountsTable = () => {
  const [accounts, setAccounts] = useState<ChartOfAccount[]>(mockAccounts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const [newAccount, setNewAccount] = useState({
    accountNumber: '',
    accountTitle: '',
    accountType: '',
    openingBalance: 0
  });

  const filteredAccounts = showHidden ? accounts : accounts.filter(acc => !acc.isHidden);

  const handleAddAccount = () => {
    if (!newAccount.accountNumber || !newAccount.accountTitle || !newAccount.accountType) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const account: ChartOfAccount = {
      id: Date.now().toString(),
      ...newAccount,
      isHidden: false
    };

    setAccounts([...accounts, account]);
    setNewAccount({ accountNumber: '', accountTitle: '', accountType: '', openingBalance: 0 });
    setIsAddDialogOpen(false);
    toast.success('Compte ajouté avec succès');
  };

  const handleToggleVisibility = (id: string) => {
    setAccounts(accounts.map(acc => 
      acc.id === id ? { ...acc, isHidden: !acc.isHidden } : acc
    ));
    toast.success('Visibilité du compte modifiée');
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (fileType === 'csv' || fileType === 'xlsx') {
        toast.success(`Import du fichier ${file.name} en cours...`);
        // Ici on implémenterait la logique d'import
        setIsImportDialogOpen(false);
      } else {
        toast.error('Format de fichier non supporté. Utilisez CSV ou XLSX.');
      }
    }
  };

  const handleExport = () => {
    toast.success('Export du plan comptable en cours...');
    // Ici on implémenterait la logique d'export
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau compte
          </Button>
          <Button variant="outline" onClick={() => setIsImportDialogOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Importer
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowHidden(!showHidden)}
          className={showHidden ? 'bg-blue-50 text-blue-700' : ''}
        >
          {showHidden ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {showHidden ? 'Masquer les comptes cachés' : 'Afficher les comptes cachés'}
        </Button>
      </div>

      {/* Accounts Table */}
      <div className="bg-card rounded-xl shadow-sm border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Numéro de Compte</TableHead>
              <TableHead>Intitulé</TableHead>
              <TableHead>Nature du compte</TableHead>
              <TableHead className="text-right">Report à nouveau</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => (
              <TableRow key={account.id} className={account.isHidden ? 'opacity-50' : ''}>
                <TableCell className="font-medium">{account.accountNumber}</TableCell>
                <TableCell>{account.accountTitle}</TableCell>
                <TableCell>{account.accountType}</TableCell>
                <TableCell className="text-right">
                  {account.openingBalance.toLocaleString('fr-FR', { 
                    style: 'currency', 
                    currency: 'EUR' 
                  })}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    account.isHidden 
                      ? 'bg-gray-100 text-gray-600' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {account.isHidden ? 'Masqué' : 'Visible'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleToggleVisibility(account.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {account.isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-green-600 hover:text-green-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Account Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau compte comptable</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div>
              <label className="block text-sm font-medium mb-2">Numéro de compte *</label>
              <Input
                value={newAccount.accountNumber}
                onChange={(e) => setNewAccount({...newAccount, accountNumber: e.target.value})}
                placeholder="ex: 411000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Intitulé *</label>
              <Input
                value={newAccount.accountTitle}
                onChange={(e) => setNewAccount({...newAccount, accountTitle: e.target.value})}
                placeholder="ex: Clients"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nature du compte *</label>
              <Input
                value={newAccount.accountType}
                onChange={(e) => setNewAccount({...newAccount, accountType: e.target.value})}
                placeholder="ex: Actif circulant"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Report à nouveau</label>
              <Input
                type="number"
                value={newAccount.openingBalance}
                onChange={(e) => setNewAccount({...newAccount, openingBalance: parseFloat(e.target.value) || 0})}
                placeholder="0.00"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAddAccount} className="bg-green-600 hover:bg-green-700">
                Ajouter le compte
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importer un plan comptable</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Fichier (CSV ou XLSX)
              </label>
              <Input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileImport}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Format attendu :</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Colonne 1: Numéro de compte</li>
                <li>Colonne 2: Intitulé</li>
                <li>Colonne 3: Nature du compte</li>
                <li>Colonne 4: Report à nouveau</li>
              </ul>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
