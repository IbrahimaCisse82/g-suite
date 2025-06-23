
import { useState } from 'react';
import { ModuleMaintenance, NewMaintenanceForm } from '@/types/maintenance';
import { toast } from 'sonner';

const mockMaintenanceData: ModuleMaintenance[] = [];

export const useMaintenance = () => {
  const [maintenanceData, setMaintenanceData] = useState<ModuleMaintenance[]>(mockMaintenanceData);

  const createMaintenance = (newMaintenance: NewMaintenanceForm) => {
    const maintenance: ModuleMaintenance = {
      id: Math.random().toString(36).substr(2, 9),
      module_name: newMaintenance.module_name,
      sub_module_name: newMaintenance.sub_module_name || undefined,
      is_disabled: true,
      maintenance_reason: newMaintenance.maintenance_reason,
      disabled_by: 'Super Admin',
      disabled_at: new Date().toISOString(),
      estimated_end_time: newMaintenance.estimated_end_time || undefined,
    };

    setMaintenanceData([...maintenanceData, maintenance]);
    toast.success(`Module ${newMaintenance.module_name} mis en maintenance`);
  };

  const toggleMaintenance = (id: string) => {
    setMaintenanceData(maintenanceData.map(item => 
      item.id === id 
        ? { ...item, is_disabled: !item.is_disabled }
        : item
    ));
    
    const item = maintenanceData.find(m => m.id === id);
    if (item) {
      toast.success(`Module ${item.module_name} ${item.is_disabled ? 'réactivé' : 'désactivé'}`);
    }
  };

  return {
    maintenanceData,
    createMaintenance,
    toggleMaintenance
  };
};
