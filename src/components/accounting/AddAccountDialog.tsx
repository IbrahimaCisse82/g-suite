
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface ChartOfAccount {
  accountNumber: string;
  accountTitle: string;
  accountType: string;
  hasCarryForward: boolean;
}

interface AddAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAccount: (account: ChartOfAccount) => void;
}

const accountTypes = [
  'Capitaux',
  'Immobilisation',
  'Stock',
  'Client',
  'Fournisseur',
  'Banque',
  'Charge',
  'Produit',
  'Salarie',
  'Amortis/Provision',
  'Titre',
  'Résultat-Bilan',
  'Resulat-Gestion'
];

export const AddAccountDialog = ({ isOpen, onClose, onAddAccount }: AddAccountDialogProps) => {
  const [formData, setFormData] = useState<ChartOfAccount>({
    accountNumber: '',
    accountTitle: '',
    accountType: '',
    hasCarryForward: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.accountNumber || !formData.accountTitle || !formData.accountType) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    onAddAccount(formData);
    setFormData({
      accountNumber: '',
      accountTitle: '',
      accountType: '',
      hasCarryForward: false
    });
    onClose();
    toast.success('Compte ajouté avec succès');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau compte</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="accountNumber">Numéro de compte *</Label>
            <Input
              id="accountNumber"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              placeholder="Ex: 411"
              required
            />
          </div>

          <div>
            <Label htmlFor="accountTitle">Intitulé du compte *</Label>
            <Input
              id="accountTitle"
              value={formData.accountTitle}
              onChange={(e) => setFormData({ ...formData, accountTitle: e.target.value })}
              placeholder="Ex: Clients"
              required
            />
          </div>

          <div>
            <Label htmlFor="accountType">Type de compte *</Label>
            <Select value={formData.accountType} onValueChange={(value) => setFormData({ ...formData, accountType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                {accountTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="hasCarryForward"
              checked={formData.hasCarryForward}
              onCheckedChange={(checked) => setFormData({ ...formData, hasCarryForward: checked })}
            />
            <Label htmlFor="hasCarryForward">Report à nouveau</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Ajouter
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
