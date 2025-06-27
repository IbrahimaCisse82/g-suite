
import { useCallback, useRef, useEffect } from 'react';
import { usePerformance } from '@/hooks/usePerformance';

interface PerformanceMetrics {
  renderTime: number;
  componentCount: number;
  memoryUsage?: number;
  networkRequests: number;
  cacheHitRate: number;
}

interface ComponentMetric {
  name: string;
  renderCount: number;
  totalRenderTime: number;
  averageRenderTime: number;
  lastRenderTime: number;
}

export function useAdvancedPerformance(componentName: string) {
  const { measureOperation, isEnabled } = usePerformance();
  const metricsRef = useRef<ComponentMetric>({
    name: componentName,
    renderCount: 0,
    totalRenderTime: 0,
    averageRenderTime: 0,
    lastRenderTime: 0
  });
  
  const networkRequestsRef = useRef(0);
  const cacheHitsRef = useRef(0);
  const cacheMissesRef = useRef(0);

  const measureRender = useCallback(() => {
    if (!isEnabled) return () => {};

    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      const metrics = metricsRef.current;
      metrics.renderCount++;
      metrics.totalRenderTime += renderTime;
      metrics.averageRenderTime = metrics.totalRenderTime / metrics.renderCount;
      metrics.lastRenderTime = renderTime;

      // Log slow renders
      if (renderTime > 16) { // More than one frame at 60fps
        console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    };
  }, [isEnabled, componentName]);

  const trackNetworkRequest = useCallback(() => {
    networkRequestsRef.current++;
  }, []);

  const trackCacheHit = useCallback(() => {
    cacheHitsRef.current++;
  }, []);

  const trackCacheMiss = useCallback(() => {
    cacheMissesRef.current++;
  }, []);

  const getMetrics = useCallback((): PerformanceMetrics => {
    const totalCacheRequests = cacheHitsRef.current + cacheMissesRef.current;
    const cacheHitRate = totalCacheRequests > 0 ? 
      (cacheHitsRef.current / totalCacheRequests) * 100 : 0;

    return {
      renderTime: metricsRef.current.averageRenderTime,
      componentCount: metricsRef.current.renderCount,
      memoryUsage: getMemoryUsage(),
      networkRequests: networkRequestsRef.current,
      cacheHitRate
    };
  }, []);

  const getComponentMetrics = useCallback(() => {
    return { ...metricsRef.current };
  }, []);

  const resetMetrics = useCallback(() => {
    metricsRef.current = {
      name: componentName,
      renderCount: 0,
      totalRenderTime: 0,
      averageRenderTime: 0,
      lastRenderTime: 0
    };
    networkRequestsRef.current = 0;
    cacheHitsRef.current = 0;
    cacheMissesRef.current = 0;
  }, [componentName]);

  // Memory usage helper
  const getMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return undefined;
  }, []);

  // Log metrics periodically in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && isEnabled) {
      const interval = setInterval(() => {
        const metrics = getMetrics();
        if (metrics.componentCount > 0) {
          console.log(`Performance metrics for ${componentName}:`, metrics);
        }
      }, 30000); // Log every 30 seconds

      return () => clearInterval(interval);
    }
  }, [componentName, isEnabled, getMetrics]);

  return {
    measureRender,
    trackNetworkRequest,
    trackCacheHit,
    trackCacheMiss,
    getMetrics,
    getComponentMetrics,
    resetMetrics
  };
}
