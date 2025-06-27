
import React from 'react';
import { BaseLayout } from './layout/BaseLayout';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <BaseLayout>
      {children}
    </BaseLayout>
  );
};
