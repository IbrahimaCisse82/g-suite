
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingSpinner } from './LoadingSpinner';

interface LazyLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rows?: number;
  type?: 'skeleton' | 'spinner';
}

export const LazyLoader = ({ 
  children, 
  fallback, 
  rows = 3, 
  type = 'skeleton' 
}: LazyLoaderProps) => {
  const skeletonFallback = (
    <div className="space-y-4 p-6 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );

  const spinnerFallback = (
    <div className="flex items-center justify-center p-8">
      <LoadingSpinner size="lg" text="Chargement..." />
    </div>
  );

  const defaultFallback = type === 'spinner' ? spinnerFallback : skeletonFallback;

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};
