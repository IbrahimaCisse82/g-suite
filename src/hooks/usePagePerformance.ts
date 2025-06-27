
import { useEffect, useRef, useCallback } from 'react';
import { usePerformanceOptimization } from './usePerformanceOptimization';

export const usePagePerformance = (pageName: string) => {
  const startTime = useRef(performance.now());
  const { measureRenderTime } = usePerformanceOptimization();

  useEffect(() => {
    const endTime = performance.now();
    const loadTime = endTime - startTime.current;
    
    if (loadTime > 500) {
      console.warn(`Slow page load detected for ${pageName}: ${loadTime}ms`);
    } else {
      console.log(`${pageName} loaded in ${loadTime}ms`);
    }
  }, [pageName]);

  const measureOperation = useCallback((operationName: string) => {
    return measureRenderTime(`${pageName} - ${operationName}`);
  }, [pageName, measureRenderTime]);

  return { measureOperation };
};
