
import { useQuery, UseQueryOptions, QueryFunction } from '@tanstack/react-query';

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
  const {
    enableMemoryCache = true,
    enableSessionCache = false,
    cacheTTL = 5 * 60 * 1000,
    queryKey,
    queryFn,
    gcTime,
    ...queryOptions
  } = options;

  // Simplify for now to avoid cache-related state issues
  const enhancedQueryFn: QueryFunction<T> = async (context) => {
    if (!queryFn || typeof queryFn !== 'function') {
      throw new Error('Query function is required and must be callable');
    }
    
    return await queryFn(context);
  };

  return useQuery({
    queryKey,
    queryFn: enhancedQueryFn,
    staleTime: cacheTTL / 2,
    gcTime: gcTime || cacheTTL,
    ...queryOptions
  });
}
