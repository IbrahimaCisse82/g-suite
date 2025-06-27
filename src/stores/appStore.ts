import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface NavigationState {
  currentRoute: string;
  isNavigating: boolean;
  cachedRoutes: Set<string>;
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
  togglePerformanceTracking: () => void;
  clearMetrics: () => void;
}

export const useAppStore = create<AppState & AppActions>()(
  immer((set, get) => ({
    // Initial state
    navigation: {
      currentRoute: '/',
      isNavigating: false,
      cachedRoutes: new Set(),
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
        state.navigation.cachedRoutes.add(route);
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

// Selectors for better performance
export const useSidebarState = () => useAppStore((state) => state.navigation.sidebarCollapsed);
export const useNavigationState = () => useAppStore((state) => state.navigation);
export const usePerformanceMetrics = () => useAppStore((state) => state.performance.metrics);
export const useCachedRoutes = () => useAppStore((state) => state.navigation.cachedRoutes);
