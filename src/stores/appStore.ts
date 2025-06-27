
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AppState {
  // Navigation state
  currentRoute: string;
  previousRoute: string;
  isNavigating: boolean;
  
  // Performance state
  pageLoadTimes: Record<string, number>;
  cachedRoutes: Set<string>;
  
  // UI state
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  
  // Actions
  setRoute: (route: string) => void;
  setNavigating: (isNavigating: boolean) => void;
  addPageLoadTime: (route: string, time: number) => void;
  addCachedRoute: (route: string) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAppStore = create<AppState>()(
  subscribeWithSelector(
    immer((set, get) => ({
      // Initial state
      currentRoute: '/',
      previousRoute: '/',
      isNavigating: false,
      pageLoadTimes: {},
      cachedRoutes: new Set(),
      sidebarCollapsed: false,
      theme: 'light',
      
      // Actions
      setRoute: (route) => set((state) => {
        state.previousRoute = state.currentRoute;
        state.currentRoute = route;
      }),
      
      setNavigating: (isNavigating) => set((state) => {
        state.isNavigating = isNavigating;
      }),
      
      addPageLoadTime: (route, time) => set((state) => {
        state.pageLoadTimes[route] = time;
      }),
      
      addCachedRoute: (route) => set((state) => {
        state.cachedRoutes.add(route);
      }),
      
      toggleSidebar: () => set((state) => {
        state.sidebarCollapsed = !state.sidebarCollapsed;
      }),
      
      setTheme: (theme) => set((state) => {
        state.theme = theme;
      })
    }))
  )
);

// Selectors optimisés
export const useCurrentRoute = () => useAppStore((state) => state.currentRoute);
export const useIsNavigating = () => useAppStore((state) => state.isNavigating);
export const useSidebarState = () => useAppStore((state) => state.sidebarCollapsed);
export const usePageLoadTimes = () => useAppStore((state) => state.pageLoadTimes);
