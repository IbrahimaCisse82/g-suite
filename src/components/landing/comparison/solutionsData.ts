
import { Briefcase, Receipt, Handshake } from 'lucide-react';

export const solutions = [
  {
    key: 'entreprise',
    name: 'G-Suite Entreprise',
    icon: Briefcase,
    color: 'from-purple-600 to-indigo-600',
    description: 'Solution complète tout-en-un'
  },
  {
    key: 'comptable',
    name: 'G-Suite Comptabilité',
    icon: Receipt,
    color: 'from-blue-600 to-purple-600',
    description: 'Spécialisée comptabilité'
  },
  {
    key: 'commerciale',
    name: 'G-Suite Commerciale',
    icon: Handshake,
    color: 'from-green-600 to-emerald-600',
    description: 'Optimisée pour les ventes'
  }
];

export const features = [
  {
    category: 'Fonctionnalités de base',
    items: [
      { name: 'Interface intuitive', entreprise: true, comptable: true, commerciale: true },
      { name: 'Sauvegarde cloud sécurisée', entreprise: true, comptable: true, commerciale: true },
      { name: 'Support technique', entreprise: true, comptable: true, commerciale: true },
      { name: 'Formation incluse', entreprise: true, comptable: true, commerciale: true }
    ]
  },
  {
    category: 'Gestion comptable',
    items: [
      { name: 'Comptabilité générale', entreprise: true, comptable: true, commerciale: false },
      { name: 'Bilans et rapports', entreprise: true, comptable: true, commerciale: false },
      { name: 'Gestion fiscale', entreprise: true, comptable: true, commerciale: false },
      { name: 'Audit et conformité', entreprise: true, comptable: true, commerciale: false }
    ]
  },
  {
    category: 'Gestion commerciale',
    items: [
      { name: 'CRM avancé', entreprise: true, comptable: false, commerciale: true },
      { name: 'Gestion des stocks', entreprise: true, comptable: false, commerciale: true },
      { name: 'Facturation automatisée', entreprise: true, comptable: false, commerciale: true },
      { name: 'Analyses commerciales', entreprise: true, comptable: false, commerciale: true }
    ]
  },
  {
    category: 'Fonctionnalités avancées',
    items: [
      { name: 'Tableau de bord unifié', entreprise: true, comptable: false, commerciale: false },
      { name: 'Gestion multi-utilisateurs', entreprise: true, comptable: false, commerciale: false },
      { name: 'API et intégrations', entreprise: true, comptable: false, commerciale: false },
      { name: 'Personnalisation avancée', entreprise: true, comptable: false, commerciale: false }
    ]
  }
];
