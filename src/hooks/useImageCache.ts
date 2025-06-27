
import { useState, useEffect, useCallback } from 'react';

interface ImageCacheEntry {
  url: string;
  blob: Blob;
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
}

class ImageCache {
  private cache = new Map<string, ImageCacheEntry>();
  private maxSize = 50; // Maximum number of images to cache
  private maxAge = 30 * 60 * 1000; // 30 minutes in milliseconds

  async get(url: string): Promise<string | null> {
    const entry = this.cache.get(url);
    
    if (!entry) {
      return null;
    }

    // Check if entry is expired
    if (Date.now() - entry.timestamp > this.maxAge) {
      this.cache.delete(url);
      URL.revokeObjectURL(url);
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = Date.now();
    
    return URL.createObjectURL(entry.blob);
  }

  async set(url: string, blob: Blob): Promise<void> {
    // Clean up old entries if cache is full
    if (this.cache.size >= this.maxSize) {
      this.cleanup();
    }

    const entry: ImageCacheEntry = {
      url,
      blob,
      timestamp: Date.now(),
      accessCount: 1,
      lastAccessed: Date.now()
    };

    this.cache.set(url, entry);
  }

  private cleanup(): void {
    // Remove oldest and least accessed entries
    const entries = Array.from(this.cache.entries())
      .sort((a, b) => {
        // First sort by access count (ascending), then by last accessed (ascending)
        const accessDiff = a[1].accessCount - b[1].accessCount;
        if (accessDiff !== 0) return accessDiff;
        return a[1].lastAccessed - b[1].lastAccessed;
      });

    // Remove 25% of entries
    const toRemove = Math.floor(entries.length * 0.25);
    for (let i = 0; i < toRemove; i++) {
      const [url, entry] = entries[i];
      this.cache.delete(url);
      URL.revokeObjectURL(URL.createObjectURL(entry.blob));
    }
  }

  clear(): void {
    for (const [url, entry] of this.cache.entries()) {
      URL.revokeObjectURL(URL.createObjectURL(entry.blob));
    }
    this.cache.clear();
  }

  has(url: string): boolean {
    return this.cache.has(url);
  }

  size(): number {
    return this.cache.size;
  }
}

const imageCache = new ImageCache();

export function useImageCache(src: string) {
  const [cachedSrc, setCachedSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadImage = useCallback(async (url: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Check cache first
      const cached = await imageCache.get(url);
      if (cached) {
        setCachedSrc(cached);
        return;
      }

      // Fetch and cache the image
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const blob = await response.blob();
      await imageCache.set(url, blob);
      
      const objectUrl = URL.createObjectURL(blob);
      setCachedSrc(objectUrl);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setCachedSrc(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (src) {
      loadImage(src);
    }
  }, [src, loadImage]);

  const refresh = useCallback(() => {
    if (src) {
      loadImage(src);
    }
  }, [src, loadImage]);

  return {
    src: cachedSrc || src,
    isLoading,
    error,
    refresh,
    isCached: imageCache.has(src)
  };
}

export { imageCache };
