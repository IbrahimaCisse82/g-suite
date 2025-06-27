
import { useCallback } from 'react';
import { SyncConflict, SyncStrategy } from '@/services/syncManager';
import { toast } from 'sonner';

export function useSyncConflicts(
  conflicts: SyncConflict[],
  setConflicts: (conflicts: SyncConflict[]) => void,
  strategies: SyncStrategy[]
) {
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
      
      // Fix: Filter conflicts directly instead of using a function
      const updatedConflicts = conflicts.filter(c => c.id !== conflict.id);
      setConflicts(updatedConflicts);
      
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
  }, [strategies, setConflicts, conflicts]);

  return {
    resolveConflict,
    hasConflicts: conflicts.length > 0,
  };
}
