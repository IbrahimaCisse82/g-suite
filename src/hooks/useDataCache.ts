
import { useState, useEffect, useRef } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class DataCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  clear(): void {
    this.cache.clear();
  }

  clearExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

const globalCache = new DataCache();

export const useDataCache = <T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl?: number
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const loadData = async () => {
      // Annuler la requête précédente si elle existe
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Vérifier le cache d'abord
      const cachedData = globalCache.get<T>(key);
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }

      // Créer un nouveau contrôleur d'annulation
      abortControllerRef.current = new AbortController();

      try {
        setLoading(true);
        setError(null);
        
        const result = await fetchFn();
        
        // Vérifier si la requête n'a pas été annulée
        if (!abortControllerRef.current.signal.aborted) {
          globalCache.set(key, result, ttl);
          setData(result);
        }
      } catch (err) {
        if (!abortControllerRef.current.signal.aborted) {
          setError(err as Error);
        }
      } finally {
        if (!abortControllerRef.current.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();

    // Nettoyage
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [key, fetchFn, ttl]);

  const invalidate = () => {
    globalCache.clear();
    setData(null);
    setLoading(true);
  };

  return { data, loading, error, invalidate };
};

export { globalCache };
