
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateTreasuryAccount, useUpdateTreasuryAccount } from '@/hooks/useTreasuryAccounts';

interface TreasuryAccountFormProps {
  onCancel: () => void;
  account?: any;
  mode?: 'create' | 'edit';
}

export const TreasuryAccountForm = ({ onCancel, account, mode = 'create' }: TreasuryAccountFormProps) => {
  const [formData, setFormData] = useState({
    account_name: account?.account_name || '',
    account_type: account?.account_type || '',
    account_number: account?.account_number || '',
    bank_name: account?.bank_name || '',
    branch: account?.branch || '',
    currency: account?.currency || 'XOF',
    current_balance: account?.current_balance || 0
  });

  const createMutation = useCreateTreasuryAccount();
  const updateMutation = useUpdateTreasuryAccount();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'edit' && account) {
      updateMutation.mutate({
        id: account.id,
        ...formData
      });
    } else {
      createMutation.mutate(formData);
    }
    
    if (!createMutation.isPending && !updateMutation.isPending) {
      onCancel();
    }
  };

  const accountTypes = [
    { value: 'bank', label: 'Compte bancaire' },
    { value: 'cash', label: 'Caisse' },
    { value: 'electronic_money', label: 'Monnaie électronique' }
  ];

  const currencies = [
    { value: 'XOF', label: 'XOF (Franc CFA)' },
    { value: 'EUR', label: 'EUR (Euro)' },
    { value: 'USD', label: 'USD (Dollar)' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="account_name">Nom du compte *</Label>
          <Input
            id="account_name"
            value={formData.account_name}
            onChange={(e) => setFormData(prev => ({ ...prev, account_name: e.target.value }))}
            placeholder="Ex: Compte principal SGBCI"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="account_type">Type de compte *</Label>
          <Select 
            value={formData.account_type} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, account_type: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner le type" />
            </SelectTrigger>
            <SelectContent>
              {accountTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="account_number">Numéro de compte</Label>
          <Input
            id="account_number"
            value={formData.account_number}
            onChange={(e) => setFormData(prev => ({ ...prev, account_number: e.target.value }))}
            placeholder="Ex: 012345678901234"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bank_name">Nom de la banque</Label>
          <Input
            id="bank_name"
            value={formData.bank_name}
            onChange={(e) => setFormData(prev => ({ ...prev, bank_name: e.target.value }))}
            placeholder="Ex: SGBCI"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="branch">Agence</Label>
          <Input
            id="branch"
            value={formData.branch}
            onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
            placeholder="Ex: Plateau"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Devise</Label>
          <Select 
            value={formData.currency} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="current_balance">Solde initial</Label>
          <Input
            id="current_balance"
            type="number"
            step="0.01"
            value={formData.current_balance}
            onChange={(e) => setFormData(prev => ({ ...prev, current_balance: parseFloat(e.target.value) || 0 }))}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button 
          type="submit" 
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {mode === 'edit' ? 'Modifier' : 'Créer'} le compte
        </Button>
      </div>
    </form>
  );
};
