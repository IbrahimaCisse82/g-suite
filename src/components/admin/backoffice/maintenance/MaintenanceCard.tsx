
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Power, PowerOff } from 'lucide-react';
import { ModuleMaintenance } from '@/types/maintenance';
import { modules } from '@/constants/modules';

interface MaintenanceCardProps {
  maintenance: ModuleMaintenance;
  onToggle: (id: string) => void;
}

export const MaintenanceCard = ({ maintenance, onToggle }: MaintenanceCardProps) => {
  const getModuleBadge = (isDisabled: boolean) => {
    return isDisabled ? (
      <Badge className="bg-red-100 text-red-800">
        <PowerOff className="w-3 h-3 mr-1" />
        Désactivé
      </Badge>
    ) : (
      <Badge className="bg-green-100 text-green-800">
        <Power className="w-3 h-3 mr-1" />
        Actif
      </Badge>
    );
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-medium text-gray-900">
              {modules.find(m => m.id === maintenance.module_name)?.name || maintenance.module_name}
            </h3>
            {maintenance.sub_module_name && (
              <span className="text-sm text-gray-600">→ {maintenance.sub_module_name}</span>
            )}
            {getModuleBadge(maintenance.is_disabled)}
          </div>
          <p className="text-sm text-gray-600 mb-2">{maintenance.maintenance_reason}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>Par: {maintenance.disabled_by}</span>
            <span>Début: {new Date(maintenance.disabled_at).toLocaleString('fr-FR')}</span>
            {maintenance.estimated_end_time && (
              <span>Fin estimée: {new Date(maintenance.estimated_end_time).toLocaleString('fr-FR')}</span>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onToggle(maintenance.id)}
          className={maintenance.is_disabled ? 'text-green-600 hover:text-green-700' : 'text-red-600 hover:text-red-700'}
        >
          {maintenance.is_disabled ? (
            <>
              <Power className="w-4 h-4 mr-1" />
              Réactiver
            </>
          ) : (
            <>
              <PowerOff className="w-4 h-4 mr-1" />
              Désactiver
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
