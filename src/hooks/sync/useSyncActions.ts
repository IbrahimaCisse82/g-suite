
import { useCallback } from 'react';
import { syncManager, SyncResult } from '@/services/syncManager';
import { useConnectivity } from '@/hooks/useConnectivity';
import { toast } from 'sonner';

interface SyncActions {
  setIsSyncing: (syncing: boolean) => void;
  setSyncResult: (result: SyncResult | null) => void;
  setConflicts: (conflicts: any[]) => void;
  updateSyncProgress: (current: number, total: number, phase: string) => void;
  resetSyncProgress: () => void;
}

export function useSyncActions(
  syncActions: SyncActions,
  options: {
    autoResolveConflicts: boolean;
    defaultStrategy: string;
  }
) {
  const { isOnline } = useConnectivity();

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

    syncActions.setIsSyncing(true);
    syncActions.updateSyncProgress(0, 100, 'Initialisation...');

    try {
      const syncOptions = {
        strategy: customOptions.strategy || options.defaultStrategy,
        batchSize: customOptions.batchSize || 50,
        conflictResolution: (options.autoResolveConflicts ? 'auto' : 'manual') as 'auto' | 'manual',
        ...customOptions
      };

      syncActions.updateSyncProgress(25, 100, 'Analyse des changements...');

      const result = await syncManager.performDifferentialSync(type, syncOptions);
      
      syncActions.updateSyncProgress(75, 100, 'Finalisation...');
      
      syncActions.setSyncResult(result);
      syncActions.setConflicts(result.conflicts);

      if (result.success) {
        toast.success('Synchronisation réussie', {
          description: `${result.syncedCount} éléments synchronisés`
        });
      } else {
        toast.error('Erreurs de synchronisation', {
          description: `${result.errorCount} erreurs rencontrées`
        });
      }

      syncActions.updateSyncProgress(100, 100, 'Terminé');

      return result;
    } catch (error) {
      console.error('Erreur lors de la synchronisation différentielle:', error);
      toast.error('Erreur de synchronisation', {
        description: 'Une erreur inattendue s\'est produite'
      });
      return null;
    } finally {
      syncActions.setIsSyncing(false);
      syncActions.resetSyncProgress();
    }
  }, [isOnline, options.autoResolveConflicts, options.defaultStrategy, syncActions]);

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

    syncActions.setSyncResult(summary);
    
    toast.success('Synchronisation complète terminée', {
      description: `${totalSynced} éléments synchronisés, ${totalConflicts} conflits détectés`
    });

    return summary;
  }, [performDifferentialSync, syncActions]);

  return {
    performDifferentialSync,
    performFullSync,
    canSync: isOnline && !syncManager.isSyncInProgress(),
  };
}
