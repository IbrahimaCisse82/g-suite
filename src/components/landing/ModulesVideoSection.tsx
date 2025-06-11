
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  FileText, 
  Users, 
  Package, 
  ShoppingCart, 
  PiggyBank, 
  Calculator,
  BarChart3,
  Settings
} from 'lucide-react';

const modules = [
  {
    id: 'dashboard',
    title: 'Tableau de Bord',
    description: 'Vue d\'ensemble de votre activité avec des indicateurs clés de performance',
    icon: BarChart3,
    color: 'from-blue-500 to-blue-600',
    features: ['KPI en temps réel', 'Graphiques interactifs', 'Alertes personnalisées']
  },
  {
    id: 'invoicing',
    title: 'Facturation',
    description: 'Créez et gérez vos factures professionnelles en quelques clics',
    icon: FileText,
    color: 'from-green-500 to-green-600',
    features: ['Devis automatiques', 'Facturation récurrente', 'Relances clients']
  },
  {
    id: 'contacts',
    title: 'Gestion Clients',
    description: 'Centralisez toutes les informations de vos clients et prospects',
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    features: ['Fiche client complète', 'Historique des échanges', 'Segmentation avancée']
  },
  {
    id: 'stock',
    title: 'Gestion de Stock',
    description: 'Suivez vos stocks en temps réel et optimisez vos approvisionnements',
    icon: Package,
    color: 'from-orange-500 to-orange-600',
    features: ['Suivi en temps réel', 'Alertes de rupture', 'Inventaire automatisé']
  },
  {
    id: 'purchases',
    title: 'Achats',
    description: 'Gérez vos fournisseurs et optimisez vos processus d\'achat',
    icon: ShoppingCart,
    color: 'from-red-500 to-red-600',
    features: ['Commandes fournisseurs', 'Suivi des livraisons', 'Analyse des coûts']
  },
  {
    id: 'treasury',
    title: 'Trésorerie',
    description: 'Pilotez vos flux financiers et anticipez vos besoins en liquidités',
    icon: PiggyBank,
    color: 'from-teal-500 to-teal-600',
    features: ['Prévisions de trésorerie', 'Rapprochement bancaire', 'Budgets prévisionnels']
  },
  {
    id: 'accounting',
    title: 'Comptabilité',
    description: 'Simplifiez votre comptabilité avec une interface intuitive',
    icon: Calculator,
    color: 'from-indigo-500 to-indigo-600',
    features: ['Écritures automatiques', 'Bilan en temps réel', 'Déclarations fiscales']
  }
];

export const ModulesVideoSection = () => {
  const [currentModule, setCurrentModule] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Passer au module suivant
            setCurrentModule((current) => (current + 1) % modules.length);
            return 0;
          }
          return prev + 2; // 2% toutes les 100ms = 5 secondes par module
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentModule(0);
  };

  const handlePrevious = () => {
    setCurrentModule((prev) => (prev - 1 + modules.length) % modules.length);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentModule((prev) => (prev + 1) % modules.length);
    setProgress(0);
  };

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
            Une démonstration interactive de nos fonctionnalités principales
          </p>
        </div>

        {/* Vidéo principale */}
        <div className="relative rounded-xl shadow-2xl overflow-hidden bg-white border">
          {/* Barre de contrôle simulée */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 flex items-center px-4 z-20">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex-1 text-center text-sm text-gray-600">
              G-Suite Demo - {currentModuleData.title}
            </div>
          </div>

          {/* Contenu principal */}
          <div className={`aspect-video bg-gradient-to-br ${currentModuleData.color} flex items-center justify-center relative transition-all duration-500 mt-8`}>
            {/* Module actuel */}
            <div className="text-center space-y-6 px-8 animate-fade-in">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                <IconComponent className="w-12 h-12 text-white" />
              </div>
              
              <div className="space-y-4">
                <h4 className="text-3xl font-bold text-white">
                  {currentModuleData.title}
                </h4>
                <p className="text-xl text-white/90 max-w-2xl">
                  {currentModuleData.description}
                </p>
              </div>

              {/* Fonctionnalités */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {currentModuleData.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-scale-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <p className="text-white font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Overlay de contrôles */}
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex items-center space-x-4">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={handlePrevious}
                  className="bg-white/90 hover:bg-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                
                <Button
                  size="lg"
                  onClick={handlePlayPause}
                  className="bg-white/90 hover:bg-white text-gray-900"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={handleNext}
                  className="bg-white/90 hover:bg-white"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Contrôles externes */}
        <div className="flex justify-center items-center space-x-4 mt-6">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Recommencer</span>
          </Button>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{currentModule + 1} / {modules.length}</span>
            <span>•</span>
            <span>{isPlaying ? 'En cours' : 'En pause'}</span>
          </div>
          
          <Button
            onClick={handlePlayPause}
            className="flex items-center space-x-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Lecture'}</span>
          </Button>
        </div>

        {/* Navigation par modules */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mt-8">
          {modules.map((module, index) => {
            const ModuleIcon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => {
                  setCurrentModule(index);
                  setProgress(0);
                }}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  index === currentModule
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                }`}
              >
                <ModuleIcon className="w-5 h-5 mx-auto mb-1" />
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
