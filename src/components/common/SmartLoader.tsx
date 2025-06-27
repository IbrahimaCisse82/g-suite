
import React, { useState, useEffect, memo } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SmartLoaderProps {
  isLoading: boolean;
  error?: Error | null;
  skeleton?: boolean;
  rows?: number;
  onRetry?: () => void;
  timeout?: number;
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

export const SmartLoader = memo<SmartLoaderProps>(({
  isLoading,
  error,
  skeleton = true,
  rows = 3,
  onRetry,
  timeout = 10000,
  children,
  fallback
}) => {
  const [showTimeout, setShowTimeout] = useState(false);

  useEffect(() => {
    if (isLoading && timeout > 0) {
      const timer = setTimeout(() => {
        setShowTimeout(true);
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [isLoading, timeout]);

  useEffect(() => {
    if (!isLoading) {
      setShowTimeout(false);
    }
  }, [isLoading]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Une erreur s'est produite
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {error.message || 'Erreur inattendue lors du chargement'}
          </p>
          {onRetry && (
            <Button onClick={onRetry} variant="outline" size="sm">
              Réessayer
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (isLoading) {
    if (showTimeout) {
      return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
          <LoadingSpinner size="lg" />
          <div className="text-center">
            <p className="text-sm text-amber-600 mb-2">
              Le chargement prend plus de temps que prévu...
            </p>
            {onRetry && (
              <Button onClick={onRetry} variant="outline" size="sm">
                Réessayer
              </Button>
            )}
          </div>
        </div>
      );
    }

    if (skeleton) {
      return (
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
    }

    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" text="Chargement..." />
      </div>
    );
  }

  return <>{children || fallback}</>;
});

SmartLoader.displayName = 'SmartLoader';
