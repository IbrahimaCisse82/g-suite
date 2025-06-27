
interface OfflineData {
  id: string;
  type: 'contact' | 'invoice' | 'product' | 'employee' | 'budget' | 'treasury';
  data: any;
  timestamp: number;
  syncStatus: 'pending' | 'synced' | 'conflict';
  action: 'create' | 'update' | 'delete';
}

interface OfflineQueue {
  id: string;
  endpoint: string;
  method: 'POST' | 'PUT' | 'DELETE';
  data: any;
  timestamp: number;
  retryCount: number;
  maxRetries: number;
}

class OfflineStorageService {
  private dbName = 'gsuite-offline';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Store pour les données offline
        if (!db.objectStoreNames.contains('offlineData')) {
          const offlineStore = db.createObjectStore('offlineData', { keyPath: 'id' });
          offlineStore.createIndex('type', 'type', { unique: false });
          offlineStore.createIndex('syncStatus', 'syncStatus', { unique: false });
        }

        // Store pour la queue de synchronisation
        if (!db.objectStoreNames.contains('syncQueue')) {
          const queueStore = db.createObjectStore('syncQueue', { keyPath: 'id' });
          queueStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // Store pour le cache des requêtes
        if (!db.objectStoreNames.contains('requestCache')) {
          const cacheStore = db.createObjectStore('requestCache', { keyPath: 'key' });
          cacheStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  async saveOfflineData(type: OfflineData['type'], id: string, data: any, action: OfflineData['action']): Promise<void> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['offlineData'], 'readwrite');
    const store = transaction.objectStore('offlineData');

    const offlineData: OfflineData = {
      id: `${type}_${id}`,
      type,
      data,
      timestamp: Date.now(),
      syncStatus: 'pending',
      action
    };

    await new Promise<void>((resolve, reject) => {
      const request = store.put(offlineData);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getOfflineData(type?: OfflineData['type']): Promise<OfflineData[]> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['offlineData'], 'readonly');
    const store = transaction.objectStore('offlineData');

    return new Promise((resolve, reject) => {
      let request: IDBRequest;
      
      if (type) {
        const index = store.index('type');
        request = index.getAll(type);
      } else {
        request = store.getAll();
      }

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async addToSyncQueue(endpoint: string, method: OfflineQueue['method'], data: any): Promise<void> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['syncQueue'], 'readwrite');
    const store = transaction.objectStore('syncQueue');

    const queueItem: OfflineQueue = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      endpoint,
      method,
      data,
      timestamp: Date.now(),
      retryCount: 0,
      maxRetries: 3
    };

    await new Promise<void>((resolve, reject) => {
      const request = store.add(queueItem);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getSyncQueue(): Promise<OfflineQueue[]> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['syncQueue'], 'readonly');
    const store = transaction.objectStore('syncQueue');

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async removeFromSyncQueue(id: string): Promise<void> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['syncQueue'], 'readwrite');
    const store = transaction.objectStore('syncQueue');

    await new Promise<void>((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async updateSyncQueueItem(id: string, updates: Partial<OfflineQueue>): Promise<void> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['syncQueue'], 'readwrite');
    const store = transaction.objectStore('syncQueue');

    // Get existing item
    const getRequest = store.get(id);
    
    await new Promise<void>((resolve, reject) => {
      getRequest.onsuccess = () => {
        const existingItem = getRequest.result;
        if (existingItem) {
          const updatedItem = { ...existingItem, ...updates };
          const putRequest = store.put(updatedItem);
          putRequest.onsuccess = () => resolve();
          putRequest.onerror = () => reject(putRequest.error);
        } else {
          reject(new Error('Item not found'));
        }
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  async cacheRequest(key: string, data: any, ttl: number = 5 * 60 * 1000): Promise<void> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['requestCache'], 'readwrite');
    const store = transaction.objectStore('requestCache');

    const cacheItem = {
      key,
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl
    };

    await new Promise<void>((resolve, reject) => {
      const request = store.put(cacheItem);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getCachedRequest(key: string): Promise<any | null> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['requestCache'], 'readonly');
    const store = transaction.objectStore('requestCache');

    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => {
        const result = request.result;
        if (result && Date.now() < result.expiry) {
          resolve(result.data);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  async clearExpiredCache(): Promise<void> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['requestCache'], 'readwrite');
    const store = transaction.objectStore('requestCache');
    const index = store.index('timestamp');

    const now = Date.now();
    const request = index.openCursor();

    await new Promise<void>((resolve, reject) => {
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          if (now > cursor.value.expiry) {
            cursor.delete();
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
      request.onerror = () => reject(request.error);
    });
  }
}

export const offlineStorage = new OfflineStorageService();
