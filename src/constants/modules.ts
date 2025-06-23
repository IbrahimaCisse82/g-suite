
import { Module } from '@/types/maintenance';

export const modules: Module[] = [
  { id: 'comptabilite', name: 'Comptabilité', submodules: ['Plan comptable', 'Écritures', 'États financiers'] },
  { id: 'commerciale', name: 'Commerciale', submodules: ['Facturation', 'Devis', 'Clients', 'Produits'] },
  { id: 'entreprise', name: 'Entreprise', submodules: ['Tableau de bord', 'Gestion', 'Rapports', 'Paramètres'] }
];
