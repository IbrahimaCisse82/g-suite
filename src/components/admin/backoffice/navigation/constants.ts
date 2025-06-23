
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

// Mock data pour les entreprises par solution - vidé
export const companiesBySolution = {
  comptabilite: [],
  commerciale: [],
  entreprise: []
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
