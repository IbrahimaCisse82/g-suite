
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface ImportAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportAccountDialog = ({ isOpen, onClose }: ImportAccountDialogProps) => {
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (fileType === 'csv' || fileType === 'xlsx') {
        toast.success(`Import du fichier ${file.name} en cours...`);
        // Ici on implémenterait la logique d'import
        onClose();
      } else {
        toast.error('Format de fichier non supporté. Utilisez CSV ou XLSX.');
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Importer un plan comptable</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Fichier (CSV ou XLSX)
            </label>
            <Input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileImport}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-2">Format attendu (SYSCOHADA RÉVISÉ) :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Colonne 1: Numéro de compte</li>
              <li>Colonne 2: Intitulé</li>
              <li>Colonne 3: Nature du compte</li>
              <li>Colonne 4: Report à nouveau (Oui/Non ou 1/0)</li>
            </ul>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
