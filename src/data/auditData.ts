
export interface AuditItem {
  id: string;
  category: 'security' | 'validation' | 'performance' | 'ui_ux' | 'architecture';
  title: string;
  description: string;
  status: 'fixed' | 'in_progress' | 'pending' | 'critical';
  priority: 'high' | 'medium' | 'low';
  fixedDate?: string;
  recommendations?: string[];
}

export const auditItems: AuditItem[] = [
  // SÉCURITÉ - Corrections récentes
  {
    id: 'sec-001',
    category: 'security',
    title: 'Système de journalisation sécurisée',
    description: 'Implémentation du SecurityLogger avec audit trail complet',
    status: 'fixed',
    priority: 'high',
    fixedDate: '2024-12-26',
    recommendations: [
      'Service SecurityLogger créé avec logging IP et user agent',
      'Fonction logSecurityAudit intégrée',
      'Récupération IP utilisateur automatique'
    ]
  },
  {
    id: 'sec-002',
    category: 'security',
    title: 'Validation des mots de passe renforcée',
    description: 'PasswordValidator avec critères de sécurité stricts',
    status: 'fixed',
    priority: 'high',
    fixedDate: '2024-12-26',
    recommendations: [
      'Validation de complexité (8+ caractères, majuscules, minuscules, chiffres, caractères spéciaux)',
      'Sanitisation des entrées utilisateur',
      'Validation format email améliorée'
    ]
  },
  {
    id: 'sec-003',
    category: 'security',
    title: 'Gestion des sessions administrateur',
    description: 'SessionManager avec nettoyage automatique des sessions expirées',
    status: 'fixed',
    priority: 'high',
    fixedDate: '2024-12-26',
    recommendations: [
      'Validation des sessions admin avec tokens sécurisés',
      'Nettoyage automatique des sessions expirées',
      'Génération de tokens UUID sécurisés'
    ]
  },
  {
    id: 'sec-004',
    category: 'security',
    title: 'Protection contre les attaques par déni de service',
    description: 'RateLimiter avec gestion des tentatives suspectes',
    status: 'fixed',
    priority: 'high',
    fixedDate: '2024-12-26',
    recommendations: [
      'Limitation du taux de requêtes par utilisateur',
      'Détection d\'activité suspecte',
      'Blocage temporaire des IP malveillantes'
    ]
  },

  // VALIDATION - Corrections récentes
  {
    id: 'val-001',
    category: 'validation',
    title: 'Validation unifiée des formulaires',
    description: 'Hook useUnifiedValidation pour centraliser la validation',
    status: 'fixed',
    priority: 'high',
    fixedDate: '2024-12-26',
    recommendations: [
      'Validation centralisée pour factures, achats, trésorerie, contacts, produits',
      'Sanitisation automatique des données',
      'Rate limiting intégré à la validation'
    ]
  },
  {
    id: 'val-002',
    category: 'validation',
    title: 'Composant de validation visuelle',
    description: 'FormValidator avec affichage des erreurs en temps réel',
    status: 'fixed',
    priority: 'medium',
    fixedDate: '2024-12-26',
    recommendations: [
      'Affichage des erreurs de validation en temps réel',
      'Hook useFormValidation pour validation commune',
      'Validation email, téléphone, montants, dates'
    ]
  },

  // GESTION D'ERREURS - Corrections récentes
  {
    id: 'err-001',
    category: 'architecture',
    title: 'Gestion globale des erreurs',
    description: 'ErrorBoundary pour capturer les erreurs React',
    status: 'fixed',
    priority: 'high',
    fixedDate: '2024-12-26',
    recommendations: [
      'Capture des erreurs non gérées dans les composants',
      'Logging automatique des erreurs',
      'Interface utilisateur de récupération d\'erreur'
    ]
  },

  // UX/UI TPE - Corrections récentes
  {
    id: 'ux-001',
    category: 'ui_ux',
    title: 'Actions rapides pour TPE',
    description: 'Composant QuickActions pour améliorer l\'efficacité',
    status: 'fixed',
    priority: 'medium',
    fixedDate: '2024-12-26',
    recommendations: [
      'Accès rapide aux fonctions principales',
      'Interface optimisée pour les TPE',
      'Navigation simplifiée'
    ]
  },
  {
    id: 'ux-002',
    category: 'ui_ux',
    title: 'Assistant contextuel TPE',
    description: 'TPEHelper avec aide contextuelle par module',
    status: 'fixed',
    priority: 'medium',
    fixedDate: '2024-12-26',
    recommendations: [
      'Aide contextuelle selon le module actif',
      'Guides pas à pas pour les novices',
      'Tips et bonnes pratiques intégrés'
    ]
  },

  // ARCHITECTURE - Corrections récentes
  {
    id: 'arch-001',
    category: 'architecture',
    title: 'Services de sécurité modulaires',
    description: 'Refactorisation des services de sécurité en modules distincts',
    status: 'fixed',
    priority: 'high',
    fixedDate: '2024-12-26',
    recommendations: [
      'Séparation des responsabilités (Logger, Validator, SessionManager, RateLimiter)',
      'Réutilisabilité améliorée',
      'Maintenance simplifiée'
    ]
  },

  // CORRECTIONS TECHNIQUES - Corrections récentes
  {
    id: 'tech-001',
    category: 'architecture',
    title: 'Hooks d\'authentification admin unifiés',
    description: 'Fusion des hooks dupliqués useEnhancedAdminAuth et useSecureAdminAuth',
    status: 'fixed',
    priority: 'high',
    fixedDate: '2024-12-26',
    recommendations: [
      'Hook unique useAdminAuthentication créé',
      'Élimination de la duplication de code',
      'Maintenance centralisée'
    ]
  },

  // POINTS À AMÉLIORER - En cours
  {
    id: 'imp-001',
    category: 'security',
    title: 'Chiffrement des données sensibles',
    description: 'Implémenter le chiffrement pour les données critiques',
    status: 'pending',
    priority: 'high',
    recommendations: [
      'Chiffrer les mots de passe admin',
      'Chiffrer les données de paiement',
      'Utiliser des clés de chiffrement rotatives'
    ]
  },
  {
    id: 'imp-002',
    category: 'performance',
    title: 'Optimisation des requêtes base de données',
    description: 'Améliorer les performances des requêtes complexes',
    status: 'in_progress',
    priority: 'medium',
    recommendations: [
      'Indexation des colonnes fréquemment utilisées',
      'Optimisation des jointures',
      'Mise en cache des requêtes répétitives'
    ]
  },
  {
    id: 'imp-003',
    category: 'ui_ux',
    title: 'Interface mobile responsive',
    description: 'Améliorer l\'expérience mobile sur tous les modules',
    status: 'in_progress',
    priority: 'medium',
    recommendations: [
      'Tests sur différentes tailles d\'écran',
      'Optimisation des composants pour mobile',
      'Gestes tactiles intuitifs'
    ]
  }
];
