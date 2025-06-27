
import React, { useCallback } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useOptimizedNavigation } from '@/hooks/useOptimizedNavigation';
import { cn } from '@/lib/utils';

interface OptimizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  prefetch?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const OptimizedLink = React.memo(({ 
  to, 
  prefetch = true, 
  className, 
  children, 
  ...props 
}: OptimizedLinkProps) => {
  const { navigate, prefetchOnHover } = useOptimizedNavigation();

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
  }, [navigate, to]);

  const handleMouseEnter = useCallback(() => {
    if (prefetch) {
      prefetchOnHover(to);
    }
  }, [prefetch, prefetchOnHover, to]);

  return (
    <Link
      to={to}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={cn(
        'transition-all duration-200 ease-out hover:scale-105',
        'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
});

OptimizedLink.displayName = 'OptimizedLink';
