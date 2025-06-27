
import React, { memo, Suspense, lazy } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePerformance } from '@/hooks/usePerformance';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface OptimizedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  trackRender?: boolean;
  componentName?: string;
  children?: React.ReactNode;
  title?: string;
  icon?: React.ComponentType<any>;
  lazyLoad?: boolean;
  priority?: 'high' | 'medium' | 'low';
  preload?: boolean;
}

const LazyCardContent = lazy(() => 
  Promise.resolve({ 
    default: ({ children }: { children: React.ReactNode }) => <>{children}</> 
  })
);

export const OptimizedCard = memo<OptimizedCardProps>(({ 
  trackRender = false, 
  componentName = 'OptimizedCard',
  children,
  title,
  icon: Icon,
  lazyLoad = false,
  priority = 'medium',
  preload = false,
  ...props 
}) => {
  const { trackRender: performanceTrackRender } = usePerformance();
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: preload ? '200px' : '50px'
  });

  React.useEffect(() => {
    if (trackRender) {
      performanceTrackRender(componentName);
    }
  }, [trackRender, componentName, performanceTrackRender]);

  const shouldRender = !lazyLoad || isIntersecting;

  const cardContent = (
    <>
      {(title || Icon) && (
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className={`w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                priority === 'high' ? 'hover:scale-110' : 'hover:scale-105'
              }`}>
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
        {shouldRender && (
          lazyLoad ? (
            <Suspense fallback={
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            }>
              <LazyCardContent>{children}</LazyCardContent>
            </Suspense>
          ) : (
            children
          )
        )}
      </CardContent>
    </>
  );

  return (
    <Card 
      ref={ref} 
      className={`transition-all duration-300 ${
        priority === 'high' ? 'shadow-lg hover:shadow-xl' : 
        priority === 'medium' ? 'hover:shadow-md' : 
        'hover:shadow-sm'
      } ${!shouldRender ? 'min-h-[200px]' : ''}`}
      {...props}
    >
      {title || Icon ? cardContent : children}
    </Card>
  );
});

OptimizedCard.displayName = 'OptimizedCard';
