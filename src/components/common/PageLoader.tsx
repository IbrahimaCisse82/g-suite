
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { Skeleton } from '@/components/ui/skeleton';

interface PageLoaderProps {
  type?: 'spinner' | 'skeleton';
  rows?: number;
  text?: string;
}

export const PageLoader = ({ 
  type = 'skeleton', 
  rows = 3, 
  text = 'Chargement...' 
}: PageLoaderProps) => {
  if (type === 'spinner') {
    return <LoadingSpinner fullScreen text={text} />;
  }

  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};
