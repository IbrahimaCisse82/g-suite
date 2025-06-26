
import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuthentication } from '@/hooks/useAdminAuthentication';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();
  const { isAuthenticated: isAdmin } = useAdminAuthentication();

  // Afficher la sidebar si l'utilisateur est connecté OU si c'est un admin
  const shouldShowSidebar = user || isAdmin;

  return (
    <div className="flex h-screen bg-gray-50">
      {shouldShowSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
