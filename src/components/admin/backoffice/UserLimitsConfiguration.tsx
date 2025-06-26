
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Save, 
  RefreshCw,
  FileBarChart,
  ShoppingBag,
  Globe2,
  AlertTriangle
} from 'lucide-react';

interface UserLimits {
  [solution: string]: {
    maxUsers: number;
    currentUsers: number;
    roleDistribution: {
      [role: string]: number;
    };
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

const defaultLimits = {
  comptable: {
    maxUsers: 5,
    currentUsers: 2,
    roleDistribution: {
      manager: 1,
      comptable: 2,
      commercial: 0,
      logistique: 0,
      caissier: 1
    }
  },
  commercial: {
    maxUsers: 10,
    currentUsers: 3,
    roleDistribution: {
      manager: 1,
      comptable: 0,
      commercial: 3,
      logistique: 2,
      caissier: 0
    }
  },
  entreprise: {
    maxUsers: 50,
    currentUsers: 1,
    roleDistribution: {
      manager: 1,
      comptable: 2,
      commercial: 3,
      logistique: 2,
      caissier: 1
    }
  }
};

export const UserLimitsConfiguration = () => {
  const [userLimits, setUserLimits] = useState<UserLimits>(defaultLimits);
  const [hasChanges, setHasChanges] = useState(false);

  const updateMaxUsers = (solution: string, maxUsers: number) => {
    setUserLimits(prev => ({
      ...prev,
      [solution]: {
        ...prev[solution],
        maxUsers: Math.max(1, maxUsers)
      }
    }));
    setHasChanges(true);
  };

  const updateRoleLimit = (solution: string, role: string, limit: number) => {
    setUserLimits(prev => ({
      ...prev,
      [solution]: {
        ...prev[solution],
        roleDistribution: {
          ...prev[solution].roleDistribution,
          [role]: Math.max(0, limit)
        }
      }
    }));
    setHasChanges(true);
  };

  const resetToDefault = () => {
    setUserLimits(defaultLimits);
    setHasChanges(false);
  };

  const saveConfiguration = () => {
    console.log('Limites utilisateurs sauvegardées:', userLimits);
    // Ici vous pourrez implémenter la sauvegarde en base de données
    setHasChanges(false);
  };

  const getTotalRoleUsers = (solution: string) => {
    return Object.values(userLimits[solution].roleDistribution).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-7 h-7 text-green-600" />
            Configuration des Limites Utilisateurs
          </h2>
          <p className="text-gray-600 mt-1">
            Définissez le nombre maximum d'utilisateurs par solution et par rôle
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
        const solutionData = userLimits[solutionKey];
        const totalRoleUsers = getTotalRoleUsers(solutionKey);
        const isOverLimit = totalRoleUsers > solutionData.maxUsers;
        
        return (
          <Card key={solutionKey}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <SolutionIcon className="w-6 h-6" />
                {solutionLabel}
                <Badge variant={isOverLimit ? "destructive" : "default"}>
                  {solutionData.currentUsers}/{solutionData.maxUsers} utilisateurs
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor={`max-users-${solutionKey}`}>
                    Nombre maximum d'utilisateurs
                  </Label>
                  <Input
                    id={`max-users-${solutionKey}`}
                    type="number"
                    min="1"
                    value={solutionData.maxUsers}
                    onChange={(e) => updateMaxUsers(solutionKey, parseInt(e.target.value) || 1)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Utilisateurs actuels</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                    <span className="text-lg font-semibold">{solutionData.currentUsers}</span>
                    <span className="text-gray-600 ml-2">utilisateurs actifs</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Répartition par rôle</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(roleLabels).map(([roleKey, roleLabel]) => (
                    <div key={roleKey} className="space-y-2">
                      <Label htmlFor={`${solutionKey}-${roleKey}`}>
                        {roleLabel}
                      </Label>
                      <Input
                        id={`${solutionKey}-${roleKey}`}
                        type="number"
                        min="0"
                        value={solutionData.roleDistribution[roleKey]}
                        onChange={(e) => updateRoleLimit(solutionKey, roleKey, parseInt(e.target.value) || 0)}
                      />
                    </div>
                  ))}
                </div>
                
                {isOverLimit && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mt-4">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-sm">
                      La somme des rôles ({totalRoleUsers}) dépasse la limite maximale ({solutionData.maxUsers})
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-800">
            <Users className="w-5 h-5" />
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
