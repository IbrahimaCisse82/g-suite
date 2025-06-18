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
  { id: '1', accountNumber: '101', accountTitle: 'Capital', accountType: 'Capitaux', hasCarryForward: true, isHidden: false },
  { id: '2', accountNumber: '106', accountTitle: 'Réserves', accountType: 'Capitaux', hasCarryForward: true, isHidden: false },
  { id: '3', accountNumber: '110', accountTitle: 'Report à nouveau (solde créditeur)', accountType: 'Résultat-Bilan', hasCarryForward: true, isHidden: false },
  { id: '4', accountNumber: '119', accountTitle: 'Report à nouveau (solde débiteur)', accountType: 'Résultat-Bilan', hasCarryForward: true, isHidden: false },
  { id: '5', accountNumber: '129', accountTitle: 'Résultat net - Bénéfice', accountType: 'Résultat-Bilan', hasCarryForward: true, isHidden: false },
  { id: '6', accountNumber: '139', accountTitle: 'Résultat net - Perte', accountType: 'Résultat-Bilan', hasCarryForward: true, isHidden: false },
  { id: '7', accountNumber: '161', accountTitle: 'Emprunts et dettes assimilées', accountType: 'Capitaux', hasCarryForward: true, isHidden: false },
  { id: '8', accountNumber: '16', accountTitle: 'Emprunts et dettes financières diverses', accountType: 'Capitaux', hasCarryForward: true, isHidden: false },
  
  // Classe 2 - Comptes d'actif immobilisé
  { id: '9', accountNumber: '211', accountTitle: 'Terrains', accountType: 'Immobilisation', hasCarryForward: true, isHidden: false },
  { id: '10', accountNumber: '213', accountTitle: 'Constructions', accountType: 'Immobilisation', hasCarryForward: true, isHidden: false },
  { id: '11', accountNumber: '218', accountTitle: 'Matériel, mobilier et actifs biologiques', accountType: 'Immobilisation', hasCarryForward: true, isHidden: false },
  { id: '12', accountNumber: '241', accountTitle: 'Immobilisations incorporelles', accountType: 'Immobilisation', hasCarryForward: true, isHidden: false },
  { id: '13', accountNumber: '281', accountTitle: 'Amortissements des immobilisations incorporelles', accountType: 'Amortis/Provision', hasCarryForward: true, isHidden: false },
  { id: '14', accountNumber: '2813', accountTitle: 'Amortissements des constructions', accountType: 'Amortis/Provision', hasCarryForward: true, isHidden: false },
  { id: '15', accountNumber: '2818', accountTitle: 'Amortissements du matériel', accountType: 'Amortis/Provision', hasCarryForward: true, isHidden: false },
  
  // Classe 3 - Comptes de stocks
  { id: '16', accountNumber: '31', accountTitle: 'Matières premières', accountType: 'Stock', hasCarryForward: true, isHidden: false },
  { id: '17', accountNumber: '32', accountTitle: 'Autres approvisionnements', accountType: 'Stock', hasCarryForward: true, isHidden: false },
  { id: '18', accountNumber: '33', accountTitle: 'En-cours', accountType: 'Stock', hasCarryForward: true, isHidden: false },
  { id: '19', accountNumber: '36', accountTitle: 'Produits finis', accountType: 'Stock', hasCarryForward: true, isHidden: false },
  { id: '20', accountNumber: '37', accountTitle: 'Stocks de marchandises', accountType: 'Stock', hasCarryForward: true, isHidden: false },
  
  // Classe 4 - Comptes de tiers
  { id: '21', accountNumber: '401', accountTitle: 'Fournisseurs', accountType: 'Fournisseur', hasCarryForward: true, isHidden: false },
  { id: '22', accountNumber: '4081', accountTitle: 'Fournisseurs - Factures non parvenues', accountType: 'Fournisseur', hasCarryForward: true, isHidden: false },
  { id: '23', accountNumber: '409', accountTitle: 'Fournisseurs débiteurs', accountType: 'Fournisseur', hasCarryForward: true, isHidden: false },
  { id: '24', accountNumber: '411', accountTitle: 'Clients', accountType: 'Client', hasCarryForward: true, isHidden: false },
  { id: '25', accountNumber: '4181', accountTitle: 'Clients - Produits non encore facturés', accountType: 'Client', hasCarryForward: true, isHidden: false },
  { id: '26', accountNumber: '419', accountTitle: 'Clients créditeurs', accountType: 'Client', hasCarryForward: true, isHidden: false },
  { id: '27', accountNumber: '421', accountTitle: 'Personnel - Rémunérations dues', accountType: 'Salarie', hasCarryForward: true, isHidden: false },
  { id: '28', accountNumber: '422', accountTitle: 'Personnel - Œuvres sociales', accountType: 'Salarie', hasCarryForward: true, isHidden: false },
  { id: '29', accountNumber: '423', accountTitle: 'Personnel - Participation aux bénéfices', accountType: 'Salarie', hasCarryForward: true, isHidden: false },
  { id: '30', accountNumber: '424', accountTitle: 'Personnel - Œuvres d\'assistance', accountType: 'Salarie', hasCarryForward: true, isHidden: false },
  { id: '31', accountNumber: '431', accountTitle: 'Sécurité sociale', accountType: 'Salarie', hasCarryForward: true, isHidden: false },
  { id: '32', accountNumber: '432', accountTitle: 'Caisses de retraite', accountType: 'Salarie', hasCarryForward: true, isHidden: false },
  { id: '33', accountNumber: '441', accountTitle: 'État - Impôts sur bénéfices', accountType: 'Charge', hasCarryForward: true, isHidden: false },
  { id: '34', accountNumber: '442', accountTitle: 'État - Autres impôts et taxes', accountType: 'Charge', hasCarryForward: true, isHidden: false },
  { id: '35', accountNumber: '443', accountTitle: 'État - TVA facturée', accountType: 'Charge', hasCarryForward: true, isHidden: false },
  { id: '36', accountNumber: '444', accountTitle: 'État - TVA due ou crédit de TVA', accountType: 'Charge', hasCarryForward: true, isHidden: false },
  { id: '37', accountNumber: '445', accountTitle: 'État - TVA récupérable', accountType: 'Charge', hasCarryForward: true, isHidden: false },
  { id: '38', accountNumber: '47', accountTitle: 'Comptes transitoires ou d\'attente', accountType: 'Résultat-Bilan', hasCarryForward: true, isHidden: false },
  
  // Classe 5 - Comptes de trésorerie
  { id: '39', accountNumber: '50', accountTitle: 'Titre de placement', accountType: 'Titre', hasCarryForward: true, isHidden: false },
  { id: '40', accountNumber: '521', accountTitle: 'Banques locales', accountType: 'Banque', hasCarryForward: true, isHidden: false },
  { id: '41', accountNumber: '531', accountTitle: 'Chèques postaux', accountType: 'Banque', hasCarryForward: true, isHidden: false },
  { id: '42', accountNumber: '54', accountTitle: 'Instruments de trésorerie', accountType: 'Banque', hasCarryForward: true, isHidden: false },
  { id: '43', accountNumber: '57', accountTitle: 'Caisse', accountType: 'Banque', hasCarryForward: true, isHidden: false },
  { id: '44', accountNumber: '58', accountTitle: 'Régies d\'avances, accréditifs et virements internes', accountType: 'Banque', hasCarryForward: true, isHidden: false },
  
  // Classe 6 - Comptes de charges
  { id: '45', accountNumber: '601', accountTitle: 'Achats de matières premières', accountType: 'Charge', hasCarryForward: false, isHidden: false },
  { id: '46', accountNumber: '602', accountTitle: 'Achats de matières et fournitures consommables', accountType: 'Charge', hasCarryForward: false, isHidden: false },
  { id: '47', accountNumber: '603', accountTitle: 'Variations des stocks de matières et fournitures', accountType: 'Charge', hasCarryForward: false, isHidden: false },
  { id: '48', accountNumber: '604', accountTitle: 'Achats stockés - Matières et matériel', accountType: 'Charge', hasCarryForward: false, isHidden: false },
  { id: '49', accountNumber: '605', accountTitle: 'Autres achats', accountType: 'Charge', hasCarryForward: false, isHidden: false },
  { id: '50', accountNumber: '607', accountTitle: 'Achats de marchandises', accountType: 'Charge', hasCarryForward: false, isHidden: false },
  { id: '51', accountNumber: '608', accountTitle: 'Frais accessoires d\'achats', accountType: 'Charge', hasCarryForward: false, isHidden: false },
  { id: '52', accountNumber: '61', accountTitle: 'Transports', accountType: 'Charge', hasCarryForward: false, isHidden: false },
  { id: '53', accountNumber: '62', accountTitle: 'Services extérieurs A', accountType: 'Charge', hasCarryForward: false, isHidden: false },
  { id: '54', accountNumber: '63', accountTitle: 'Services extérieurs B', accountType: 'Charge', hasCarryForward: false, isHidden: false },
  { id: '55', accountNumber: '64', accountTitle: 'Impôts et taxes', accountType: 'Charge', hasCarryForward: false, isHidden: false },
  { id: '56', accountNumber: '66', accountTitle: 'Charges de personnel', accountType: 'Charge', hasCarryForward: false, isHidden: false },
  { id: '57', accountNumber: '67', accountTitle: 'Frais financiers et charges assimilées', accountType: 'Charge', hasCarryForward: false, isHidden: false },
  { id: '58', accountNumber: '68', accountTitle: 'Dotations aux amortissements', accountType: 'Charge', hasCarryForward: false, isHidden: false },
  { id: '59', accountNumber: '69', accountTitle: 'Impôts sur le résultat et assimilés', accountType: 'Charge', hasCarryForward: false, isHidden: false },
  
  // Classe 7 - Comptes de produits
  { id: '60', accountNumber: '701', accountTitle: 'Ventes de produits finis', accountType: 'Produit', hasCarryForward: false, isHidden: false },
  { id: '61', accountNumber: '702', accountTitle: 'Ventes de produits intermédiaires', accountType: 'Produit', hasCarryForward: false, isHidden: false },
  { id: '62', accountNumber: '703', accountTitle: 'Ventes de produits résiduels', accountType: 'Produit', hasCarryForward: false, isHidden: false },
  { id: '63', accountNumber: '704', accountTitle: 'Travaux', accountType: 'Produit', hasCarryForward: false, isHidden: false },
  { id: '64', accountNumber: '705', accountTitle: 'Études', accountType: 'Produit', hasCarryForward: false, isHidden: false },
  { id: '65', accountNumber: '706', accountTitle: 'Autres prestations de services', accountType: 'Produit', hasCarryForward: false, isHidden: false },
  { id: '66', accountNumber: '707', accountTitle: 'Ventes de marchandises', accountType: 'Produit', hasCarryForward: false, isHidden: false },
  { id: '67', accountNumber: '708', accountTitle: 'Produits des activités annexes', accountType: 'Produit', hasCarryForward: false, isHidden: false },
  { id: '68', accountNumber: '72', accountTitle: 'Production immobilisée', accountType: 'Produit', hasCarryForward: false, isHidden: false },
  { id: '69', accountNumber: '73', accountTitle: 'Variations des stocks de biens et services produits', accountType: 'Produit', hasCarryForward: false, isHidden: false },
  { id: '70', accountNumber: '74', accountTitle: 'Subventions d\'exploitation', accountType: 'Produit', hasCarryForward: false, isHidden: false },
  { id: '71', accountNumber: '75', accountTitle: 'Autres produits', accountType: 'Produit', hasCarryForward: false, isHidden: false },
  { id: '72', accountNumber: '77', accountTitle: 'Revenus financiers et produits assimilés', accountType: 'Produit', hasCarryForward: false, isHidden: false },
  { id: '73', accountNumber: '78', accountTitle: 'Transferts de charges', accountType: 'Produit', hasCarryForward: false, isHidden: false },
  { id: '74', accountNumber: '79', accountTitle: 'Reprises de provisions', accountType: 'Produit', hasCarryForward: false, isHidden: false },
  
  // Classe 8 - Comptes de résultats (en gestion)
  { id: '75', accountNumber: '80', accountTitle: 'Comptes de résultats en gestion', accountType: 'Resulat-Gestion', hasCarryForward: false, isHidden: false },
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
