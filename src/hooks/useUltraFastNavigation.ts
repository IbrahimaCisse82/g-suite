
import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';

// Prefetch strategy agressive
const PREFETCH_ALL_ROUTES = [
  '/dashboard', '/contacts', '/invoicing', '/products', '/employees',
  '/budget', '/reports', '/analytics', '/treasury', '/accounting',
  '/quotes', '/purchases', '/stock', '/settings'
];

// Cache des composants
const componentCache = new Map();

export const useUltraFastNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRoute, setNavigating, addCachedRoute, cachedRoutes } = useAppStore();

  // Preload TOUS les composants critiques au démarrage
  useEffect(() => {
    const preloadAllRoutes = async () => {
      const promises = PREFETCH_ALL_ROUTES.map(async (route) => {
        if (!cachedRoutes.has(route)) {
          try {
            let component;
            switch (route) {
              case '/dashboard':
                component = await import('@/pages/Dashboard');
                break;
              case '/contacts':
                component = await import('@/pages/Contacts');
                break;
              case '/invoicing':
                component = await import('@/pages/Invoicing');
                break;
              case '/products':
                component = await import('@/pages/Products');
                break;
              case '/employees':
                component = await import('@/pages/Employees');
                break;
              case '/budget':
                component = await import('@/pages/Budget');
                break;
              case '/reports':
                component = await import('@/pages/Reports');
                break;
              case '/analytics':
                component = await import('@/pages/Analytics');
                break;
              case '/treasury':
                component = await import('@/pages/Treasury');
                break;
              case '/accounting':
                component = await import('@/pages/Accounting');
                break;
              case '/quotes':
                component = await import('@/pages/Quotes');
                break;
              case '/purchases':
                component = await import('@/pages/Purchases');
                break;
              case '/stock':
                component = await import('@/pages/Stock');
                break;
              case '/settings':
                component = await import('@/pages/Settings');
                break;
              default:
                return;
            }
            
            componentCache.set(route, component);
            addCachedRoute(route);
          } catch (error) {
            console.warn(`Failed to preload ${route}:`, error);
          }
        }
      });

      await Promise.all(promises);
      console.log('🚀 Ultra-fast navigation ready - all routes preloaded!');
    };

    // Délai minimal pour ne pas bloquer le rendu initial
    setTimeout(preloadAllRoutes, 50);
  }, [addCachedRoute, cachedRoutes]);

  // Navigation ultra-rapide (synchrone)
  const ultraFastNavigate = useCallback((to: string, options?: { replace?: boolean }) => {
    setNavigating(true);
    
    // Navigation immédiate
    navigate(to, options);
    setRoute(to);
    
    // Reset navigation state après un délai minimal
    setTimeout(() => setNavigating(false), 10);
  }, [navigate, setRoute, setNavigating]);

  return {
    navigate: ultraFastNavigate,
    isRouteCached: (route: string) => cachedRoutes.has(route),
    currentPath: location.pathname,
    preloadedRoutes: Array.from(cachedRoutes)
  };
};
