
import React, { memo } from 'react';
import { Card } from '@/components/ui/card';
import { usePerformance } from '@/hooks/usePerformance';

interface OptimizedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  trackRender?: boolean;
  componentName?: string;
  children?: React.ReactNode;
}

export const OptimizedCard = memo<OptimizedCardProps>(({ 
  trackRender = false, 
  componentName = 'OptimizedCard',
  children,
  ...props 
}) => {
  const { trackRender: performanceTrackRender } = usePerformance();

  React.useEffect(() => {
    if (trackRender) {
      performanceTrackRender(componentName);
    }
  }, [trackRender, componentName, performanceTrackRender]);

  return (
    <Card {...props}>
      {children}
    </Card>
  );
});

OptimizedCard.displayName = 'OptimizedCard';
