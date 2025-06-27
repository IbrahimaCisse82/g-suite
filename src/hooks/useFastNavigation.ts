
import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';

// Routes critiques qui doivent être préchargées
const CRITICAL_ROUTES = [
  '/dashboard', '/contacts', '/invoicing', '/products', '/employees',
  '/budget', '/reports', '/analytics', '/treasury', '/accounting',
  '/quotes', '/purchases', '/stock', '/settings'
];

// Map des composants pour le prefetch
const ROUTE_COMPONENTS = {
  '/dashboard': () => import('@/pages/Dashboard'),
  '/contacts': () => import('@/pages/Contacts'),
  '/invoicing': () => import('@/pages/Invoicing'),
  '/products': () => import('@/pages/Products'),
  '/employees': () => import('@/pages/Employees'),
  '/budget': () => import('@/pages/Budget'),
  '/reports': () => import('@/pages/Reports'),
  '/analytics': () => import('@/pages/Analytics'),
  '/treasury': () => import('@/pages/Treasury'),
  '/accounting': () => import('@/pages/Accounting'),
  '/quotes': () => import('@/pages/Quotes'),
  '/purchases': () => import('@/pages/Purchases'),
  '/stock': () => import('@/pages/Stock'),
  '/settings': () => import('@/pages/Settings'),
} as const;

// Cache des composants
const componentCache = new Map();

export const useFastNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRoute, setNavigating, addCachedRoute, cachedRoutes } = useAppStore();

  // Preload TOUS les composants critiques au démarrage
  useEffect(() => {
    const preloadAllRoutes = async () => {
      const promises = CRITICAL_ROUTES.map(async (route) => {
        if (!cachedRoutes.has(route)) {
          try {
            const componentLoader = ROUTE_COMPONENTS[route as keyof typeof ROUTE_COMPONENTS];
            if (componentLoader) {
              const component = await componentLoader();
              componentCache.set(route, component);
              addCachedRoute(route);
            }
          } catch (error) {
            console.warn(`Failed to preload ${route}:`, error);
          }
        }
      });

      await Promise.all(promises);
      console.log('🚀 Fast navigation ready - all routes preloaded!');
    };

    // Délai minimal pour ne pas bloquer le rendu initial
    setTimeout(preloadAllRoutes, 50);
  }, [addCachedRoute, cachedRoutes]);

  // Navigation ultra-rapide (synchrone)
  const fastNavigate = useCallback((to: string, options?: { replace?: boolean }) => {
    const startTime = performance.now();
    setNavigating(true);
    
    // Précharger la route de destination si nécessaire
    const componentLoader = ROUTE_COMPONENTS[to as keyof typeof ROUTE_COMPONENTS];
    if (componentLoader && !cachedRoutes.has(to)) {
      componentLoader()
        .then(() => {
          addCachedRoute(to);
          console.log(`✅ Route cached on navigation: ${to}`);
        })
        .catch(console.warn);
    }

    // Navigation immédiate
    navigate(to, options);
    setRoute(to);
    
    // Mesurer et reset navigation state
    requestAnimationFrame(() => {
      const endTime = performance.now();
      const navigationTime = endTime - startTime;
      console.log(`📊 Navigation to ${to}: ${navigationTime.toFixed(2)}ms`);
      setNavigating(false);
    });
  }, [navigate, setRoute, setNavigating, addCachedRoute, cachedRoutes]);

  // Prefetch au hover
  const prefetchOnHover = useCallback((route: string) => {
    const componentLoader = ROUTE_COMPONENTS[route as keyof typeof ROUTE_COMPONENTS];
    if (componentLoader && !cachedRoutes.has(route)) {
      componentLoader()
        .then(() => {
          addCachedRoute(route);
          console.log(`✅ Route prefetched on hover: ${route}`);
        })
        .catch(console.warn);
    }
  }, [addCachedRoute, cachedRoutes]);

  return {
    navigate: fastNavigate,
    prefetchOnHover,
    isRouteCached: (route: string) => cachedRoutes.has(route),
    currentPath: location.pathname,
    preloadedRoutes: Array.from(cachedRoutes)
  };
};
