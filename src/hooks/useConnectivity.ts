
import { useState, useEffect, useCallback } from 'react';

interface ConnectivityState {
  isOnline: boolean;
  lastOnlineTime: number | null;
  connectionType: string;
}

export const useConnectivity = () => {
  const [connectivity, setConnectivity] = useState<ConnectivityState>({
    isOnline: navigator.onLine,
    lastOnlineTime: navigator.onLine ? Date.now() : null,
    connectionType: 'unknown'
  });

  const [offlineDuration, setOfflineDuration] = useState<number>(0);

  const updateConnectionInfo = useCallback(() => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const connectionType = connection ? connection.effectiveType || connection.type || 'unknown' : 'unknown';
    
    return connectionType;
  }, []);

  const handleOnline = useCallback(() => {
    const connectionType = updateConnectionInfo();
    
    setConnectivity(prev => ({
      isOnline: true,
      lastOnlineTime: Date.now(),
      connectionType
    }));
    
    setOfflineDuration(0);
    
    // Déclencher un événement personnalisé pour la synchronisation
    window.dispatchEvent(new CustomEvent('connectivity-restored'));
  }, [updateConnectionInfo]);

  const handleOffline = useCallback(() => {
    setConnectivity(prev => ({
      ...prev,
      isOnline: false
    }));
  }, []);

  const fetchWithTimeout = useCallback(async (url: string, timeout: number = 3000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method: 'HEAD',
        cache: 'no-cache',
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }, []);

  useEffect(() => {
    // Écouter les événements de connectivité
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Calculer la durée hors ligne
    let interval: NodeJS.Timeout;
    if (!connectivity.isOnline && connectivity.lastOnlineTime) {
      interval = setInterval(() => {
        setOfflineDuration(Date.now() - connectivity.lastOnlineTime!);
      }, 1000);
    }

    // Vérification périodique de la connectivité réelle
    const connectivityCheck = setInterval(async () => {
      if (navigator.onLine) {
        try {
          // Test avec une requête légère vers notre API
          const response = await fetchWithTimeout('/api/health');
          
          if (!connectivity.isOnline && response.ok) {
            handleOnline();
          }
        } catch (error) {
          if (connectivity.isOnline) {
            handleOffline();
          }
        }
      }
    }, 10000); // Vérification toutes les 10 secondes

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (interval) clearInterval(interval);
      clearInterval(connectivityCheck);
    };
  }, [connectivity.isOnline, connectivity.lastOnlineTime, handleOnline, handleOffline, fetchWithTimeout]);

  const getOfflineDurationText = useCallback(() => {
    if (connectivity.isOnline || !offlineDuration) return null;
    
    const seconds = Math.floor(offlineDuration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }, [connectivity.isOnline, offlineDuration]);

  return {
    ...connectivity,
    offlineDuration: getOfflineDurationText(),
    refresh: () => {
      const connectionType = updateConnectionInfo();
      setConnectivity(prev => ({ ...prev, connectionType }));
    }
  };
};
