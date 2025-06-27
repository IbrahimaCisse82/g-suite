
import { useState, useEffect, useCallback } from 'react';
import { offlineStorage } from '@/services/offlineStorage';
import { useConnectivity } from './useConnectivity';

interface UseOfflineDataOptions<T> {
  type: 'contact' | 'invoice' | 'product' | 'employee' | 'budget' | 'treasury';
  onlineQueryFn: () => Promise<T[]>;
  syncEndpoint?: string;
  enableAutoSync?: boolean;
}

export function useOfflineData<T extends { id: string }>(options: UseOfflineDataOptions<T>) {
  const { type, onlineQueryFn, syncEndpoint, enableAutoSync = true } = options;
  const { isOnline } = useConnectivity();
  
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);

  // Charger les données (online ou offline)
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (isOnline) {
        // Mode online : récupérer depuis l'API
        const onlineData = await onlineQueryFn();
        setData(onlineData);
        
        // Mettre en cache pour usage offline
        for (const item of onlineData) {
          await offlineStorage.saveOfflineData(type, item.id, item, 'update');
        }
      } else {
        // Mode offline : récupérer depuis IndexedDB
        const offlineData = await offlineStorage.getOfflineData(type);
        const parsedData = offlineData.map(item => item.data as T);
        setData(parsedData);
      }
    } catch (err) {
      setError(err as Error);
      
      // En cas d'erreur online, essayer de récupérer les données offline
      if (isOnline) {
        try {
          const offlineData = await offlineStorage.getOfflineData(type);
          const parsedData = offlineData.map(item => item.data as T);
          setData(parsedData);
        } catch (offlineErr) {
          console.error('Erreur lors du chargement offline:', offlineErr);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [type, onlineQueryFn, isOnline]);

  // Compter les éléments en attente de synchronisation
  const updatePendingCount = useCallback(async () => {
    try {
      const offlineData = await offlineStorage.getOfflineData(type);
      const pendingCount = offlineData.filter(item => item.syncStatus === 'pending').length;
      setPendingSyncCount(pendingCount);
    } catch (err) {
      console.error('Erreur lors du comptage des éléments en attente:', err);
    }
  }, [type]);

  // Ajouter un élément (online ou offline)
  const addItem = useCallback(async (item: Omit<T, 'id'>) => {
    const newItem = { ...item, id: `temp_${Date.now()}` } as T;
    
    try {
      if (isOnline && syncEndpoint) {
        // Mode online : envoyer à l'API
        // Note: Ici vous devriez implémenter l'appel API réel
        setData(prev => [...prev, newItem]);
      } else {
        // Mode offline : sauvegarder localement
        await offlineStorage.saveOfflineData(type, newItem.id, newItem, 'create');
        if (syncEndpoint) {
          await offlineStorage.addToSyncQueue(syncEndpoint, 'POST', newItem);
        }
        setData(prev => [...prev, newItem]);
        await updatePendingCount();
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [isOnline, type, syncEndpoint, updatePendingCount]);

  // Mettre à jour un élément
  const updateItem = useCallback(async (id: string, updates: Partial<T>) => {
    try {
      const updatedItem = data.find(item => item.id === id);
      if (!updatedItem) throw new Error('Item not found');

      const newItem = { ...updatedItem, ...updates };

      if (isOnline && syncEndpoint) {
        // Mode online : envoyer à l'API
        setData(prev => prev.map(item => item.id === id ? newItem : item));
      } else {
        // Mode offline : sauvegarder localement
        await offlineStorage.saveOfflineData(type, id, newItem, 'update');
        if (syncEndpoint) {
          await offlineStorage.addToSyncQueue(`${syncEndpoint}/${id}`, 'PUT', newItem);
        }
        setData(prev => prev.map(item => item.id === id ? newItem : item));
        await updatePendingCount();
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [data, isOnline, type, syncEndpoint, updatePendingCount]);

  // Supprimer un élément
  const deleteItem = useCallback(async (id: string) => {
    try {
      if (isOnline && syncEndpoint) {
        // Mode online : supprimer via l'API
        setData(prev => prev.filter(item => item.id !== id));
      } else {
        // Mode offline : marquer pour suppression
        await offlineStorage.saveOfflineData(type, id, { id }, 'delete');
        if (syncEndpoint) {
          await offlineStorage.addToSyncQueue(`${syncEndpoint}/${id}`, 'DELETE', null);
        }
        setData(prev => prev.filter(item => item.id !== id));
        await updatePendingCount();
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [isOnline, type, syncEndpoint, updatePendingCount]);

  // Synchroniser les données en attente
  const syncPendingData = useCallback(async () => {
    if (!isOnline || !syncEndpoint) return;

    try {
      const syncQueue = await offlineStorage.getSyncQueue();
      const relevantItems = syncQueue.filter(item => 
        item.endpoint.includes(syncEndpoint.split('/').pop() || '')
      );

      for (const item of relevantItems) {
        try {
          // Ici vous devriez implémenter les appels API réels
          console.log(`Syncing: ${item.method} ${item.endpoint}`, item.data);
          
          // Simuler la synchronisation
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Supprimer de la queue après succès
          await offlineStorage.removeFromSyncQueue(item.id);
        } catch (syncError) {
          // Incrémenter le compteur de retry
          await offlineStorage.updateSyncQueueItem(item.id, {
            retryCount: item.retryCount + 1
          });
          
          // Si max retries atteint, garder mais marquer comme échoué
          if (item.retryCount >= item.maxRetries) {
            console.error('Max retries reached for item:', item.id);
          }
        }
      }

      await updatePendingCount();
    } catch (err) {
      console.error('Erreur lors de la synchronisation:', err);
    }
  }, [isOnline, syncEndpoint, updatePendingCount]);

  // Charger les données au montage et quand la connectivité change
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Synchroniser automatiquement quand on repasse online
  useEffect(() => {
    if (isOnline && enableAutoSync) {
      syncPendingData();
    }
  }, [isOnline, enableAutoSync, syncPendingData]);

  // Mettre à jour le compteur des éléments en attente
  useEffect(() => {
    updatePendingCount();
  }, [updatePendingCount]);

  return {
    data,
    isLoading,
    error,
    pendingSyncCount,
    addItem,
    updateItem,
    deleteItem,
    syncPendingData,
    refetch: loadData
  };
}
