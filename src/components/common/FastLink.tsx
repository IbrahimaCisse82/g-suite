
import React, { useCallback } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useFastNavigation } from '@/hooks/useFastNavigation';
import { cn } from '@/lib/utils';

interface FastLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  prefetch?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const FastLink = React.memo(({ 
  to, 
  prefetch = true, 
  className, 
  children, 
  ...props 
}: FastLinkProps) => {
  const { navigate, prefetchOnHover } = useFastNavigation();

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
        'transition-transform duration-75 hover:scale-[1.02]',
        'focus:outline-none focus:ring-1 focus:ring-green-500',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
});

FastLink.displayName = 'FastLink';
