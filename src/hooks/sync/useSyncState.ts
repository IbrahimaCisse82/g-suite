
import { useState, useCallback } from 'react';
import { SyncResult, SyncConflict, SyncStrategy } from '@/services/syncManager';

export interface SyncState {
  isSyncing: boolean;
  syncResult: SyncResult | null;
  conflicts: SyncConflict[];
  strategies: SyncStrategy[];
  syncProgress: {
    current: number;
    total: number;
    phase: string;
  };
}

export function useSyncState() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [conflicts, setConflicts] = useState<SyncConflict[]>([]);
  const [strategies, setStrategies] = useState<SyncStrategy[]>([]);
  const [syncProgress, setSyncProgress] = useState<{
    current: number;
    total: number;
    phase: string;
  }>({ current: 0, total: 0, phase: 'idle' });

  const updateSyncProgress = useCallback((current: number, total: number, phase: string) => {
    setSyncProgress({ current, total, phase });
  }, []);

  const resetSyncProgress = useCallback(() => {
    setTimeout(() => {
      setSyncProgress({ current: 0, total: 0, phase: 'idle' });
    }, 2000);
  }, []);

  return {
    // State
    isSyncing,
    syncResult,
    conflicts,
    strategies,
    syncProgress,
    
    // Setters
    setIsSyncing,
    setSyncResult,
    setConflicts,
    setStrategies,
    updateSyncProgress,
    resetSyncProgress,
  };
}
