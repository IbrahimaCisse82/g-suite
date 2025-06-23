
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ModuleToggle } from './ModuleToggle';
import { Calculator, ShoppingBag, Users, Building, FileText, Package, LucideIcon } from 'lucide-react';

interface TPEModule {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  price: number;
  features: string[];
  enabled: boolean;
  essential?: boolean;
  category: 'core' | 'addon';
}

const defaultModules: TPEModule[] = [
  {
    id: 'facturation',
    name: 'Facturation Simple',
    description: 'Créez et envoyez vos factures facilement',
    icon: FileText,
    price: 0,
    features: ['Factures PDF', 'Suivi des paiements', 'Relances automatiques'],
    enabled: true,
    essential: true,
    category: 'core'
  },
  {
    id: 'contacts',
    name: 'Gestion Contacts',
    description: 'Centralisez vos clients et fournisseurs',
    icon: Users,
    price: 0,
    features: ['Fiches contacts', 'Historique', 'Export/Import'],
    enabled: true,
    essential: true,
    category: 'core'
  },
  {
    id: 'comptabilite',
    name: 'Comptabilité TPE',
    description: 'Comptabilité simplifiée pour TPE',
    icon: Calculator,
    price: 15,
    features: ['Livre de recettes', 'Déclarations TVA', 'Bilan simplifié'],
    enabled: false,
    category: 'addon'
  },
  {
    id: 'stock',
    name: 'Gestion Stock',
    description: 'Suivez vos stocks en temps réel',
    icon: Package,
    price: 10,
    features: ['Suivi stock', 'Alertes rupture', 'Inventaires'],
    enabled: false,
    category: 'addon'
  },
  {
    id: 'crm',
    name: 'CRM Commercial',
    description: 'Développez votre activité commerciale',
    icon: ShoppingBag,
    price: 20,
    features: ['Pipeline ventes', 'Devis', 'Analyses commerciales'],
    enabled: false,
    category: 'addon'
  }
];

export const TPEModuleManager = () => {
  const [modules, setModules] = useState<TPEModule[]>(defaultModules);
  const [showSavings, setShowSavings] = useState(false);

  const handleModuleToggle = (moduleId: string, enabled: boolean) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId ? { ...module, enabled } : module
    ));
  };

  const enabledModules = modules.filter(m => m.enabled);
  const totalPrice = enabledModules.reduce((sum, module) => sum + module.price, 0);
  const coreModules = modules.filter(m => m.category === 'core');
  const addonModules = modules.filter(m => m.category === 'addon');

  const checkForBundles = () => {
    const enabledAddons = addonModules.filter(m => m.enabled);
    if (enabledAddons.length >= 2) {
      setShowSavings(true);
    } else {
      setShowSavings(false);
    }
  };

  React.useEffect(() => {
    checkForBundles();
  }, [modules]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Personnalisez votre G-Suite TPE</h2>
        <p className="text-muted-foreground">
          Activez uniquement les modules dont vous avez besoin
        </p>
      </div>

      {/* Pricing Summary */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Votre configuration actuelle</h3>
              <p className="text-sm text-muted-foreground">
                {enabledModules.length} module{enabledModules.length > 1 ? 's' : ''} activé{enabledModules.length > 1 ? 's' : ''}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {totalPrice}€<span className="text-sm font-normal">/mois</span>
              </div>
              {totalPrice === 0 && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Gratuit
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Savings Alert */}
      {showSavings && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertDescription>
            💡 <strong>Économisez 20% !</strong> Avec 3 modules ou plus, optez pour le forfait "TPE Complet" à seulement 39€/mois 
            (au lieu de {totalPrice}€/mois)
          </AlertDescription>
        </Alert>
      )}

      {/* Core Modules */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-green-600" />
          Modules essentiels (inclus)
        </h3>
        <div className="grid gap-4">
          {coreModules.map((module) => (
            <ModuleToggle
              key={module.id}
              module={module}
              onToggle={handleModuleToggle}
              disabled={true}
            />
          ))}
        </div>
      </div>

      {/* Add-on Modules */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Modules complémentaires</h3>
        <div className="grid gap-4">
          {addonModules.map((module) => (
            <ModuleToggle
              key={module.id}
              module={module}
              onToggle={handleModuleToggle}
            />
          ))}
        </div>
      </div>

      {/* Quick Presets */}
      <Card>
        <CardHeader>
          <CardTitle>Configurations pré-définies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => {
                setModules(prev => prev.map(m => ({
                  ...m,
                  enabled: m.essential || m.id === 'comptabilite'
                })));
              }}
            >
              <div className="text-left">
                <div className="font-medium">TPE + Comptabilité</div>
                <div className="text-sm text-muted-foreground">Idéal pour la conformité fiscale (15€/mois)</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => {
                setModules(prev => prev.map(m => ({
                  ...m,
                  enabled: m.essential || ['crm', 'stock'].includes(m.id)
                })));
              }}
            >
              <div className="text-left">
                <div className="font-medium">TPE Commercial</div>
                <div className="text-sm text-muted-foreground">Pour développer vos ventes (30€/mois)</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => {
                setModules(prev => prev.map(m => ({ ...m, enabled: true })));
              }}
            >
              <div className="text-left">
                <div className="font-medium">TPE Complet</div>
                <div className="text-sm text-muted-foreground">Tous les modules (39€/mois au lieu de 45€)</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button variant="outline">
          Essai gratuit 14 jours
        </Button>
        <Button className="bg-green-600 hover:bg-green-700">
          Activer ma configuration ({totalPrice}€/mois)
        </Button>
      </div>
    </div>
  );
};
