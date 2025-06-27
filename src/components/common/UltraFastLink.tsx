
import React, { useCallback } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useUltraFastNavigation } from '@/hooks/useUltraFastNavigation';
import { cn } from '@/lib/utils';

interface UltraFastLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export const UltraFastLink = React.memo(({ 
  to, 
  className, 
  children, 
  ...props 
}: UltraFastLinkProps) => {
  const { navigate } = useUltraFastNavigation();

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
  }, [navigate, to]);

  return (
    <Link
      to={to}
      onClick={handleClick}
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

UltraFastLink.displayName = 'UltraFastLink';
