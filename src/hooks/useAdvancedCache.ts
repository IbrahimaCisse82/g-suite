
import { useState, useEffect, useCallback, useRef } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

interface CacheConfig {
  maxSize?: number;
  defaultTTL?: number;
  persistToStorage?: boolean;
}

export function useAdvancedCache<T>(config: CacheConfig = {}) {
  const {
    maxSize = 100,
    defaultTTL = 5 * 60 * 1000, // 5 minutes
    persistToStorage = false
  } = config;

  const cache = useRef<Map<string, CacheEntry<T>>>(new Map());
  const [cacheSize, setCacheSize] = useState(0);

  // Load from localStorage on mount if persistence is enabled
  useEffect(() => {
    if (persistToStorage) {
      try {
        const stored = localStorage.getItem('gsuite-cache');
        if (stored) {
          const parsedCache = JSON.parse(stored);
          Object.entries(parsedCache).forEach(([key, entry]) => {
            cache.current.set(key, entry as CacheEntry<T>);
          });
          setCacheSize(cache.current.size);
        }
      } catch (error) {
        console.warn('Failed to load cache from localStorage:', error);
      }
    }
  }, [persistToStorage]);

  // Save to localStorage when cache changes
  const persistCache = useCallback(() => {
    if (persistToStorage) {
      try {
        const cacheObj = Object.fromEntries(cache.current);
        localStorage.setItem('gsuite-cache', JSON.stringify(cacheObj));
      } catch (error) {
        console.warn('Failed to persist cache to localStorage:', error);
      }
    }
  }, [persistToStorage]);

  const set = useCallback((key: string, data: T, ttl?: number) => {
    const expiry = Date.now() + (ttl || defaultTTL);
    
    // Clean expired entries if cache is at max size
    if (cache.current.size >= maxSize) {
      cleanExpired();
      
      // If still at max size, remove oldest entry
      if (cache.current.size >= maxSize) {
        const oldestKey = cache.current.keys().next().value;
        cache.current.delete(oldestKey);
      }
    }

    cache.current.set(key, { data, timestamp: Date.now(), expiry });
    setCacheSize(cache.current.size);
    persistCache();
  }, [defaultTTL, maxSize, persistCache]);

  const get = useCallback((key: string): T | null => {
    const entry = cache.current.get(key);
    
    if (!entry) return null;
    
    if (Date.now() > entry.expiry) {
      cache.current.delete(key);
      setCacheSize(cache.current.size);
      persistCache();
      return null;
    }
    
    return entry.data;
  }, [persistCache]);

  const remove = useCallback((key: string) => {
    const deleted = cache.current.delete(key);
    if (deleted) {
      setCacheSize(cache.current.size);
      persistCache();
    }
    return deleted;
  }, [persistCache]);

  const clear = useCallback(() => {
    cache.current.clear();
    setCacheSize(0);
    if (persistToStorage) {
      localStorage.removeItem('gsuite-cache');
    }
  }, [persistToStorage]);

  const cleanExpired = useCallback(() => {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    cache.current.forEach((entry, key) => {
      if (now > entry.expiry) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => cache.current.delete(key));
    
    if (keysToDelete.length > 0) {
      setCacheSize(cache.current.size);
      persistCache();
    }
    
    return keysToDelete.length;
  }, [persistCache]);

  const has = useCallback((key: string): boolean => {
    const entry = cache.current.get(key);
    if (!entry) return false;
    
    if (Date.now() > entry.expiry) {
      cache.current.delete(key);
      setCacheSize(cache.current.size);
      persistCache();
      return false;
    }
    
    return true;
  }, [persistCache]);

  const getStats = useCallback(() => {
    const now = Date.now();
    let validEntries = 0;
    let expiredEntries = 0;
    
    cache.current.forEach((entry) => {
      if (now > entry.expiry) {
        expiredEntries++;
      } else {
        validEntries++;
      }
    });
    
    return {
      size: cache.current.size,
      validEntries,
      expiredEntries,
      hitRate: validEntries / (validEntries + expiredEntries) || 0
    };
  }, []);

  return {
    set,
    get,
    remove,
    clear,
    has,
    cleanExpired,
    getStats,
    size: cacheSize
  };
}
