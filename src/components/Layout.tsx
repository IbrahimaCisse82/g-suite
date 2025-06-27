
import React, { useState, memo, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuthentication } from '@/hooks/useAdminAuthentication';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = memo(({ children }: LayoutProps) => {
  const { user } = useAuth();
  const { isAuthenticated: isAdmin } = useAdminAuthentication();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const shouldShowSidebar = true;
  const isDashboard = location.pathname === '/dashboard';

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {shouldShowSidebar && (
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={toggleSidebar}
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Bouton retour au Dashboard optimisé */}
        {!isDashboard && (
          <div className="px-6 py-3 border-b border-gray-200 bg-white animate-fade-in">
            <Link to="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-200 hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4" />
                <LayoutDashboard className="w-4 h-4" />
                <span>Retour au Dashboard</span>
              </Button>
            </Link>
          </div>
        )}
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';
