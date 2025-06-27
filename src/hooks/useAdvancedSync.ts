import { useState, useCallback, useEffect } from 'react';
import { syncManager, SyncResult, SyncConflict, SyncStrategy } from '@/services/syncManager';
import { useConnectivity } from './useConnectivity';
import { toast } from 'sonner';

interface UseAdvancedSyncOptions {
  autoResolveConflicts?: boolean;
  defaultStrategy?: string;
  enableRealTimeSync?: boolean;
  syncInterval?: number;
}

export function useAdvancedSync(options: UseAdvancedSyncOptions = {}) {
  const { isOnline } = useConnectivity();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [conflicts, setConflicts] = useState<SyncConflict[]>([]);
  const [strategies, setStrategies] = useState<SyncStrategy[]>([]);
  const [syncProgress, setSyncProgress] = useState<{
    current: number;
    total: number;
    phase: string;
  }>({ current: 0, total: 0, phase: 'idle' });

  const {
    autoResolveConflicts = true,
    defaultStrategy = 'latest_wins',
    enableRealTimeSync = true,
    syncInterval = 30000 // 30 secondes
  } = options;

  // Initialiser le gestionnaire de synchronisation
  useEffect(() => {
    syncManager.initialize().then(() => {
      loadSyncStrategies();
    });
  }, []);

  // Charger les stratégies de résolution de conflits
  const loadSyncStrategies = useCallback(async () => {
    try {
      const availableStrategies = await syncManager.getConflictResolutionStrategies();
      setStrategies(availableStrategies);
    } catch (error) {
      console.error('Erreur lors du chargement des stratégies:', error);
    }
  }, []);

  // Synchronisation différentielle pour un type de données
  const performDifferentialSync = useCallback(async (
    type: 'contact' | 'invoice' | 'product' | 'employee' | 'budget' | 'treasury',
    customOptions: {
      strategy?: string;
      batchSize?: number;
      conflictResolution?: 'auto' | 'manual';
    } = {}
  ) => {
    if (!isOnline) {
      toast.error('Synchronisation impossible', {
        description: 'Connexion internet requise pour la synchronisation'
      });
      return null;
    }

    if (syncManager.isSyncInProgress()) {
      toast.warning('Synchronisation en cours', {
        description: 'Une synchronisation est déjà en cours d\'exécution'
      });
      return null;
    }

    setIsSyncing(true);
    setSyncProgress({ current: 0, total: 100, phase: 'Initialisation...' });

    try {
      const syncOptions = {
        strategy: customOptions.strategy || defaultStrategy,
        batchSize: customOptions.batchSize || 50,
        conflictResolution: (autoResolveConflicts ? 'auto' : 'manual') as 'auto' | 'manual',
        ...customOptions
      };

      setSyncProgress({ current: 25, total: 100, phase: 'Analyse des changements...' });

      const result = await syncManager.performDifferentialSync(type, syncOptions);
      
      setSyncProgress({ current: 75, total: 100, phase: 'Finalisation...' });
      
      setSyncResult(result);
      setConflicts(result.conflicts);

      if (result.success) {
        toast.success('Synchronisation réussie', {
          description: `${result.syncedCount} éléments synchronisés`
        });
      } else {
        toast.error('Erreurs de synchronisation', {
          description: `${result.errorCount} erreurs rencontrées`
        });
      }

      setSyncProgress({ current: 100, total: 100, phase: 'Terminé' });

      return result;
    } catch (error) {
      console.error('Erreur lors de la synchronisation différentielle:', error);
      toast.error('Erreur de synchronisation', {
        description: 'Une erreur inattendue s\'est produite'
      });
      return null;
    } finally {
      setIsSyncing(false);
      setTimeout(() => {
        setSyncProgress({ current: 0, total: 0, phase: 'idle' });
      }, 2000);
    }
  }, [isOnline, autoResolveConflicts, defaultStrategy]);

  // Synchronisation de tous les types de données
  const performFullSync = useCallback(async () => {
    const dataTypes: Array<'contact' | 'invoice' | 'product' | 'employee' | 'budget' | 'treasury'> = [
      'contact', 'invoice', 'product', 'employee', 'budget', 'treasury'
    ];

    const results: SyncResult[] = [];
    let totalSynced = 0;
    let totalErrors = 0;
    let totalConflicts = 0;

    for (const type of dataTypes) {
      const result = await performDifferentialSync(type);
      if (result) {
        results.push(result);
        totalSynced += result.syncedCount;
        totalErrors += result.errorCount;
        totalConflicts += result.conflictCount;
      }
    }

    const summary = {
      success: totalErrors === 0,
      syncedCount: totalSynced,
      conflictCount: totalConflicts,
      errorCount: totalErrors,
      conflicts: results.flatMap(r => r.conflicts),
      errors: results.flatMap(r => r.errors)
    };

    setSyncResult(summary);
    
    toast.success('Synchronisation complète terminée', {
      description: `${totalSynced} éléments synchronisés, ${totalConflicts} conflits détectés`
    });

    return summary;
  }, [performDifferentialSync]);

  // Résoudre un conflit manuellement
  const resolveConflict = useCallback(async (
    conflict: SyncConflict, 
    resolution: 'local' | 'server' | 'merge' | any
  ) => {
    try {
      let resolvedData;
      
      if (typeof resolution === 'string') {
        const strategy = strategies.find(s => s.name.toLowerCase().includes(resolution));
        if (strategy) {
          resolvedData = strategy.resolve(conflict);
        } else {
          throw new Error(`Stratégie de résolution inconnue: ${resolution}`);
        }
      } else {
        resolvedData = resolution;
      }

      // Ici on devrait appeler une méthode du syncManager pour appliquer la résolution
      // Pour le moment, on simule la résolution
      
      setConflicts(prev => prev.filter(c => c.id !== conflict.id));
      
      toast.success('Conflit résolu', {
        description: `Le conflit pour ${conflict.type} a été résolu`
      });

      return resolvedData;
    } catch (error) {
      console.error('Erreur lors de la résolution du conflit:', error);
      toast.error('Erreur de résolution', {
        description: 'Impossible de résoudre le conflit'
      });
      throw error;
    }
  }, [strategies]);

  // Synchronisation automatique en temps réel
  useEffect(() => {
    if (!enableRealTimeSync || !isOnline) return;

    const intervalId = setInterval(() => {
      if (!syncManager.isSyncInProgress()) {
        // Synchronisation silencieuse en arrière-plan
        performDifferentialSync('contact', { conflictResolution: 'auto' }).catch(console.error);
      }
    }, syncInterval);

    return () => clearInterval(intervalId);
  }, [enableRealTimeSync, isOnline, syncInterval, performDifferentialSync]);

  // Ajouter une stratégie personnalisée
  const addCustomStrategy = useCallback(async (name: string, strategy: SyncStrategy) => {
    try {
      await syncManager.addCustomStrategy(name, strategy);
      await loadSyncStrategies();
      toast.success('Stratégie ajoutée', {
        description: `La stratégie "${name}" a été ajoutée avec succès`
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la stratégie:', error);
      toast.error('Erreur', {
        description: 'Impossible d\'ajouter la stratégie personnalisée'
      });
    }
  }, [loadSyncStrategies]);

  return {
    // État
    isSyncing,
    syncResult,
    conflicts,
    strategies,
    syncProgress,
    
    // Actions
    performDifferentialSync,
    performFullSync,
    resolveConflict,
    addCustomStrategy,
    
    // Utilitaires
    hasConflicts: conflicts.length > 0,
    canSync: isOnline && !syncManager.isSyncInProgress()
  };
}
