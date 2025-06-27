
import { useSyncState } from './sync/useSyncState';
import { useSyncStrategies } from './sync/useSyncStrategies';
import { useSyncConflicts } from './sync/useSyncConflicts';
import { useSyncActions } from './sync/useSyncActions';
import { useAutoSync } from './sync/useAutoSync';

interface UseAdvancedSyncOptions {
  autoResolveConflicts?: boolean;
  defaultStrategy?: string;
  enableRealTimeSync?: boolean;
  syncInterval?: number;
}

export function useAdvancedSync(options: UseAdvancedSyncOptions = {}) {
  const {
    autoResolveConflicts = true,
    defaultStrategy = 'latest_wins',
    enableRealTimeSync = true,
    syncInterval = 30000 // 30 secondes
  } = options;

  // État de synchronisation
  const {
    isSyncing,
    syncResult,
    conflicts,
    strategies,
    syncProgress,
    setIsSyncing,
    setSyncResult,
    setConflicts,
    setStrategies,
    updateSyncProgress,
    resetSyncProgress,
  } = useSyncState();

  // Gestion des stratégies
  const { addCustomStrategy } = useSyncStrategies(setStrategies);

  // Gestion des conflits
  const { resolveConflict, hasConflicts } = useSyncConflicts(conflicts, setConflicts, strategies);

  // Actions de synchronisation
  const { performDifferentialSync, performFullSync, canSync } = useSyncActions(
    {
      setIsSyncing,
      setSyncResult,
      setConflicts,
      updateSyncProgress,
      resetSyncProgress,
    },
    {
      autoResolveConflicts,
      defaultStrategy,
    }
  );

  // Synchronisation automatique
  useAutoSync(enableRealTimeSync, syncInterval, performDifferentialSync);

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
    hasConflicts,
    canSync
  };
}
