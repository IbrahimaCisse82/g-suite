
import { useQuery, UseQueryOptions, QueryFunction } from '@tanstack/react-query';
import { usePerformance } from './usePerformance';
import { useAdvancedPerformance } from './useAdvancedPerformance';
import { memoryCache, sessionCache } from '@/utils/cache';

interface OptimizedQueryOptions<T> extends Omit<UseQueryOptions<T>, 'gcTime'> {
  enableMemoryCache?: boolean;
  enableSessionCache?: boolean;
  cacheTTL?: number;
  context?: string;
  gcTime?: number;
}

export function useOptimizedQuery<T>(
  options: OptimizedQueryOptions<T>
) {
  const { measureOperation } = usePerformance(options.context);
  const { trackNetworkRequest, trackCacheHit, trackCacheMiss } = useAdvancedPerformance(
    options.context || 'OptimizedQuery'
  );
  
  const {
    enableMemoryCache = true,
    enableSessionCache = false,
    cacheTTL = 5 * 60 * 1000,
    queryKey,
    queryFn,
    gcTime,
    ...queryOptions
  } = options;

  const cacheKey = Array.isArray(queryKey) ? queryKey.join('_') : String(queryKey);

  // Enhanced query function with caching
  const enhancedQueryFn: QueryFunction<T> = async (context) => {
    const endMeasure = measureOperation(`query_${cacheKey}`);

    try {
      // Check memory cache first
      if (enableMemoryCache) {
        const cached = memoryCache.get<T>(cacheKey);
        if (cached) {
          console.log(`📦 Memory cache hit: ${cacheKey}`);
          trackCacheHit();
          endMeasure();
          return cached;
        }
      }

      // Check session cache
      if (enableSessionCache) {
        const cached = sessionCache.get<T>(cacheKey);
        if (cached) {
          console.log(`💾 Session cache hit: ${cacheKey}`);
          trackCacheHit();
          // Also update memory cache
          if (enableMemoryCache) {
            memoryCache.set(cacheKey, cached, cacheTTL);
          }
          endMeasure();
          return cached;
        }
      }

      // Track cache miss
      trackCacheMiss();
      trackNetworkRequest();

      // Fetch data - ensure queryFn is callable
      if (!queryFn || typeof queryFn !== 'function') {
        throw new Error('Query function is required and must be callable');
      }
      
      const data = await queryFn(context);

      // Cache the result
      if (enableMemoryCache) {
        memoryCache.set(cacheKey, data, cacheTTL);
      }
      if (enableSessionCache) {
        sessionCache.set(cacheKey, data, cacheTTL);
      }

      return data;
    } finally {
      endMeasure();
    }
  };

  return useQuery({
    queryKey,
    queryFn: enhancedQueryFn,
    staleTime: cacheTTL / 2, // Consider data stale after half the cache TTL
    gcTime: gcTime || cacheTTL,
    ...queryOptions
  });
}
