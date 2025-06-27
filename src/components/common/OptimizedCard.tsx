
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export const OptimizedCard = React.memo(({ 
  title, 
  children, 
  className = '', 
  style,
  loading = false,
  icon: Icon 
}: OptimizedCardProps) => {
  if (loading) {
    return (
      <Card className={`bg-white shadow-sm border-gray-200 ${className}`} style={style}>
        {title && (
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-6 w-32" />
            </div>
          </CardHeader>
        )}
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={`bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border-gray-200 ${className}`} 
      style={style}
    >
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-gray-800">
            {Icon && <Icon className="w-5 h-5 text-green-600" />}
            <span className="font-semibold">{title}</span>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
});

OptimizedCard.displayName = 'OptimizedCard';
