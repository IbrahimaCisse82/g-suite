
import { useCallback, useEffect, useState } from 'react';
import { useAdvancedCache } from './useAdvancedCache';
import { useOptimizedQuery } from './useOptimizedQuery';

interface OptimizedDataConfig {
  cacheKey: string;
  cacheTTL?: number;
  retryAttempts?: number;
  retryDelay?: number;
  backgroundRefresh?: boolean;
}

export function useOptimizedData<T>(
  queryFn: () => Promise<T>,
  config: OptimizedDataConfig
) {
  const {
    cacheKey,
    cacheTTL = 5 * 60 * 1000, // 5 minutes
    retryAttempts = 3,
    retryDelay = 1000,
    backgroundRefresh = true
  } = config;

  const cache = useAdvancedCache<T>({
    defaultTTL: cacheTTL,
    persistToStorage: true
  });

  const [retryCount, setRetryCount] = useState(0);

  const queryWithRetry = useCallback(async (): Promise<T> => {
    try {
      const result = await queryFn();
      setRetryCount(0);
      return result;
    } catch (error) {
      if (retryCount < retryAttempts) {
        setRetryCount(prev => prev + 1);
        await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, retryCount)));
        return queryWithRetry();
      }
      throw error;
    }
  }, [queryFn, retryCount, retryAttempts, retryDelay]);

  const { data, isLoading, error, refetch } = useOptimizedQuery({
    queryKey: [cacheKey],
    queryFn: queryWithRetry,
    enableMemoryCache: true,
    enableSessionCache: true,
    cacheTTL,
    staleTime: cacheTTL / 2,
    refetchOnWindowFocus: false,
    retry: false // We handle retries manually
  });

  // Background refresh
  useEffect(() => {
    if (backgroundRefresh && data && !isLoading) {
      const interval = setInterval(() => {
        if (!document.hidden) {
          refetch();
        }
      }, cacheTTL);

      return () => clearInterval(interval);
    }
  }, [backgroundRefresh, data, isLoading, cacheTTL, refetch]);

  // Cache management
  useEffect(() => {
    if (data && !error) {
      cache.set(cacheKey, data, cacheTTL);
    }
  }, [data, error, cache, cacheKey, cacheTTL]);

  const retry = useCallback(() => {
    setRetryCount(0);
    refetch();
  }, [refetch]);

  const getCachedData = useCallback(() => {
    return cache.get(cacheKey);
  }, [cache, cacheKey]);

  const invalidateCache = useCallback(() => {
    cache.remove(cacheKey);
  }, [cache, cacheKey]);

  return {
    data,
    isLoading,
    error,
    retry,
    refetch,
    getCachedData,
    invalidateCache,
    retryCount
  };
}
