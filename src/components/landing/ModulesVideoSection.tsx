
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Users, 
  Package, 
  ShoppingCart, 
  PiggyBank, 
  Calculator,
  BarChart3
} from 'lucide-react';

const modules = [
  {
    id: 'dashboard',
    title: 'Tableau de Bord',
    description: 'Vue d\'ensemble de votre activité avec des indicateurs clés de performance',
    icon: BarChart3,
    color: 'from-blue-500 to-blue-600',
    features: ['KPI en temps réel', 'Graphiques interactifs', 'Alertes personnalisées'],
    screenshot: 'photo-1551288049-bebda4e38f71' // Dashboard screenshot
  },
  {
    id: 'invoicing',
    title: 'Facturation',
    description: 'Créez et gérez vos factures professionnelles en quelques clics',
    icon: FileText,
    color: 'from-green-500 to-green-600',
    features: ['Devis automatiques', 'Facturation récurrente', 'Relances clients'],
    screenshot: 'photo-1554224155-6726b3ff858f' // Invoice screenshot
  },
  {
    id: 'contacts',
    title: 'Gestion Clients',
    description: 'Centralisez toutes les informations de vos clients et prospects',
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    features: ['Fiche client complète', 'Historique des échanges', 'Segmentation avancée'],
    screenshot: 'photo-1552664730-d307ca884978' // CRM screenshot
  },
  {
    id: 'stock',
    title: 'Gestion de Stock',
    description: 'Suivez vos stocks en temps réel et optimisez vos approvisionnements',
    icon: Package,
    color: 'from-orange-500 to-orange-600',
    features: ['Suivi en temps réel', 'Alertes de rupture', 'Inventaire automatisé'],
    screenshot: 'photo-1586528116311-ad8dd3c8310d' // Inventory screenshot
  },
  {
    id: 'purchases',
    title: 'Achats',
    description: 'Gérez vos fournisseurs et optimisez vos processus d\'achat',
    icon: ShoppingCart,
    color: 'from-red-500 to-red-600',
    features: ['Commandes fournisseurs', 'Suivi des livraisons', 'Analyse des coûts'],
    screenshot: 'photo-1460925895917-afdab827c52f' // Purchase management screenshot
  },
  {
    id: 'treasury',
    title: 'Trésorerie',
    description: 'Pilotez vos flux financiers et anticipez vos besoins en liquidités',
    icon: PiggyBank,
    color: 'from-teal-500 to-teal-600',
    features: ['Prévisions de trésorerie', 'Rapprochement bancaire', 'Budgets prévisionnels'],
    screenshot: 'photo-1611974789855-9c2a0a7236a3' // Financial dashboard screenshot
  },
  {
    id: 'accounting',
    title: 'Comptabilité',
    description: 'Simplifiez votre comptabilité avec une interface intuitive',
    icon: Calculator,
    color: 'from-indigo-500 to-indigo-600',
    features: ['Écritures automatiques', 'Bilan en temps réel', 'Déclarations fiscales'],
    screenshot: 'photo-1554224154-26032fced8bd' // Accounting screenshot
  }
];

export const ModulesVideoSection = () => {
  const [currentModule, setCurrentModule] = useState(0);

  const currentModuleData = modules[currentModule];
  const IconComponent = currentModuleData.icon;

  return (
    <div className="mt-16 relative">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Découvrez les Modules G-Suite
          </h3>
          <p className="text-lg text-gray-600">
            Explorez les fonctionnalités principales de notre solution de gestion
          </p>
        </div>

        {/* Capture d'écran principale */}
        <div className="relative rounded-xl shadow-2xl overflow-hidden bg-white border">
          {/* Barre de contrôle simulée */}
          <div className="bg-gray-100 h-8 flex items-center px-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex-1 text-center text-sm text-gray-600">
              G-Suite - {currentModuleData.title}
            </div>
          </div>

          {/* Capture d'écran */}
          <div className="relative">
            <img
              src={`https://images.unsplash.com/${currentModuleData.screenshot}?w=1200&h=675&fit=crop&auto=format`}
              alt={`Capture d'écran du module ${currentModuleData.title}`}
              className="w-full aspect-video object-cover"
            />
            
            {/* Overlay avec informations du module */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="text-center space-y-4 px-8">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-white">
                    {currentModuleData.title}
                  </h4>
                  <p className="text-lg text-white/90 max-w-md">
                    {currentModuleData.description}
                  </p>
                </div>

                {/* Fonctionnalités */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-6">
                  {currentModuleData.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3"
                    >
                      <p className="text-white text-sm font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicateur et contrôles */}
        <div className="flex justify-center items-center space-x-4 mt-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{currentModule + 1} / {modules.length}</span>
          </div>
          
          <div className="flex space-x-2">
            {modules.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentModule(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentModule
                    ? 'bg-green-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation par modules */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mt-8">
          {modules.map((module, index) => {
            const ModuleIcon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => setCurrentModule(index)}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  index === currentModule
                    ? 'bg-green-600 text-white border-green-600 shadow-lg'
                    : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <ModuleIcon className="w-6 h-6 mx-auto mb-2" />
                <div className="text-xs font-medium truncate">
                  {module.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
