
import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePerformance } from '@/hooks/usePerformance';

interface OptimizedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  trackRender?: boolean;
  componentName?: string;
  children?: React.ReactNode;
  title?: string;
  icon?: React.ComponentType<any>;
}

export const OptimizedCard = memo<OptimizedCardProps>(({ 
  trackRender = false, 
  componentName = 'OptimizedCard',
  children,
  title,
  icon: Icon,
  ...props 
}) => {
  const { trackRender: performanceTrackRender } = usePerformance();

  React.useEffect(() => {
    if (trackRender) {
      performanceTrackRender(componentName);
    }
  }, [trackRender, componentName, performanceTrackRender]);

  if (title || Icon) {
    return (
      <Card {...props}>
        {(title || Icon) && (
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              {Icon && (
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              )}
              {title && (
                <CardTitle className="text-lg text-readable-primary">
                  {title}
                </CardTitle>
              )}
            </div>
          </CardHeader>
        )}
        <CardContent>
          {children}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card {...props}>
      {children}
    </Card>
  );
});

OptimizedCard.displayName = 'OptimizedCard';
