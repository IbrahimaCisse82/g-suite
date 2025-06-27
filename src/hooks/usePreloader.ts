
import { useCallback, useEffect, useRef } from 'react';

interface PreloaderOptions {
  enabled?: boolean;
  preloadDistance?: number;
  maxPreloadItems?: number;
}

export function usePreloader<T>({
  enabled = true,
  preloadDistance = 5,
  maxPreloadItems = 10
}: PreloaderOptions = {}) {
  const preloadedItems = useRef(new Set<string>());
  const preloadQueue = useRef<Array<() => Promise<void>>>([]);
  const isPreloading = useRef(false);

  const processPreloadQueue = useCallback(async () => {
    if (isPreloading.current || preloadQueue.current.length === 0) {
      return;
    }

    isPreloading.current = true;
    
    try {
      while (preloadQueue.current.length > 0) {
        const preloadTask = preloadQueue.current.shift();
        if (preloadTask) {
          await preloadTask();
        }
      }
    } finally {
      isPreloading.current = false;
    }
  }, []);

  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (preloadedItems.current.has(src)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        preloadedItems.current.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  const addToPreloadQueue = useCallback((items: Array<{ id: string; src?: string; loader?: () => Promise<void> }>) => {
    if (!enabled) return;

    items.forEach(item => {
      if (preloadedItems.current.has(item.id)) return;

      const preloadTask = async () => {
        try {
          if (item.src) {
            await preloadImage(item.src);
          } else if (item.loader) {
            await item.loader();
          }
          preloadedItems.current.add(item.id);
        } catch (error) {
          console.warn(`Failed to preload item ${item.id}:`, error);
        }
      };

      preloadQueue.current.push(preloadTask);
    });

    // Limit queue size
    if (preloadQueue.current.length > maxPreloadItems) {
      preloadQueue.current = preloadQueue.current.slice(-maxPreloadItems);
    }

    // Process queue with debouncing
    setTimeout(processPreloadQueue, 100);
  }, [enabled, maxPreloadItems, preloadImage, processPreloadQueue]);

  const preloadNearbyItems = useCallback(<T extends { id: string }>(
    items: T[],
    currentIndex: number,
    getPreloadData: (item: T) => { src?: string; loader?: () => Promise<void> }
  ) => {
    const startIndex = Math.max(0, currentIndex - preloadDistance);
    const endIndex = Math.min(items.length - 1, currentIndex + preloadDistance);
    
    const itemsToPreload = [];
    for (let i = startIndex; i <= endIndex; i++) {
      if (i !== currentIndex) {
        const item = items[i];
        const preloadData = getPreloadData(item);
        itemsToPreload.push({
          id: item.id,
          ...preloadData
        });
      }
    }

    addToPreloadQueue(itemsToPreload);
  }, [preloadDistance, addToPreloadQueue]);

  const isPreloaded = useCallback((id: string) => {
    return preloadedItems.current.has(id);
  }, []);

  const clearPreloadCache = useCallback(() => {
    preloadedItems.current.clear();
    preloadQueue.current = [];
  }, []);

  return {
    addToPreloadQueue,
    preloadNearbyItems,
    isPreloaded,
    clearPreloadCache,
    preloadImage
  };
}
