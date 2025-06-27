
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface NavigationState {
  currentRoute: string;
  isNavigating: boolean;
  cachedRoutes: string[]; // Changé de Set à Array
  sidebarCollapsed: boolean;
}

interface PerformanceState {
  metrics: Record<string, number[]>;
  isEnabled: boolean;
}

interface AppState {
  navigation: NavigationState;
  performance: PerformanceState;
}

interface AppActions {
  // Navigation actions
  setRoute: (route: string) => void;
  setNavigating: (isNavigating: boolean) => void;
  addCachedRoute: (route: string) => void;
  toggleSidebar: () => void;
  
  // Performance actions
  addMetric: (operation: string, duration: number) => void;
  addPageLoadTime: (page: string, duration: number) => void;
  togglePerformanceTracking: () => void;
  clearMetrics: () => void;
}

export const useAppStore = create<AppState & AppActions>()(
  immer((set, get) => ({
    // Initial state
    navigation: {
      currentRoute: '/',
      isNavigating: false,
      cachedRoutes: [], // Array au lieu de Set
      sidebarCollapsed: false,
    },
    performance: {
      metrics: {},
      isEnabled: true,
    },

    // Navigation actions
    setRoute: (route) =>
      set((state) => {
        state.navigation.currentRoute = route;
      }),

    setNavigating: (isNavigating) =>
      set((state) => {
        state.navigation.isNavigating = isNavigating;
      }),

    addCachedRoute: (route) =>
      set((state) => {
        if (!state.navigation.cachedRoutes.includes(route)) {
          state.navigation.cachedRoutes.push(route);
        }
      }),

    toggleSidebar: () =>
      set((state) => {
        state.navigation.sidebarCollapsed = !state.navigation.sidebarCollapsed;
      }),

    // Performance actions
    addMetric: (operation, duration) =>
      set((state) => {
        if (!state.performance.metrics[operation]) {
          state.performance.metrics[operation] = [];
        }
        state.performance.metrics[operation].push(duration);
        
        // Keep only last 10 measurements
        if (state.performance.metrics[operation].length > 10) {
          state.performance.metrics[operation] = state.performance.metrics[operation].slice(-10);
        }
      }),

    addPageLoadTime: (page, duration) =>
      set((state) => {
        const key = `page_load_${page}`;
        if (!state.performance.metrics[key]) {
          state.performance.metrics[key] = [];
        }
        state.performance.metrics[key].push(duration);
        
        if (state.performance.metrics[key].length > 10) {
          state.performance.metrics[key] = state.performance.metrics[key].slice(-10);
        }
      }),

    togglePerformanceTracking: () =>
      set((state) => {
        state.performance.isEnabled = !state.performance.isEnabled;
      }),

    clearMetrics: () =>
      set((state) => {
        state.performance.metrics = {};
      }),
  }))
);

// Selectors adaptés pour le nouveau format
export const useSidebarState = () => useAppStore((state) => state.navigation.sidebarCollapsed);
export const useNavigationState = () => useAppStore((state) => state.navigation);
export const useIsNavigating = () => useAppStore((state) => state.navigation.isNavigating);
export const usePerformanceMetrics = () => useAppStore((state) => state.performance.metrics);
export const useCachedRoutes = () => useAppStore((state) => new Set(state.navigation.cachedRoutes)); // Conversion en Set pour compatibilité
