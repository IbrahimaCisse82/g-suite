
import React from 'react';
import { EnterpriseHeader } from './enterprise/EnterpriseHeader';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-background">
      <EnterpriseHeader />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};
