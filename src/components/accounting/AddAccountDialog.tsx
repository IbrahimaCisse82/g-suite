
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface ChartOfAccount {
  id: string;
  accountNumber: string;
  accountTitle: string;
  accountType: string;
  hasCarryForward: boolean;
  isHidden: boolean;
}

interface AddAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAccount: (account: Omit<ChartOfAccount, 'id' | 'isHidden'>) => void;
}

export const AddAccountDialog = ({ isOpen, onClose, onAddAccount }: AddAccountDialogProps) => {
  const [newAccount, setNewAccount] = useState({
    accountNumber: '',
    accountTitle: '',
    accountType: '',
    hasCarryForward: false
  });

  const handleAddAccount = () => {
    if (!newAccount.accountNumber || !newAccount.accountTitle || !newAccount.accountType) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    onAddAccount(newAccount);
    setNewAccount({ accountNumber: '', accountTitle: '', accountType: '', hasCarryForward: false });
    onClose();
    toast.success('Compte ajouté avec succès');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouveau compte comptable</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <div>
            <label className="block text-sm font-medium mb-2">Numéro de compte *</label>
            <Input
              value={newAccount.accountNumber}
              onChange={(e) => setNewAccount({...newAccount, accountNumber: e.target.value})}
              placeholder="ex: 411"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Intitulé *</label>
            <Input
              value={newAccount.accountTitle}
              onChange={(e) => setNewAccount({...newAccount, accountTitle: e.target.value})}
              placeholder="ex: Clients"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Nature du compte *</label>
            <Input
              value={newAccount.accountType}
              onChange={(e) => setNewAccount({...newAccount, accountType: e.target.value})}
              placeholder="ex: Créances clients"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="carryForward"
              checked={newAccount.hasCarryForward}
              onCheckedChange={(checked) => setNewAccount({...newAccount, hasCarryForward: checked as boolean})}
            />
            <label htmlFor="carryForward" className="text-sm font-medium">
              Ce compte fait l'objet d'un report à nouveau
            </label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleAddAccount} className="bg-green-600 hover:bg-green-700">
              Ajouter le compte
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
