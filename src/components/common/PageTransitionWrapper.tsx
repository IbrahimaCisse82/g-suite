
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsNavigating } from '@/stores/appStore';
import { cn } from '@/lib/utils';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransitionWrapper = ({ children, className }: PageTransitionWrapperProps) => {
  const location = useLocation();
  const isNavigating = useIsNavigating();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'idle' | 'exiting' | 'entering'>('idle');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('exiting');
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === 'exiting') {
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('entering');
      }, 150); // Durée de la transition de sortie

      return () => clearTimeout(timer);
    } else if (transitionStage === 'entering') {
      const timer = setTimeout(() => {
        setTransitionStage('idle');
      }, 150); // Durée de la transition d'entrée

      return () => clearTimeout(timer);
    }
  }, [transitionStage, location]);

  const getTransitionClasses = () => {
    switch (transitionStage) {
      case 'exiting':
        return 'opacity-0 transform translate-x-4';
      case 'entering':
        return 'opacity-0 transform -translate-x-4';
      default:
        return 'opacity-100 transform translate-x-0';
    }
  };

  return (
    <div
      className={cn(
        'transition-all duration-150 ease-out',
        getTransitionClasses(),
        isNavigating && 'pointer-events-none',
        className
      )}
      key={displayLocation.pathname}
    >
      {children}
    </div>
  );
};
