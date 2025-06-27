
import { useEffect } from 'react';
import { useConnectivity } from '@/hooks/useConnectivity';
import { syncManager } from '@/services/syncManager';

export function useAutoSync(
  enableRealTimeSync: boolean,
  syncInterval: number,
  performDifferentialSync: (type: any, options?: any) => Promise<any>
) {
  const { isOnline } = useConnectivity();

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
}
