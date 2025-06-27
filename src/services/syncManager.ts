
import { offlineStorage } from './offlineStorage';
import { supabase } from '@/integrations/supabase/client';

export interface SyncConflict {
  id: string;
  type: 'contact' | 'invoice' | 'product' | 'employee' | 'budget' | 'treasury';
  localData: any;
  serverData: any;
  field: string;
  localTimestamp: number;
  serverTimestamp: number;
}

export interface SyncResult {
  success: boolean;
  syncedCount: number;
  conflictCount: number;
  errorCount: number;
  conflicts: SyncConflict[];
  errors: Array<{ id: string; error: string }>;
}

export interface SyncStrategy {
  name: string;
  resolve: (conflict: SyncConflict) => any;
}

// Mapping des types vers les noms de tables Supabase
const TABLE_MAPPING = {
  contact: 'contacts',
  invoice: 'invoices',
  product: 'products',
  employee: 'employees',
  budget: 'budgets',
  treasury: 'treasury_transactions'
} as const;

class AdvancedSyncManager {
  private syncStrategies: Map<string, SyncStrategy> = new Map();
  private syncInProgress = false;
  private lastSyncTimestamp: number = 0;

  constructor() {
    this.registerDefaultStrategies();
  }

  private registerDefaultStrategies() {
    // Stratégie : Prendre la version la plus récente
    this.syncStrategies.set('latest_wins', {
      name: 'Latest Wins',
      resolve: (conflict) => {
        return conflict.localTimestamp > conflict.serverTimestamp 
          ? conflict.localData 
          : conflict.serverData;
      }
    });

    // Stratégie : Prendre la version locale
    this.syncStrategies.set('local_wins', {
      name: 'Local Wins',
      resolve: (conflict) => conflict.localData
    });

    // Stratégie : Prendre la version serveur
    this.syncStrategies.set('server_wins', {
      name: 'Server Wins',
      resolve: (conflict) => conflict.serverData
    });

    // Stratégie : Fusionner les données
    this.syncStrategies.set('merge', {
      name: 'Merge',
      resolve: (conflict) => {
        return this.mergeObjects(conflict.localData, conflict.serverData, conflict.localTimestamp, conflict.serverTimestamp);
      }
    });
  }

  private mergeObjects(local: any, server: any, localTime: number, serverTime: number): any {
    const merged = { ...server };
    
    // Merger les champs en prenant la version la plus récente pour chaque propriété
    Object.keys(local).forEach(key => {
      if (key !== 'id' && key !== 'created_at') {
        // Pour une vraie implémentation, on devrait avoir des timestamps par champ
        // Ici on utilise une logique simplifiée
        if (localTime > serverTime) {
          merged[key] = local[key];
        }
      }
    });

    return merged;
  }

  async performDifferentialSync(
    type: 'contact' | 'invoice' | 'product' | 'employee' | 'budget' | 'treasury',
    options: {
      strategy?: string;
      batchSize?: number;
      conflictResolution?: 'auto' | 'manual';
    } = {}
  ): Promise<SyncResult> {
    if (this.syncInProgress) {
      throw new Error('Synchronisation déjà en cours');
    }

    this.syncInProgress = true;
    const startTime = Date.now();

    try {
      const result: SyncResult = {
        success: true,
        syncedCount: 0,
        conflictCount: 0,
        errorCount: 0,
        conflicts: [],
        errors: []
      };

      // 1. Récupérer les données locales modifiées depuis la dernière sync
      const localChanges = await this.getLocalChangesSince(type, this.lastSyncTimestamp);
      
      // 2. Récupérer les données serveur modifiées depuis la dernière sync
      const serverChanges = await this.getServerChangesSince(type, this.lastSyncTimestamp);

      // 3. Détecter les conflits
      const conflicts = this.detectConflicts(localChanges, serverChanges);
      result.conflicts = conflicts;
      result.conflictCount = conflicts.length;

      // 4. Résoudre les conflits automatiquement si demandé
      if (options.conflictResolution === 'auto' && conflicts.length > 0) {
        const strategy = this.syncStrategies.get(options.strategy || 'latest_wins');
        if (strategy) {
          for (const conflict of conflicts) {
            try {
              const resolved = strategy.resolve(conflict);
              await this.applyResolvedConflict(conflict, resolved);
              result.syncedCount++;
            } catch (error) {
              result.errors.push({
                id: conflict.id,
                error: `Erreur lors de la résolution du conflit: ${error}`
              });
              result.errorCount++;
            }
          }
        }
      }

      // 5. Synchroniser les changements sans conflit
      const nonConflictingChanges = this.filterNonConflictingChanges(localChanges, serverChanges, conflicts);
      
      for (const change of nonConflictingChanges) {
        try {
          await this.syncSingleItem(change);
          result.syncedCount++;
        } catch (error) {
          result.errors.push({
            id: change.id,
            error: `Erreur lors de la synchronisation: ${error}`
          });
          result.errorCount++;
        }
      }

      // 6. Mettre à jour le timestamp de dernière synchronisation
      this.lastSyncTimestamp = startTime;
      await this.saveLastSyncTimestamp(startTime);

      console.log(`✅ Synchronisation différentielle terminée:`, result);
      return result;

    } catch (error) {
      console.error('❌ Erreur lors de la synchronisation différentielle:', error);
      return {
        success: false,
        syncedCount: 0,
        conflictCount: 0,
        errorCount: 1,
        conflicts: [],
        errors: [{ id: 'sync_error', error: String(error) }]
      };
    } finally {
      this.syncInProgress = false;
    }
  }

