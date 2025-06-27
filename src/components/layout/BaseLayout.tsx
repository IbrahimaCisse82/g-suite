
import React, { useState, memo, useCallback, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { FastLink } from '../common/FastLink';
import { ConnectivityStatus } from '../common/ConnectivityStatus';
import { ConnectivityNotification } from '../common/ConnectivityNotification';
import { ConflictResolutionDialog } from '../common/ConflictResolutionDialog';
import { useFastNavigation } from '@/hooks/useFastNavigation';
import { useAdvancedSync } from '@/hooks/useAdvancedSync';
import { useSidebarState, useAppStore } from '@/stores/appStore';

interface BaseLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  showHeader?: boolean;
  showSidebar?: boolean;
}

const LazyContent = memo(({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
});

LazyContent.displayName = 'LazyContent';

export const BaseLayout = memo(({ 
  children, 
  showBackButton = true, 
  showHeader = true, 
  showSidebar = true 
}: BaseLayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const isSidebarCollapsed = useSidebarState();
  const { toggleSidebar } = useAppStore();
  const { preloadedRoutes } = useFastNavigation();
  const { conflicts, resolveConflict } = useAdvancedSync();

  const [selectedConflict, setSelectedConflict] = useState<any>(null);
  const [isConflictDialogOpen, setIsConflictDialogOpen] = useState(false);

  const isDashboard = location.pathname === '/dashboard';

  const handleSidebarToggle = useCallback(() => {
    toggleSidebar();
  }, [toggleSidebar]);

  const handleConflictSelect = useCallback((conflict: any) => {
    setSelectedConflict(conflict);
    setIsConflictDialogOpen(true);
  }, []);

  const handleConflictDialogClose = useCallback(() => {
    setIsConflictDialogOpen(false);
    setSelectedConflict(null);
  }, []);

  const BackToDashboardButton = memo(() => {
    if (isDashboard || !showBackButton) return null;
    
    return (
      <div className="px-6 py-3 border-b border-gray-200 bg-white">
        <FastLink to="/dashboard">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <LayoutDashboard className="w-4 h-4" />
            <span>Retour au Dashboard</span>
          </Button>
        </FastLink>
      </div>
    );
  });

  BackToDashboardButton.displayName = 'BackToDashboardButton';

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Notifications de connectivité */}
      <ConnectivityNotification />
      
      {/* Dialog de résolution de conflits */}
      <ConflictResolutionDialog
        conflict={selectedConflict}
        isOpen={isConflictDialogOpen}
        onClose={handleConflictDialogClose}
        onResolve={resolveConflict}
      />
      
      {/* Debug info pour voir les routes préchargées */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-2 right-2 z-50 bg-green-100 p-2 rounded text-xs">
          Routes préchargées: {preloadedRoutes.length}
          {conflicts.length > 0 && (
            <div className="text-orange-600 font-medium">
              Conflits: {conflicts.length}
            </div>
          )}
        </div>
      )}
      
      {showSidebar && (
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={handleSidebarToggle}
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        {showHeader && (
          <div className="flex items-center justify-between bg-white border-b px-4 py-2">
            <Header />
            <div className="flex items-center space-x-3">
              <ConnectivityStatus compact />
              {conflicts.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConflictSelect(conflicts[0])}
                  className="text-orange-600 border-orange-300"
                >
                  {conflicts.length} Conflit{conflicts.length > 1 ? 's' : ''}
                </Button>
              )}
            </div>
          </div>
        )}
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

BaseLayout.displayName = 'BaseLayout';
