
import React, { useState } from 'react';
import { useAdvancedSync } from '@/hooks/useAdvancedSync';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, RefreshCw, Settings, Zap, AlertCircle } from 'lucide-react';
import { SyncConflict } from '@/services/syncManager';

interface AdvancedSyncPanelProps {
  compact?: boolean;
}

export const AdvancedSyncPanel: React.FC<AdvancedSyncPanelProps> = ({ compact = false }) => {
  const {
    isSyncing,
    syncResult,
    conflicts,
    strategies,
    syncProgress,
    performDifferentialSync,
    performFullSync,
    resolveConflict,
    hasConflicts,
    canSync
  } = useAdvancedSync({
    autoResolveConflicts: false,
    enableRealTimeSync: true
  });

  const [selectedDataType, setSelectedDataType] = useState<string>('contact');
  const [selectedStrategy, setSelectedStrategy] = useState<string>('latest_wins');

  const dataTypes = [
    { value: 'contact', label: 'Contacts' },
    { value: 'invoice', label: 'Factures' },
    { value: 'product', label: 'Produits' },
    { value: 'employee', label: 'Employés' },
    { value: 'budget', label: 'Budgets' },
    { value: 'treasury', label: 'Trésorerie' }
  ];

  const handleSingleSync = async () => {
    await performDifferentialSync(selectedDataType as any, {
      strategy: selectedStrategy,
      conflictResolution: 'manual'
    });
  };

  const handleConflictResolution = async (conflict: SyncConflict, resolution: string) => {
    await resolveConflict(conflict, resolution);
  };

  if (compact) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Sync Avancée
            </CardTitle>
            <Badge variant={hasConflicts ? 'destructive' : 'default'}>
              {hasConflicts ? `${conflicts.length} conflits` : 'OK'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {isSyncing && (
            <div className="space-y-2">
              <Progress value={(syncProgress.current / syncProgress.total) * 100} />
              <p className="text-sm text-gray-600">{syncProgress.phase}</p>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button
              onClick={performFullSync}
              disabled={!canSync}
              size="sm"
              className="flex-1"
            >
              {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Sync Complète'}
            </Button>
            {hasConflicts && (
              <Button variant="outline" size="sm">
                Résoudre ({conflicts.length})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-6 h-6" />
          Synchronisation Avancée
        </CardTitle>
        <CardDescription>
          Gestion des conflits et synchronisation différentielle des données
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="sync" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sync">Synchronisation</TabsTrigger>
            <TabsTrigger value="conflicts" className="relative">
              Conflits
              {hasConflicts && (
                <Badge variant="destructive" className="ml-2 h-4 w-4 p-0 text-xs">
                  {conflicts.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="sync" className="space-y-4">
            {isSyncing && (
              <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="font-medium">Synchronisation en cours...</span>
                </div>
                <Progress value={(syncProgress.current / syncProgress.total) * 100} className="w-full" />
                <p className="text-sm text-gray-600">{syncProgress.phase}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-medium">Type de données</label>
                <Select value={selectedDataType} onValueChange={setSelectedDataType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dataTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Stratégie de conflit</label>
                <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {strategies.map(strategy => (
                      <SelectItem key={strategy.name} value={strategy.name.toLowerCase().replace(' ', '_')}>
                        {strategy.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSingleSync}
                disabled={!canSync}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Sync Sélective
              </Button>
              
              <Button
                onClick={performFullSync}
                disabled={!canSync}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Sync Complète
              </Button>
            </div>

            {syncResult && (
              <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  {syncResult.success ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                  Résultat de la synchronisation
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Synchronisés:</span>
                    <span className="ml-1 font-medium text-green-600">{syncResult.syncedCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Conflits:</span>
                    <span className="ml-1 font-medium text-orange-600">{syncResult.conflictCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Erreurs:</span>
                    <span className="ml-1 font-medium text-red-600">{syncResult.errorCount}</span>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="conflicts" className="space-y-4">
            {conflicts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                <p>Aucun conflit détecté</p>
              </div>
            ) : (
              <div className="space-y-3">
                {conflicts.map((conflict, index) => (
                  <Card key={`${conflict.id}-${index}`} className="border-l-4 border-l-orange-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          Conflit - {conflict.type}
                        </CardTitle>
                        <Badge variant="outline">{conflict.field}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h5 className="font-medium text-blue-600 mb-1">Version locale</h5>
                          <p className="text-gray-600">
                            Modifiée le: {new Date(conflict.localTimestamp).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-green-600 mb-1">Version serveur</h5>
                          <p className="text-gray-600">
                            Modifiée le: {new Date(conflict.serverTimestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleConflictResolution(conflict, 'local')}
                          variant="outline"
                        >
                          Garder Local
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleConflictResolution(conflict, 'server')}
                          variant="outline"
                        >
                          Garder Serveur
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleConflictResolution(conflict, 'merge')}
                          variant="outline"
                        >
                          Fusionner
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Paramètres de synchronisation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Stratégies disponibles</h4>
                  <div className="space-y-2">
                    {strategies.map((strategy, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="font-medium">{strategy.name}</span>
                        <Badge variant="secondary">Disponible</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
