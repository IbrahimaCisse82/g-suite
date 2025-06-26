import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Users, 
  Save,
  RefreshCw,
  FileBarChart,
  ShoppingBag,
  Globe2
} from 'lucide-react';

interface ModuleAccessConfig {
  solution: 'comptable' | 'commercial' | 'entreprise';
  role: 'manager' | 'comptable' | 'commercial' | 'logistique' | 'caissier';
  modules: {
    [key: string]: boolean;
  };
}

const solutionLabels = {
  comptable: 'Solution Comptabilité',
  commercial: 'Solution Commerciale',
  entreprise: 'Solution Entreprise'
};

const solutionIcons = {
  comptable: FileBarChart,
  commercial: ShoppingBag,
  entreprise: Globe2
};

const roleLabels = {
  manager: 'Manager',
  comptable: 'Comptable',
  commercial: 'Commercial',
  logistique: 'Logistique',
  caissier: 'Caissier'
};

const moduleLabels = {
  dashboard: 'Tableau de bord',
  accounting: 'Comptabilité',
  contacts: 'Contacts',
  quotes: 'Devis',
  invoicing: 'Facturation',
  purchases: 'Achats',
  products: 'Produits',
  stock: 'Stock',
  treasury: 'Trésorerie',
  budget: 'Budget',
  employees: 'Employés',
  reports: 'Rapports',
  analytics: 'Analyses',
  training: 'Formation',
  settings: 'Paramètres'
};

const defaultAccess = {
  comptable: {
    manager: ['accounting', 'treasury', 'budget', 'employees', 'settings'],
    comptable: ['accounting', 'treasury', 'budget'],
    commercial: [],
    logistique: [],
    caissier: ['treasury']
  },
  commercial: {
    manager: ['contacts', 'quotes', 'invoicing', 'purchases', 'products', 'stock', 'employees', 'settings'],
    comptable: [],
    commercial: ['contacts', 'quotes', 'invoicing', 'purchases'],
    logistique: ['products', 'stock'],
    caissier: []
  },
  entreprise: {
    manager: ['dashboard', 'accounting', 'contacts', 'quotes', 'invoicing', 'purchases', 'products', 'stock', 'treasury', 'budget', 'employees', 'reports', 'analytics', 'training', 'settings'],
    comptable: ['accounting', 'treasury', 'budget'],
    commercial: ['contacts', 'quotes', 'invoicing', 'purchases'],
    logistique: ['products', 'stock'],
    caissier: ['treasury']
  }
};

export const ModuleAccessConfiguration = () => {
  const [accessConfig, setAccessConfig] = useState(defaultAccess);
  const [hasChanges, setHasChanges] = useState(false);

  const toggleModuleAccess = (solution: string, role: string, module: string) => {
    setAccessConfig(prev => {
      const newConfig = { ...prev };
      const currentModules = newConfig[solution][role] || [];
      
      if (currentModules.includes(module)) {
        newConfig[solution][role] = currentModules.filter(m => m !== module);
      } else {
        newConfig[solution][role] = [...currentModules, module];
      }
      
      setHasChanges(true);
      return newConfig;
    });
  };

  const resetToDefault = () => {
    setAccessConfig(defaultAccess);
    setHasChanges(false);
  };

  const saveConfiguration = () => {
    console.log('Configuration sauvegardée:', accessConfig);
    // Ici vous pourrez implémenter la sauvegarde en base de données
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="w-7 h-7 text-blue-600" />
            Configuration des Accès aux Modules
          </h2>
          <p className="text-gray-600 mt-1">
            Définissez les accès aux modules pour chaque rôle selon la solution souscrite
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={resetToDefault}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Réinitialiser
          </Button>
          <Button
            onClick={saveConfiguration}
            disabled={!hasChanges}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Sauvegarder
          </Button>
        </div>
      </div>

      {Object.entries(solutionLabels).map(([solutionKey, solutionLabel]) => {
        const SolutionIcon = solutionIcons[solutionKey];
        
        return (
          <Card key={solutionKey}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <SolutionIcon className="w-6 h-6" />
                {solutionLabel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Rôle</th>
                      {Object.entries(moduleLabels).map(([moduleKey, moduleLabel]) => (
                        <th key={moduleKey} className="text-center p-2 font-medium text-sm">
                          <div className="transform -rotate-45 origin-bottom-left whitespace-nowrap">
                            {moduleLabel}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(roleLabels).map(([roleKey, roleLabel]) => {
                      const userModules = accessConfig[solutionKey]?.[roleKey] || [];
                      
                      return (
                        <tr key={roleKey} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-500" />
                              <span className="font-medium">{roleLabel}</span>
                              <Badge variant="outline" className="text-xs">
                                {userModules.length} modules
                              </Badge>
                            </div>
                          </td>
                          {Object.keys(moduleLabels).map((moduleKey) => {
                            const hasAccess = userModules.includes(moduleKey);
                            
                            return (
                              <td key={moduleKey} className="text-center p-2">
                                <Switch
                                  checked={hasAccess}
                                  onCheckedChange={() => toggleModuleAccess(solutionKey, roleKey, moduleKey)}
                                />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-800">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Modifications non sauvegardées</span>
          </div>
          <p className="text-yellow-700 text-sm mt-1">
            Vous avez des modifications en attente. N'oubliez pas de sauvegarder vos changements.
          </p>
        </div>
      )}
    </div>
  );
};
