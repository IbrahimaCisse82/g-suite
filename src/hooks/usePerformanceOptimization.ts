
import { useEffect, useRef } from 'react';

export const usePerformanceOptimization = () => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    
    if (renderTime > 100) {
      console.warn(`Slow render detected: ${renderTime}ms`);
    }
    
    startTime.current = endTime;
  });

  const measureRenderTime = (componentName: string) => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      console.log(`${componentName} render time: ${end - start}ms`);
    };
  };

  return { renderCount: renderCount.current, measureRenderTime };
};
