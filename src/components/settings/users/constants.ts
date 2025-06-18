
export const roleLabels = {
  manager: 'Manager',
  comptable: 'Comptable',
  commercial: 'Commercial',
  logistique: 'Logistique',
  caissier: 'Caissier'
};

export const roleColors = {
  manager: 'bg-purple-100 text-purple-800',
  comptable: 'bg-blue-100 text-blue-800',
  commercial: 'bg-green-100 text-green-800',
  logistique: 'bg-orange-100 text-orange-800',
  caissier: 'bg-yellow-100 text-yellow-800'
};

export const rolePermissions = {
  manager: [
    'Tableau de bord',
    'Comptabilité générale',
    'Clients & Fournisseurs',
    'Facturation',
    'Achats',
    'Produits',
    'Stock',
    'Trésorerie',
    'Rapports',
    'Analyse',
    'Budget',
    'Formation',
    'Paramètres'
  ],
  comptable: [
    'Comptabilité générale',
    'Trésorerie',
    'Budget',
    'Formation'
  ],
  commercial: [
    'Clients & Fournisseurs',
    'Facturation',
    'Achats',
    'Formation'
  ],
  logistique: [
    'Produits',
    'Stock',
    'Formation'
  ],
  caissier: [
    'Trésorerie',
    'Formation'
  ]
};
