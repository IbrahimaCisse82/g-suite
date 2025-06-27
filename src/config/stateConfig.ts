
/**
 * Configuration centralisée pour la gestion d'état
 * 
 * Guidelines:
 * - Utiliser Zustand pour l'état global de l'application (navigation, UI, cache)
 * - Utiliser React Query pour les données serveur (API calls, cache HTTP)
 * - Utiliser useState pour l'état local des composants (forms, dialogs)
 */

export const STATE_STRATEGY = {
  // État global - Zustand
  GLOBAL: [
    'navigation',
    'sidebar',
    'user_preferences',
    'performance_metrics',
    'cached_routes'
  ],
  
  // État serveur - React Query
  SERVER: [
    'contacts',
    'employees', 
    'invoices',
    'products',
    'budget',
    'treasury'
  ],
  
  // État local - useState
  LOCAL: [
    'form_data',
    'dialog_states',
    'temporary_ui_state',
    'local_filters'
  ]
} as const;

export const CACHE_KEYS = {
  contacts: ['contacts'],
  employees: ['employees'],
  products: ['products'],
  invoices: ['invoices'],
  budget: ['budget'],
  treasury: ['treasury'],
  user: ['user'],
} as const;
