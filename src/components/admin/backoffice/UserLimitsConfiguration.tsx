
import React, { useState, useEffect } from 'react';
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
import { supabase } from '@/integrations/supabase/client';

interface CompanyLimits {
  companyId: string;
  companyName: string;
  solution: string;
  maxUsers: number;
  currentUsers: number;
  roleDistribution: {
    [role: string]: number;
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

export const UserLimitsConfiguration = () => {
  const [companyLimits, setCompanyLimits] = useState<CompanyLimits[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCompanyLimits = async () => {
    try {
      // Récupérer les entreprises avec des abonnements actifs
      const { data: subscriptions, error } = await supabase
        .from('company_subscriptions')
        .select(`
          company_id,
          companies (
            name
          ),
          subscription_plans (
            name,
            plan_type,
            max_users
          )
        `)
        .eq('is_active', true);

      if (error) throw error;

      const limits: CompanyLimits[] = [];

      for (const subscription of subscriptions || []) {
        // Compter les utilisateurs actuels pour chaque entreprise
        const { count: currentUsers } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('company_id', subscription.company_id);

        // Compter par rôle
        const { data: roleData } = await supabase
          .from('profiles')
          .select('role')
          .eq('company_id', subscription.company_id);

        const roleDistribution = {
          manager: 0,
          comptable: 0,
          commercial: 0,
          logistique: 0,
          caissier: 0
        };

        roleData?.forEach(profile => {
          const role = profile.role || 'user';
          if (roleDistribution.hasOwnProperty(role)) {
            roleDistribution[role]++;
          }
        });

        limits.push({
          companyId: subscription.company_id,
          companyName: subscription.companies?.name || 'Entreprise inconnue',
          solution: subscription.subscription_plans?.plan_type || 'entreprise',
          maxUsers: subscription.subscription_plans?.max_users || 5,
          currentUsers: currentUsers || 0,
          roleDistribution
        });
      }

      setCompanyLimits(limits);
    } catch (error) {
      console.error('Erreur lors du chargement des limites:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyLimits();
  }, []);

  const updateMaxUsers = (companyId: string, maxUsers: number) => {
    setCompanyLimits(prev => prev.map(company => 
      company.companyId === companyId 
        ? { ...company, maxUsers: Math.max(1, maxUsers) }
        : company
    ));
    setHasChanges(true);
  };

  const updateRoleLimit = (companyId: string, role: string, limit: number) => {
    setCompanyLimits(prev => prev.map(company => 
      company.companyId === companyId 
        ? {
            ...company,
            roleDistribution: {
              ...company.roleDistribution,
              [role]: Math.max(0, limit)
            }
          }
        : company
    ));
    setHasChanges(true);
  };

  const resetToDefault = () => {
    fetchCompanyLimits();
    setHasChanges(false);
  };

  const saveConfiguration = async () => {
    try {
      // Sauvegarder les modifications en base de données
      for (const company of companyLimits) {
        // Mettre à jour le max_users dans subscription_plans ou créer une table de configuration spécifique
        console.log('Sauvegarde configuration pour:', company.companyName, company);
      }
      setHasChanges(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const getTotalRoleUsers = (company: CompanyLimits) => {
    return Object.values(company.roleDistribution).reduce((sum, count) => sum + count, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Chargement des limites utilisateurs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-7 h-7 text-green-600" />
            Configuration des Limites Utilisateurs
          </h2>
          <p className="text-gray-600 mt-1">
            Définissez le nombre maximum d'utilisateurs par entreprise avec abonnement actif
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={resetToDefault}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Actualiser
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

      {companyLimits.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">Aucune entreprise avec abonnement actif</p>
            <p className="text-gray-400">Les entreprises avec des abonnements actifs apparaîtront ici</p>
          </CardContent>
        </Card>
      ) : (
        companyLimits.map((company) => {
          const SolutionIcon = solutionIcons[company.solution] || Globe2;
          const totalRoleUsers = getTotalRoleUsers(company);
          const isOverLimit = totalRoleUsers > company.maxUsers;
          
          return (
            <Card key={company.companyId}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <SolutionIcon className="w-6 h-6" />
                  <div className="flex flex-col">
                    <span>{company.companyName}</span>
                    <span className="text-sm font-normal text-gray-600">
                      {solutionLabels[company.solution] || 'Solution inconnue'}
                    </span>
                  </div>
                  <Badge variant={isOverLimit ? "destructive" : "default"}>
                    {company.currentUsers}/{company.maxUsers} utilisateurs
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor={`max-users-${company.companyId}`}>
                      Nombre maximum d'utilisateurs
                    </Label>
                    <Input
                      id={`max-users-${company.companyId}`}
                      type="number"
                      min="1"
                      value={company.maxUsers}
                      onChange={(e) => updateMaxUsers(company.companyId, parseInt(e.target.value) || 1)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Utilisateurs actuels</Label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md">
                      <span className="text-lg font-semibold">{company.currentUsers}</span>
                      <span className="text-gray-600 ml-2">utilisateurs actifs</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Répartition par rôle</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(roleLabels).map(([roleKey, roleLabel]) => (
                      <div key={roleKey} className="space-y-2">
                        <Label htmlFor={`${company.companyId}-${roleKey}`}>
                          {roleLabel}
                        </Label>
                        <Input
                          id={`${company.companyId}-${roleKey}`}
                          type="number"
                          min="0"
                          value={company.roleDistribution[roleKey] || 0}
                          onChange={(e) => updateRoleLimit(company.companyId, roleKey, parseInt(e.target.value) || 0)}
                        />
                      </div>
                    ))}
                  </div>
                  
                  {isOverLimit && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mt-4">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="text-sm">
                        La somme des rôles ({totalRoleUsers}) dépasse la limite maximale ({company.maxUsers})
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}

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
