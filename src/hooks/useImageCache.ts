
import { useState, useEffect, useCallback } from 'react';

interface ImageCacheEntry {
  url: string;
  blob: Blob;
  timestamp: number;
}

class ImageCache {
  private cache = new Map<string, ImageCacheEntry>();
  private readonly MAX_CACHE_SIZE = 50; // Maximum 50 images en cache
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  async get(url: string): Promise<string | null> {
    const entry = this.cache.get(url);
    
    if (!entry) return null;
    
    // Vérifier l'expiration
    if (Date.now() - entry.timestamp > this.CACHE_DURATION) {
      this.cache.delete(url);
      URL.revokeObjectURL(entry.url);
      return null;
    }
    
    return entry.url;
  }

  async set(originalUrl: string, blob: Blob): Promise<string> {
    // Nettoyer le cache si trop plein
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      this.cleanup();
    }

    const objectUrl = URL.createObjectURL(blob);
    this.cache.set(originalUrl, {
      url: objectUrl,
      blob,
      timestamp: Date.now()
    });

    return objectUrl;
  }

  private cleanup() {
    const entries = Array.from(this.cache.entries());
    // Supprimer les entrées les plus anciennes
    entries
      .sort(([,a], [,b]) => a.timestamp - b.timestamp)
      .slice(0, 10) // Supprimer les 10 plus anciennes
      .forEach(([url, entry]) => {
        this.cache.delete(url);
        URL.revokeObjectURL(entry.url);
      });
  }

  clear() {
    this.cache.forEach(entry => URL.revokeObjectURL(entry.url));
    this.cache.clear();
  }
}

const imageCache = new ImageCache();

export const useImageCache = (src: string) => {
  const [cachedSrc, setCachedSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadImage = useCallback(async (url: string) => {
    try {
      setLoading(true);
      setError(null);

      // Vérifier le cache d'abord
      const cached = await imageCache.get(url);
      if (cached) {
        setCachedSrc(cached);
        setLoading(false);
        return;
      }

      // Charger l'image
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load image: ${response.status}`);
      }

      const blob = await response.blob();
      const objectUrl = await imageCache.set(url, blob);
      
      setCachedSrc(objectUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load image');
      setCachedSrc(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (src) {
      loadImage(src);
    }
  }, [src, loadImage]);

  return { src: cachedSrc || src, loading, error };
};
