
import { 
  Users, 
  Settings, 
  BarChart3,
  Building2,
  Shield,
  Database,
  FileBarChart,
  ShoppingBag,
  Globe2,
  Home
} from 'lucide-react';

// Mock data pour les entreprises par solution
export const companiesBySolution = {
  comptabilite: [
    { id: '1', name: 'Cabinet Comptable Expert', admin: 'Amadou Diallo' },
    { id: '2', name: 'Expertise Compta Plus', admin: 'Fatou Sall' },
    { id: '3', name: 'Compta Services', admin: 'Omar Ba' }
  ],
  commerciale: [
    { id: '4', name: 'SA Commerce Général', admin: 'Marie Martin' },
    { id: '5', name: 'Distribution Plus', admin: 'Jean Ndiaye' },
    { id: '6', name: 'Négoce International', admin: 'Aissatou Fall' }
  ],
  entreprise: [
    { id: '7', name: 'SARL Tech Solutions', admin: 'Jean Dupont' },
    { id: '8', name: 'Groupe Industriel Sénégal', admin: 'Moussa Diop' },
    { id: '9', name: 'Holdings & Partners', admin: 'Khadidja Touré' }
  ]
};

export const backofficeMenuItems = [
  { icon: Home, label: 'Dashboard', path: '/admin-backoffice', active: true },
  { icon: Users, label: 'Gestion Utilisateurs', path: '/admin-backoffice/users', active: true },
  { icon: Building2, label: 'Gestion Entreprises', path: '/admin-backoffice/companies', active: true },
  { icon: Shield, label: 'Rôles & Permissions', path: '/admin-backoffice/roles', active: true },
  { icon: Database, label: 'Base de données', path: '/admin-backoffice/database', active: true },
  { icon: BarChart3, label: 'Statistiques', path: '/admin-backoffice/stats', active: true },
  { icon: Settings, label: 'Configuration', path: '/admin-backoffice/settings', active: true },
];

export const solutions = [
  {
    id: 'comptabilite',
    name: 'Comptabilité',
    icon: FileBarChart,
    color: 'text-blue-600',
    companies: companiesBySolution.comptabilite
  },
  {
    id: 'commerciale',
    name: 'Commerciale',
    icon: ShoppingBag,
    color: 'text-green-600',
    companies: companiesBySolution.commerciale
  },
  {
    id: 'entreprise',
    name: 'Entreprise',
    icon: Globe2,
    color: 'text-purple-600',
    companies: companiesBySolution.entreprise
  }
];
