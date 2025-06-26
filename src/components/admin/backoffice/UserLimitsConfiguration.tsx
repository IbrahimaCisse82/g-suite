
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
  AlertTriangle,
  Building2
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface CompanyWithSubscription {
  id: string;
  name: string;
  subscription: {
    plan_type: string;
    max_users: number;
  };
  current_users_count: number;
  role_distribution: {
    [role: string]: number;
  };
}

interface UserLimitsConfig {
  company_id: string;
  max_users: number;
  role_limits: {
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
  const [userLimitsConfig, setUserLimitsConfig] = useState<{[key: string]: UserLimitsConfig}>({});
  const [hasChanges, setHasChanges] = useState(false);
  const queryClient = useQueryClient();

  // Fetch companies with active subscriptions and their current user counts
  const { data: companiesData, isLoading } = useQuery({
    queryKey: ['companies-with-subscriptions'],
    queryFn: async () => {
      // Get companies with active subscriptions
      const { data: subscriptions, error } = await supabase
        .from('company_subscriptions')
        .select(`
          company_id,
          subscription_plans (
            plan_type,
            max_users
          ),
          companies (
            id,
            name
          )
        `)
        .eq('is_active', true);

      if (error) throw error;
      
      const companiesData: CompanyWithSubscription[] = [];
      
      for (const sub of subscriptions || []) {
        if (!sub.companies || !sub.subscription_plans) continue;
        
        // Count current users for this company
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('company_id', sub.company_id);

        // Get role distribution
        const { data: profiles } = await supabase
          .from('profiles')
          .select('role')
          .eq('company_id', sub.company_id);

        const roleDistribution = profiles?.reduce((acc, profile) => {
          const role = profile.role || 'user';
          acc[role] = (acc[role] || 0) + 1;
          return acc;
        }, {} as {[key: string]: number}) || {};

        companiesData.push({
          id: sub.companies.id,
          name: sub.companies.name,
          subscription: {
            plan_type: sub.subscription_plans.plan_type,
            max_users: sub.subscription_plans.max_users || 0
          },
          current_users_count: userCount || 0,
          role_distribution: roleDistribution
        });
      }
      
      return companiesData;
    },
  });

  // Initialize config when data loads
  useEffect(() => {
    if (companiesData && Object.keys(userLimitsConfig).length === 0) {
      const initialConfig: {[key: string]: UserLimitsConfig} = {};
      companiesData.forEach(company => {
        initialConfig[company.id] = {
          company_id: company.id,
          max_users: company.subscription.max_users,
          role_limits: company.role_distribution
        };
      });
      setUserLimitsConfig(initialConfig);
    }
  }, [companiesData, userLimitsConfig]);

  // Save configuration mutation
  const saveConfigMutation = useMutation({
    mutationFn: async (config: {[key: string]: UserLimitsConfig}) => {
      // Here you would save the configuration to your database
      // For now, we'll just log it
      console.log('Saving user limits configuration:', config);
      
      // In a real implementation, you might update the subscription_plans table
      // or create a separate user_limits_overrides table
      for (const [companyId, limits] of Object.entries(config)) {
        const { error } = await supabase
          .from('company_subscriptions')
          .update({
            // You might want to add custom_max_users field to allow overrides
          })
          .eq('company_id', companyId)
          .eq('is_active', true);
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      setHasChanges(false);
      queryClient.invalidateQueries({ queryKey: ['companies-with-subscriptions'] });
    }
  });

  const updateMaxUsers = (companyId: string, maxUsers: number) => {
    setUserLimitsConfig(prev => ({
      ...prev,
      [companyId]: {
        ...prev[companyId],
        max_users: Math.max(1, maxUsers)
      }
    }));
    setHasChanges(true);
  };

  const updateRoleLimit = (companyId: string, role: string, limit: number) => {
    setUserLimitsConfig(prev => ({
      ...prev,
      [companyId]: {
        ...prev[companyId],
        role_limits: {
          ...prev[companyId]?.role_limits,
          [role]: Math.max(0, limit)
        }
      }
    }));
    setHasChanges(true);
  };

  const resetToDefault = () => {
    if (companiesData) {
      const defaultConfig: {[key: string]: UserLimitsConfig} = {};
      companiesData.forEach(company => {
        defaultConfig[company.id] = {
          company_id: company.id,
          max_users: company.subscription.max_users,
          role_limits: company.role_distribution
        };
      });
      setUserLimitsConfig(defaultConfig);
      setHasChanges(false);
    }
  };

  const saveConfiguration = () => {
    saveConfigMutation.mutate(userLimitsConfig);
  };

  const getTotalRoleUsers = (companyId: string) => {
    const config = userLimitsConfig[companyId];
    if (!config) return 0;
    return Object.values(config.role_limits || {}).reduce((sum, count) => sum + count, 0);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Chargement des entreprises...</p>
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
            Gestion des Limites Utilisateurs SaaS
          </h2>
          <p className="text-gray-600 mt-1">
            Contrôlez le nombre d'utilisateurs autorisés par entreprise selon leur abonnement
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
            disabled={!hasChanges || saveConfigMutation.isPending}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saveConfigMutation.isPending ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </div>
      </div>

      {!companiesData || companiesData.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aucune entreprise avec abonnement actif</p>
            <p className="text-sm text-gray-400">Les entreprises avec des abonnements actifs apparaîtront ici</p>
          </CardContent>
        </Card>
      ) : (
        companiesData.map((company) => {
          const config = userLimitsConfig[company.id];
          if (!config) return null;
          
          const SolutionIcon = solutionIcons[company.subscription.plan_type as keyof typeof solutionIcons] || Globe2;
          const solutionLabel = solutionLabels[company.subscription.plan_type as keyof typeof solutionLabels] || company.subscription.plan_type;
          const totalRoleUsers = getTotalRoleUsers(company.id);
          const isOverLimit = totalRoleUsers > config.max_users;
          const isAtLimit = company.current_users_count >= config.max_users;
          
          return (
            <Card key={company.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <SolutionIcon className="w-6 h-6" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span>{company.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {solutionLabel}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 font-normal mt-1">
                      Utilisateurs actuels: {company.current_users_count}
                    </p>
                  </div>
                  <Badge variant={isAtLimit ? "destructive" : isOverLimit ? "secondary" : "default"}>
                    {company.current_users_count}/{config.max_users} utilisateurs
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor={`max-users-${company.id}`}>
                      Limite maximale d'utilisateurs
                    </Label>
                    <Input
                      id={`max-users-${company.id}`}
                      type="number"
                      min="1"
                      value={config.max_users}
                      onChange={(e) => updateMaxUsers(company.id, parseInt(e.target.value) || 1)}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Plan actuel: {company.subscription.max_users} utilisateurs
                    </p>
                  </div>
                  
                  <div>
                    <Label>Statut d'utilisation</Label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {company.current_users_count} utilisateurs actifs
                        </span>
                        {isAtLimit && (
                          <Badge variant="destructive" className="text-xs">
                            Limite atteinte
                          </Badge>
                        )}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isAtLimit ? 'bg-red-500' : 
                            company.current_users_count / config.max_users > 0.8 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}
                          style={{ 
                            width: `${Math.min((company.current_users_count / config.max_users) * 100, 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Répartition actuelle par rôle</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(roleLabels).map(([roleKey, roleLabel]) => (
                      <div key={roleKey} className="space-y-2">
                        <Label>
                          {roleLabel}
                        </Label>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            Actuels: {company.role_distribution[roleKey] || 0}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            / Limite: {config.role_limits?.[roleKey] || 0}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {isAtLimit && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertTriangle className="w-5 h-5" />
                    <div>
                      <span className="text-sm font-medium">Limite d'utilisateurs atteinte</span>
                      <p className="text-xs text-red-500 mt-1">
                        Cette entreprise ne peut plus ajouter d'utilisateurs sans mise à niveau de son abonnement.
                      </p>
                    </div>
                  </div>
                )}
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
            Vous avez des modifications en attente pour les limites d'utilisateurs. N'oubliez pas de sauvegarder vos changements.
          </p>
        </div>
      )}
    </div>
  );
};
