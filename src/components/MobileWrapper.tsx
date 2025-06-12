
import React from 'react';
import { useIsNativeApp } from '@/hooks/use-mobile';

interface MobileWrapperProps {
  children: React.ReactNode;
}

export const MobileWrapper = ({ children }: MobileWrapperProps) => {
  const isNativeApp = useIsNativeApp();

  return (
    <div className={`
      ${isNativeApp ? 'safe-area-top safe-area-bottom' : ''}
      min-h-screen
    `}>
      {children}
    </div>
  );
};
