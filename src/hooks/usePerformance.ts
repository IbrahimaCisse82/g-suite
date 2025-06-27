
import { useCallback } from 'react';
import { useAppStore } from '@/stores/appStore';

export const usePerformance = (context?: string) => {
  const { addMetric, addPageLoadTime, isEnabled } = useAppStore((state) => ({
    addMetric: state.addMetric,
    addPageLoadTime: state.addPageLoadTime,
    isEnabled: state.performance.isEnabled
  }));

  const measureOperation = useCallback((operationName: string) => {
    if (!isEnabled) return () => {};

    const startTime = performance.now();
    const fullOperationName = context ? `${context}_${operationName}` : operationName;

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      addMetric(fullOperationName, duration);
      
      if (duration > 100) {
        console.warn(`Slow operation detected: ${fullOperationName} took ${duration.toFixed(2)}ms`);
      }
    };
  }, [addMetric, isEnabled, context]);

  const measurePageLoad = useCallback((pageName: string) => {
    if (!isEnabled) return () => {};

    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      addPageLoadTime(pageName, duration);
      console.log(`📊 Page load: ${pageName} - ${duration.toFixed(2)}ms`);
    };
  }, [addPageLoadTime, isEnabled]);

  const trackRender = useCallback((componentName: string) => {
    if (!isEnabled) return;
    
    const endMeasure = measureOperation(`render_${componentName}`);
    // Use setTimeout to measure after render is complete
    setTimeout(endMeasure, 0);
  }, [measureOperation, isEnabled]);

  return {
    measureOperation,
    measurePageLoad,
    trackRender,
    isEnabled
  };
};
