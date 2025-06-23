
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { ModuleMaintenance } from '@/types/maintenance';
import { MaintenanceCard } from './MaintenanceCard';

interface MaintenanceListProps {
  maintenanceData: ModuleMaintenance[];
  onToggleMaintenance: (id: string) => void;
}

export const MaintenanceList = ({ maintenanceData, onToggleMaintenance }: MaintenanceListProps) => {
  if (maintenanceData.length === 0) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <p className="text-gray-500">Aucune maintenance planifiée</p>
        <p className="text-sm text-gray-400">Tous les modules sont opérationnels</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {maintenanceData.map((maintenance) => (
        <MaintenanceCard
          key={maintenance.id}
          maintenance={maintenance}
          onToggle={onToggleMaintenance}
        />
      ))}
    </div>
  );
};
