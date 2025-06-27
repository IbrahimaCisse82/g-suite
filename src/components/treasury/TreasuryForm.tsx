
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTreasuryAccounts } from '@/hooks/useTreasuryAccounts';

interface TreasuryFormProps {
  onSubmit: (transactionData: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const TreasuryForm = ({ onSubmit, onCancel, loading }: TreasuryFormProps) => {
  const [formData, setFormData] = useState({
    account_id: '',
    transaction_type: '',
    amount: 0,
    description: '',
    category: '',
    transaction_date: new Date().toISOString().split('T')[0]
  });

  const { data: accounts = [] } = useTreasuryAccounts();

  const categories = [
    'Ventes',
    'Prestations de services',
    'Fournitures',
    'Loyer',
    'Salaires',
    'Charges sociales',
    'Électricité',
    'Téléphone',
    'Assurances',
    'Transport',
    'Marketing',
    'Frais bancaires',
    'Autre'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="account_id">Compte de trésorerie</Label>
          <Select 
            value={formData.account_id} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, account_id: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un compte" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.account_name} ({account.currency})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="transaction_type">Type de transaction</Label>
          <Select 
            value={formData.transaction_type} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, transaction_type: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner le type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Recette</SelectItem>
              <SelectItem value="expense">Dépense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Montant</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transaction_date">Date</Label>
          <Input
            id="transaction_date"
            type="date"
            value={formData.transaction_date}
            onChange={(e) => setFormData(prev => ({ ...prev, transaction_date: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Description de la transaction..."
          rows={3}
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer la transaction'}
        </Button>
      </div>
    </form>
  );
};
