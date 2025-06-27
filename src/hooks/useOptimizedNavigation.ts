
import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';

// Routes critiques qui doivent être préchargées
const CRITICAL_ROUTES = ['/dashboard', '/contacts', '/invoicing', '/products'];

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
};

export const useOptimizedNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setRoute, setNavigating, addCachedRoute, cachedRoutes } = useAppStore();

  // Précharger les routes critiques au démarrage
  useEffect(() => {
    const prefetchCriticalRoutes = async () => {
      for (const route of CRITICAL_ROUTES) {
        if (!cachedRoutes.has(route) && ROUTE_COMPONENTS[route as keyof typeof ROUTE_COMPONENTS]) {
          try {
            await ROUTE_COMPONENTS[route as keyof typeof ROUTE_COMPONENTS]();
            addCachedRoute(route);
            console.log(`✅ Route prefetched: ${route}`);
          } catch (error) {
            console.warn(`⚠️ Failed to prefetch route: ${route}`, error);
          }
        }
      }
    };

    // Délai pour ne pas bloquer le rendu initial
    setTimeout(prefetchCriticalRoutes, 100);
  }, [addCachedRoute, cachedRoutes]);

  // Navigation optimisée
  const optimizedNavigate = useCallback((to: string, options?: { replace?: boolean }) => {
    const startTime = performance.now();
    setNavigating(true);
    
    // Précharger la route de destination si nécessaire
    if (ROUTE_COMPONENTS[to as keyof typeof ROUTE_COMPONENTS] && !cachedRoutes.has(to)) {
      ROUTE_COMPONENTS[to as keyof typeof ROUTE_COMPONENTS]()
        .then(() => {
          addCachedRoute(to);
          console.log(`✅ Route cached on navigation: ${to}`);
        })
        .catch(console.warn);
    }

    navigate(to, options);
    setRoute(to);
    
    // Mesurer le temps de navigation
    requestAnimationFrame(() => {
      const endTime = performance.now();
      const navigationTime = endTime - startTime;
      console.log(`📊 Navigation to ${to}: ${navigationTime.toFixed(2)}ms`);
      setNavigating(false);
    });
  }, [navigate, setRoute, setNavigating, addCachedRoute, cachedRoutes]);

  // Prefetch au hover
  const prefetchOnHover = useCallback((route: string) => {
    if (ROUTE_COMPONENTS[route as keyof typeof ROUTE_COMPONENTS] && !cachedRoutes.has(route)) {
      ROUTE_COMPONENTS[route as keyof typeof ROUTE_COMPONENTS]()
        .then(() => {
          addCachedRoute(route);
          console.log(`✅ Route prefetched on hover: ${route}`);
        })
        .catch(console.warn);
    }
  }, [addCachedRoute, cachedRoutes]);

  return {
    navigate: optimizedNavigate,
    prefetchOnHover,
    currentPath: location.pathname,
    isRoutecached: (route: string) => cachedRoutes.has(route)
  };
};
