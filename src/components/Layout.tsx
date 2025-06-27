
import React, { useState, memo, useCallback, Suspense } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuthentication } from '@/hooks/useAdminAuthentication';
import { LoadingSpinner } from './common/LoadingSpinner';

interface LayoutProps {
  children: React.ReactNode;
}

const LazyContent = memo(({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
});

LazyContent.displayName = 'LazyContent';

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

  const BackToDashboardButton = memo(() => {
    if (isDashboard) return null;
    
    return (
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
    );
  });

  BackToDashboardButton.displayName = 'BackToDashboardButton';

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
        <BackToDashboardButton />
        <main className="flex-1 overflow-auto">
          <Suspense fallback={<LoadingSpinner fullScreen text="Chargement de la page..." />}>
            <LazyContent>{children}</LazyContent>
          </Suspense>
        </main>
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';
