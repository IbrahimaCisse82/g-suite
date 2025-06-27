
import React from 'react';
import { BaseLayout } from './layout/BaseLayout';

interface OptimizedLayoutProps {
  children: React.ReactNode;
}

export const OptimizedLayout = ({ children }: OptimizedLayoutProps) => {
  return (
    <BaseLayout>
      {children}
    </BaseLayout>
  );
};
