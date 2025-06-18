import React, { useState } from 'react';
import { toast } from 'sonner';
import { AccountsTableHeader } from './AccountsTableHeader';
import { AccountsTable } from './AccountsTable';
import { AddAccountDialog } from './AddAccountDialog';
import { ImportAccountDialog } from './ImportAccountDialog';

interface ChartOfAccount {
  id: string;
  accountNumber: string;
  accountTitle: string;
  accountType: string;
  hasCarryForward: boolean; // Report à nouveau (oui/non)
  isHidden: boolean;
}

// Plan comptable SYSCOHADA RÉVISÉ - Système minimal de trésorerie
const mockAccounts: ChartOfAccount[] = [
  // Classe 1 - Comptes de ressources durables
  { id: '1', accountNumber: '101', accountTitle: 'Capital', accountType: 'Capital', hasCarryForward: true, isHidden: false },
  { id: '2', accountNumber: '106', accountTitle: 'Réserves', accountType: 'Réserves', hasCarryForward: true, isHidden: false },
  { id: '3', accountNumber: '110', accountTitle: 'Report à nouveau (solde créditeur)', accountType: 'Report à nouveau', hasCarryForward: true, isHidden: false },
  { id: '4', accountNumber: '119', accountTitle: 'Report à nouveau (solde débiteur)', accountType: 'Report à nouveau', hasCarryForward: true, isHidden: false },
  { id: '5', accountNumber: '161', accountTitle: 'Emprunts et dettes assimilées', accountType: 'Dettes financières', hasCarryForward: true, isHidden: false },
  
  // Classe 2 - Comptes d'actif immobilisé
  { id: '6', accountNumber: '211', accountTitle: 'Terrains', accountType: 'Immobilisations corporelles', hasCarryForward: true, isHidden: false },
  { id: '7', accountNumber: '213', accountTitle: 'Constructions', accountType: 'Immobilisations corporelles', hasCarryForward: true, isHidden: false },
  { id: '8', accountNumber: '218', accountTitle: 'Matériel, mobilier et actifs biologiques', accountType: 'Immobilisations corporelles', hasCarryForward: true, isHidden: false },
  
  // Classe 3 - Comptes de stocks
  { id: '9', accountNumber: '31', accountTitle: 'Matières premières', accountType: 'Stocks', hasCarryForward: true, isHidden: false },
  { id: '10', accountNumber: '37', accountTitle: 'Stocks de marchandises', accountType: 'Stocks', hasCarryForward: true, isHidden: false },
  
  // Classe 4 - Comptes de tiers
  { id: '11', accountNumber: '411', accountTitle: 'Clients', accountType: 'Créances clients', hasCarryForward: true, isHidden: false },
  { id: '12', accountNumber: '401', accountTitle: 'Fournisseurs', accountType: 'Dettes fournisseurs', hasCarryForward: true, isHidden: false },
  { id: '13', accountNumber: '421', accountTitle: 'Personnel - Rémunérations dues', accountType: 'Dettes sociales', hasCarryForward: true, isHidden: false },
  { id: '14', accountNumber: '431', accountTitle: 'Sécurité sociale', accountType: 'Dettes sociales', hasCarryForward: true, isHidden: false },
  { id: '15', accountNumber: '441', accountTitle: 'État - Impôts sur bénéfices', accountType: 'Dettes fiscales', hasCarryForward: true, isHidden: false },
  { id: '16', accountNumber: '445', accountTitle: 'État - Taxes sur le chiffre d\'affaires', accountType: 'Dettes fiscales', hasCarryForward: true, isHidden: false },
  
  // Classe 5 - Comptes de trésorerie
  { id: '17', accountNumber: '521', accountTitle: 'Banques locales', accountType: 'Disponibilités', hasCarryForward: true, isHidden: false },
  { id: '18', accountNumber: '531', accountTitle: 'Chèques postaux', accountType: 'Disponibilités', hasCarryForward: true, isHidden: false },
  { id: '19', accountNumber: '57', accountTitle: 'Caisse', accountType: 'Disponibilités', hasCarryForward: true, isHidden: false },
  
  // Classe 6 - Comptes de charges
  { id: '20', accountNumber: '601', accountTitle: 'Achats de matières premières', accountType: 'Charges d\'exploitation', hasCarryForward: false, isHidden: false },
  { id: '21', accountNumber: '607', accountTitle: 'Achats de marchandises', accountType: 'Charges d\'exploitation', hasCarryForward: false, isHidden: false },
  { id: '22', accountNumber: '621', accountTitle: 'Sous-traitance générale', accountType: 'Charges d\'exploitation', hasCarryForward: false, isHidden: false },
  { id: '23', accountNumber: '661', accountTitle: 'Charges d\'intérêts', accountType: 'Charges financières', hasCarryForward: false, isHidden: false },
  
  // Classe 7 - Comptes de produits
  { id: '24', accountNumber: '701', accountTitle: 'Ventes de produits finis', accountType: 'Produits d\'exploitation', hasCarryForward: false, isHidden: false },
  { id: '25', accountNumber: '707', accountTitle: 'Ventes de marchandises', accountType: 'Produits d\'exploitation', hasCarryForward: false, isHidden: false },
  { id: '26', accountNumber: '771', accountTitle: 'Intérêts de prêts', accountType: 'Produits financiers', hasCarryForward: false, isHidden: false },
];

export const ChartOfAccountsTable = () => {
  const [accounts, setAccounts] = useState<ChartOfAccount[]>(mockAccounts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [showHidden, setShowHidden] = useState(false);

  const filteredAccounts = showHidden ? accounts : accounts.filter(acc => !acc.isHidden);

  const handleAddAccount = (newAccountData: Omit<ChartOfAccount, 'id' | 'isHidden'>) => {
    const account: ChartOfAccount = {
      id: Date.now().toString(),
      ...newAccountData,
      isHidden: false
    };

    setAccounts([...accounts, account]);
  };

  const handleToggleVisibility = (id: string) => {
    setAccounts(accounts.map(acc => 
      acc.id === id ? { ...acc, isHidden: !acc.isHidden } : acc
    ));
    toast.success('Visibilité du compte modifiée');
  };

  const handleExport = () => {
    toast.success('Export du plan comptable en cours...');
    // Ici on implémenterait la logique d'export
  };

  return (
    <div className="space-y-6">
      <AccountsTableHeader
        onAddAccount={() => setIsAddDialogOpen(true)}
        onImport={() => setIsImportDialogOpen(true)}
        onExport={handleExport}
        showHidden={showHidden}
        onToggleHidden={() => setShowHidden(!showHidden)}
      />

      <AccountsTable
        accounts={filteredAccounts}
        onToggleVisibility={handleToggleVisibility}
      />

      <AddAccountDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddAccount={handleAddAccount}
      />

      <ImportAccountDialog
        isOpen={isImportDialogOpen}
        onClose={() => setIsImportDialogOpen(false)}
      />
    </div>
  );
};