  private async getLocalChangesSince(type: string, timestamp: number): Promise<any[]> {
    const allData = await offlineStorage.getOfflineData(type as any);
    return allData.filter(item => item.timestamp > timestamp);
  }

  private async getServerChangesSince(type: string, timestamp: number): Promise<any[]> {
    try {
      const tableName = TABLE_MAPPING[type as keyof typeof TABLE_MAPPING];
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .gte('updated_at', new Date(timestamp).toISOString());

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error(`Erreur lors de la récupération des données serveur pour ${type}:`, error);
      return [];
    }
  }

  private detectConflicts(localChanges: any[], serverChanges: any[]): SyncConflict[] {
    const conflicts: SyncConflict[] = [];
    const serverMap = new Map(serverChanges.map(item => [item.id, item]));

    for (const localItem of localChanges) {
      const serverId = localItem.data.id;
      const serverItem = serverMap.get(serverId);

      if (serverItem) {
        // Vérifier si les données sont différentes
        const localTime = localItem.timestamp;
        const serverTime = new Date(serverItem.updated_at).getTime();

        if (this.hasDataConflicts(localItem.data, serverItem)) {
          conflicts.push({
            id: serverId,
            type: localItem.type,
            localData: localItem.data,
            serverData: serverItem,
            field: 'multiple', // Simplification - en réalité on détecterait les champs spécifiques
            localTimestamp: localTime,
            serverTimestamp: serverTime
          });
        }
      }
    }

    return conflicts;
  }

  private hasDataConflicts(localData: any, serverData: any): boolean {
    // Comparer les données en excluant les métadonnées
    const excludeFields = ['id', 'created_at', 'updated_at'];
    
    for (const key of Object.keys(localData)) {
      if (!excludeFields.includes(key) && localData[key] !== serverData[key]) {
        return true;
      }
    }
    
    return false;
  }

  private filterNonConflictingChanges(localChanges: any[], serverChanges: any[], conflicts: SyncConflict[]): any[] {
    const conflictIds = new Set(conflicts.map(c => c.id));
    return localChanges.filter(change => !conflictIds.has(change.data.id));
  }

  private async applyResolvedConflict(conflict: SyncConflict, resolvedData: any): Promise<void> {
    const tableName = TABLE_MAPPING[conflict.type as keyof typeof TABLE_MAPPING];
    const { error } = await supabase
      .from(tableName)
      .update(resolvedData)
      .eq('id', conflict.id);

    if (error) throw error;

    // Mettre à jour les données locales
    await offlineStorage.saveOfflineData(conflict.type, conflict.id, resolvedData, 'update');
  }

  private async syncSingleItem(change: any): Promise<void> {
    const { data, action, type } = change;
    const tableName = TABLE_MAPPING[type as keyof typeof TABLE_MAPPING];

    switch (action) {
      case 'create':
        const { error: createError } = await supabase
          .from(tableName)
          .insert(data);
        if (createError) throw createError;
        break;

      case 'update':
        const { error: updateError } = await supabase
          .from(tableName)
          .update(data)
          .eq('id', data.id);
        if (updateError) throw updateError;
        break;

      case 'delete':
        const { error: deleteError } = await supabase
          .from(tableName)
          .delete()
          .eq('id', data.id);
        if (deleteError) throw deleteError;
        break;
    }

    // Marquer comme synchronisé localement
    await offlineStorage.saveOfflineData(type, data.id, data, 'update');
  }

  private async saveLastSyncTimestamp(timestamp: number): Promise<void> {
    localStorage.setItem('lastSyncTimestamp', timestamp.toString());
  }

  private async loadLastSyncTimestamp(): Promise<number> {
    const stored = localStorage.getItem('lastSyncTimestamp');
    return stored ? parseInt(stored, 10) : 0;
  }

  async getConflictResolutionStrategies(): Promise<SyncStrategy[]> {
    return Array.from(this.syncStrategies.values());
  }

  async addCustomStrategy(name: string, strategy: SyncStrategy): Promise<void> {
    this.syncStrategies.set(name, strategy);
  }

  isSyncInProgress(): boolean {
    return this.syncInProgress;
  }

  async initialize(): Promise<void> {
    this.lastSyncTimestamp = await this.loadLastSyncTimestamp();
  }
}

export const syncManager = new AdvancedSyncManager();
