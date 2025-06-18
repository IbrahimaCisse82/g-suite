
import React from 'react';
import { AdminBackofficeNavigation } from './AdminBackofficeNavigation';

interface AdminBackofficeLayoutProps {
  children: React.ReactNode;
}

export const AdminBackofficeLayout = ({ children }: AdminBackofficeLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminBackofficeNavigation />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};
