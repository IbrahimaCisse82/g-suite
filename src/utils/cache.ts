
interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

class MemoryCache {
  private cache = new Map<string, CacheItem<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl?: number): void {
    const expiresIn = ttl || this.defaultTTL;
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    const now = Date.now();
    const isExpired = (now - item.timestamp) > item.expiresIn;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  // Clean expired items
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      const isExpired = (now - item.timestamp) > item.expiresIn;
      if (isExpired) {
        this.cache.delete(key);
      }
    }
  }
}

// Session storage cache for persistence across page reloads
class SessionCache {
  private prefix = 'app_cache_';

  set<T>(key: string, data: T, ttl?: number): void {
    try {
      const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        expiresIn: ttl || 5 * 60 * 1000
      };
      sessionStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to save to session storage:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const stored = sessionStorage.getItem(this.prefix + key);
      if (!stored) return null;

      const item: CacheItem<T> = JSON.parse(stored);
      const now = Date.now();
      const isExpired = (now - item.timestamp) > item.expiresIn;

      if (isExpired) {
        this.delete(key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn('Failed to read from session storage:', error);
      return null;
    }
  }

  delete(key: string): void {
    sessionStorage.removeItem(this.prefix + key);
  }

  clear(): void {
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        sessionStorage.removeItem(key);
      }
    });
  }
}

// Export cache instances
export const memoryCache = new MemoryCache();
export const sessionCache = new SessionCache();

// Cleanup interval for memory cache
setInterval(() => {
  memoryCache.cleanup();
}, 60000); // Clean every minute
