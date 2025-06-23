
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import { useMaintenance } from '@/hooks/useMaintenance';
import { MaintenanceDialog } from './maintenance/MaintenanceDialog';
import { MaintenanceList } from './maintenance/MaintenanceList';

export const ModuleMaintenanceManager = () => {
  const { maintenanceData, createMaintenance, toggleMaintenance } = useMaintenance();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Gestion de Maintenance des Modules</span>
            </CardTitle>
            <MaintenanceDialog onCreateMaintenance={createMaintenance} />
          </div>
        </CardHeader>
        <CardContent>
          <MaintenanceList 
            maintenanceData={maintenanceData}
            onToggleMaintenance={toggleMaintenance}
          />
        </CardContent>
      </Card>
    </div>
  );
};
