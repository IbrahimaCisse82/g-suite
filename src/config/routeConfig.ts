
import { LucideIcon } from 'lucide-react';

export interface RouteConfig {
  path: string;
  label: string;
  icon?: LucideIcon;
  protected?: boolean;
  preload?: boolean;
  feature?: string;
}

export const ROUTE_CONFIG: Record<string, RouteConfig> = {
  dashboard: {
    path: '/dashboard',
    label: 'Dashboard',
    protected: true,
    preload: true,
    feature: 'dashboard'
  },
  contacts: {
    path: '/contacts',
    label: 'Contacts',
    protected: true,
    preload: true,
    feature: 'contacts'
  },
  employees: {
    path: '/employees',
    label: 'Employés',
    protected: true,
    preload: true,
    feature: 'employees'
  },
  invoicing: {
    path: '/invoicing',
    label: 'Facturation',
    protected: true,
    preload: true,
    feature: 'invoicing'
  },
  accounting: {
    path: '/accounting',
    label: 'Comptabilité',
    protected: true,
    preload: true,
    feature: 'accounting'
  },
  treasury: {
    path: '/treasury',
    label: 'Trésorerie',
    protected: true,
    preload: true,
    feature: 'treasury'
  },
  products: {
    path: '/products',
    label: 'Produits',
    protected: true,
    preload: true,
    feature: 'products'
  },
  budget: {
    path: '/budget',
    label: 'Budget',
    protected: true,
    preload: true,
    feature: 'budget'
  },
  reports: {
    path: '/reports',
    label: 'Rapports',
    protected: true,
    preload: true,
    feature: 'reports'
  },
  settings: {
    path: '/settings',
    label: 'Paramètres',
    protected: true,
    preload: false,
    feature: 'settings'
  }
} as const;

export const PRELOADABLE_ROUTES = Object.values(ROUTE_CONFIG)
  .filter(route => route.preload)
  .map(route => route.path);
