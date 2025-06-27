
import { useCallback, useEffect } from 'react';
import { syncManager, SyncStrategy } from '@/services/syncManager';
import { toast } from 'sonner';

export function useSyncStrategies(setStrategies: (strategies: SyncStrategy[]) => void) {
  // Charger les stratégies de résolution de conflits
  const loadSyncStrategies = useCallback(async () => {
    try {
      const availableStrategies = await syncManager.getConflictResolutionStrategies();
      setStrategies(availableStrategies);
    } catch (error) {
      console.error('Erreur lors du chargement des stratégies:', error);
    }
  }, [setStrategies]);

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

  // Initialiser le gestionnaire de synchronisation
  useEffect(() => {
    syncManager.initialize().then(() => {
      loadSyncStrategies();
    });
  }, [loadSyncStrategies]);

  return {
    loadSyncStrategies,
    addCustomStrategy,
  };
}
