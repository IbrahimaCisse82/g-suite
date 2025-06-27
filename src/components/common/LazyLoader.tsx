
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rows?: number;
}

export const LazyLoader = ({ children, fallback, rows = 3 }: LazyLoaderProps) => {
  const defaultFallback = (
    <div className="space-y-4 p-6">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};
