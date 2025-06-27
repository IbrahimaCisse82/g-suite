
import { useEffect, useRef, useCallback, useState } from 'react';
import { useAppStore } from '@/stores/appStore';

interface PerformanceMetrics {
  renderTime: number;
  loadTime: number;
  interactionTime: number;
  memoryUsage?: number;
}

export const useAdvancedPerformance = (componentName: string) => {
  const startTime = useRef(performance.now());
  const renderCount = useRef(0);
  const { addPageLoadTime } = useAppStore();
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  // Mesurer le temps de rendu
  const measureRender = useCallback(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    renderCount.current += 1;

    return renderTime;
  }, []);

  // Mesurer une opération spécifique
  const measureOperation = useCallback((operationName: string) => {
    const start = performance.now();
    
    return (data?: any) => {
      const end = performance.now();
      const duration = end - start;
      
      console.log(`⚡ ${componentName} - ${operationName}: ${duration.toFixed(2)}ms`);
      
      if (duration > 100) {
        console.warn(`🐌 Slow operation detected in ${componentName} - ${operationName}: ${duration.toFixed(2)}ms`);
      }
      
      return { duration, data };
    };
  }, [componentName]);

  // Mesurer l'utilisation mémoire
  const measureMemory = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
      };
    }
    return null;
  }, []);

  // Observer des performances en temps réel
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          // Utiliser startTime et loadEventEnd au lieu de navigationStart
          const loadTime = navEntry.loadEventEnd - navEntry.startTime;
          addPageLoadTime(componentName, loadTime);
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['navigation', 'measure'] });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }

    return () => observer.disconnect();
  }, [componentName, addPageLoadTime]);

  // Calculer les métriques finales au démontage
  useEffect(() => {
    return () => {
      const finalMetrics: PerformanceMetrics = {
        renderTime: measureRender(),
        loadTime: performance.now() - startTime.current,
        interactionTime: 0, // Sera calculé via les événements
        memoryUsage: measureMemory()?.used
      };

      setMetrics(finalMetrics);
      
      console.log(`📊 ${componentName} Performance Summary:`, finalMetrics);
      
      // Alertes de performance
      if (finalMetrics.renderTime > 16) { // Plus de 16ms = moins de 60fps
        console.warn(`🚨 ${componentName}: Render time too slow (${finalMetrics.renderTime.toFixed(2)}ms)`);
      }
      
      if (finalMetrics.memoryUsage && finalMetrics.memoryUsage > 100) {
        console.warn(`🚨 ${componentName}: High memory usage (${finalMetrics.memoryUsage}MB)`);
      }
    };
  }, [measureRender, measureMemory, componentName]);

  return {
    measureOperation,
    measureMemory,
    renderCount: renderCount.current,
    metrics
  };
};
