
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

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
  subscribeWithSelector((set, get) => ({
    // Initial state
    currentRoute: '/',
    previousRoute: '/',
    isNavigating: false,
    pageLoadTimes: {},
    cachedRoutes: new Set(),
    sidebarCollapsed: false,
    theme: 'light',
    
    // Actions
    setRoute: (route) => {
      const state = get();
      set({
        previousRoute: state.currentRoute,
        currentRoute: route,
      });
    },
    
    setNavigating: (isNavigating) => set({ isNavigating }),
    
    addPageLoadTime: (route, time) => {
      const state = get();
      set({
        pageLoadTimes: { ...state.pageLoadTimes, [route]: time }
      });
    },
    
    addCachedRoute: (route) => {
      const state = get();
      const newCachedRoutes = new Set(state.cachedRoutes);
      newCachedRoutes.add(route);
      set({ cachedRoutes: newCachedRoutes });
    },
    
    toggleSidebar: () => {
      const state = get();
      set({ sidebarCollapsed: !state.sidebarCollapsed });
    },
    
    setTheme: (theme) => set({ theme })
  }))
);

// Selectors optimisés
export const useCurrentRoute = () => useAppStore((state) => state.currentRoute);
export const useIsNavigating = () => useAppStore((state) => state.isNavigating);
export const useSidebarState = () => useAppStore((state) => state.sidebarCollapsed);
export const usePageLoadTimes = () => useAppStore((state) => state.pageLoadTimes);
