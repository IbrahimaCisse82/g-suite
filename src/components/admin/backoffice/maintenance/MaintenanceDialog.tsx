
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { NewMaintenanceForm } from '@/types/maintenance';
import { modules } from '@/constants/modules';

interface MaintenanceDialogProps {
  onCreateMaintenance: (maintenance: NewMaintenanceForm) => void;
}

export const MaintenanceDialog = ({ onCreateMaintenance }: MaintenanceDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState<NewMaintenanceForm>({
    module_name: '',
    sub_module_name: '',
    maintenance_reason: '',
    estimated_end_time: '',
  });

  const handleCreateMaintenance = () => {
    onCreateMaintenance(newMaintenance);
    setIsDialogOpen(false);
    setNewMaintenance({
      module_name: '',
      sub_module_name: '',
      maintenance_reason: '',
      estimated_end_time: '',
    });
  };

  return (
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
                  <SelectItem value="all">Tout le module</SelectItem>
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
  );
};
