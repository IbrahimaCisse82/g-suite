
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  return (
    <Card className={`bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`} style={style}>
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-readable-primary">
            {Icon && <Icon className="w-5 h-5 text-green-600" />}
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={loading ? 'animate-pulse' : ''}>
        {children}
      </CardContent>
    </Card>
  );
});

OptimizedCard.displayName = 'OptimizedCard';
