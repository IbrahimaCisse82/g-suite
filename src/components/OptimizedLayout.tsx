
import React, { useState, memo, useCallback, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuthentication } from '@/hooks/useAdminAuthentication';
import { LoadingSpinner } from './common/LoadingSpinner';
import { UltraFastLink } from './common/UltraFastLink';
import { useUltraFastNavigation } from '@/hooks/useUltraFastNavigation';
import { useSidebarState, useAppStore } from '@/stores/appStore';

interface OptimizedLayoutProps {
  children: React.ReactNode;
}

const LazyContent = memo(({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
});

LazyContent.displayName = 'LazyContent';

export const OptimizedLayout = memo(({ children }: OptimizedLayoutProps) => {
  const { user } = useAuth();
  const { isAuthenticated: isAdmin } = useAdminAuthentication();
  const location = useLocation();
  const isSidebarCollapsed = useSidebarState();
  const { toggleSidebar } = useAppStore();
  const { preloadedRoutes } = useUltraFastNavigation();

  const shouldShowSidebar = true;
  const isDashboard = location.pathname === '/dashboard';

  const handleSidebarToggle = useCallback(() => {
    toggleSidebar();
  }, [toggleSidebar]);

  const BackToDashboardButton = memo(() => {
    if (isDashboard) return null;
    
    return (
      <div className="px-6 py-3 border-b border-gray-200 bg-white">
        <UltraFastLink to="/dashboard">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <LayoutDashboard className="w-4 h-4" />
            <span>Retour au Dashboard</span>
          </Button>
        </UltraFastLink>
      </div>
    );
  });

  BackToDashboardButton.displayName = 'BackToDashboardButton';

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Debug info pour voir les routes préchargées */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-2 right-2 z-50 bg-green-100 p-2 rounded text-xs">
          Routes préchargées: {preloadedRoutes.length}
        </div>
      )}
      
      {shouldShowSidebar && (
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={handleSidebarToggle}
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <BackToDashboardButton />
        <main className="flex-1 overflow-auto">
          <Suspense fallback={<LoadingSpinner fullScreen text="Navigation ultra-rapide..." />}>
            <LazyContent>{children}</LazyContent>
          </Suspense>
        </main>
      </div>
    </div>
  );
});

OptimizedLayout.displayName = 'OptimizedLayout';
