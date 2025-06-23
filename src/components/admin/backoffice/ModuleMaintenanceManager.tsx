
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Plus,
  Power,
  PowerOff
} from 'lucide-react';
import { toast } from 'sonner';

interface ModuleMaintenance {
  id: string;
  module_name: string;
  sub_module_name?: string;
  is_disabled: boolean;
  maintenance_reason?: string;
  disabled_by: string;
  disabled_at: string;
  estimated_end_time?: string;
}

// Données réelles - aucune maintenance active pour le moment
const mockMaintenanceData: ModuleMaintenance[] = [];

const modules = [
  { id: 'comptabilite', name: 'Comptabilité', submodules: ['Plan comptable', 'Écritures', 'États financiers'] },
  { id: 'commerciale', name: 'Commerciale', submodules: ['Facturation', 'Devis', 'Clients', 'Produits'] },
  { id: 'entreprise', name: 'Entreprise', submodules: ['Tableau de bord', 'Gestion', 'Rapports', 'Paramètres'] }
];

export const ModuleMaintenanceManager = () => {
  const [maintenanceData, setMaintenanceData] = useState<ModuleMaintenance[]>(mockMaintenanceData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState({
    module_name: '',
    sub_module_name: '',
    maintenance_reason: '',
    estimated_end_time: '',
  });

  const handleCreateMaintenance = () => {
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
    setIsDialogOpen(false);
    setNewMaintenance({
      module_name: '',
      sub_module_name: '',
      maintenance_reason: '',
      estimated_end_time: '',
    });
  };

  const handleToggleMaintenance = (id: string) => {
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Gestion de Maintenance des Modules</span>
            </CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Nouvelle Maintenance
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Planifier une Maintenance</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="module">Module</Label>
                    <Select value={newMaintenance.module_name} onValueChange={(value) => 
                      setNewMaintenance({...newMaintenance, module_name: value, sub_module_name: ''})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un module" />
                      </SelectTrigger>
                      <SelectContent>
                        {modules.map((module) => (
                          <SelectItem key={module.id} value={module.id}>
                            {module.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {newMaintenance.module_name && (
                    <div>
                      <Label htmlFor="submodule">Sous-module (optionnel)</Label>
                      <Select value={newMaintenance.sub_module_name} onValueChange={(value) => 
                        setNewMaintenance({...newMaintenance, sub_module_name: value})
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un sous-module" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tout le module</SelectItem>
                          {modules.find(m => m.id === newMaintenance.module_name)?.submodules.map((sub) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="reason">Raison de la maintenance</Label>
                    <Textarea
                      id="reason"
                      value={newMaintenance.maintenance_reason}
                      onChange={(e) => setNewMaintenance({...newMaintenance, maintenance_reason: e.target.value})}
                      placeholder="Décrivez la raison de la maintenance..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="endTime">Fin estimée (optionnel)</Label>
                    <Input
                      id="endTime"
                      type="datetime-local"
                      value={newMaintenance.estimated_end_time}
                      onChange={(e) => setNewMaintenance({...newMaintenance, estimated_end_time: e.target.value})}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button 
                      onClick={handleCreateMaintenance}
                      disabled={!newMaintenance.module_name || !newMaintenance.maintenance_reason}
                    >
                      Planifier la Maintenance
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {maintenanceData.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <p className="text-gray-500">Aucune maintenance planifiée</p>
              <p className="text-sm text-gray-400">Tous les modules sont opérationnels</p>
            </div>
          ) : (
            <div className="space-y-4">
              {maintenanceData.map((maintenance) => (
                <div key={maintenance.id} className="border rounded-lg p-4">
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
                      onClick={() => handleToggleMaintenance(maintenance.id)}
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
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
