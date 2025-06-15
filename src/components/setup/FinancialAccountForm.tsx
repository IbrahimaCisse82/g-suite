
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Building, CreditCard, Smartphone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FinancialAccount {
  account_name: string;
  account_type: 'bank' | 'cash' | 'electronic_money';
  account_number?: string;
  bank_name?: string;
  branch?: string;
  currency: string;
  current_balance: number;
}

interface FinancialAccountFormProps {
  onSuccess: () => void;
}

export const FinancialAccountForm = ({ onSuccess }: FinancialAccountFormProps) => {
  const [accounts, setAccounts] = useState<FinancialAccount[]>([{
    account_name: '',
    account_type: 'bank',
    account_number: '',
    bank_name: '',
    branch: '',
    currency: 'XOF',
    current_balance: 0
  }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const accountTypes = [
    { value: 'bank', label: 'Compte bancaire', icon: Building },
    { value: 'cash', label: 'Caisse', icon: CreditCard },
    { value: 'electronic_money', label: 'Monnaie électronique', icon: Smartphone }
  ];

  const addAccount = () => {
    setAccounts([...accounts, {
      account_name: '',
      account_type: 'bank',
      account_number: '',
      bank_name: '',
      branch: '',
      currency: 'XOF',
      current_balance: 0
    }]);
  };

  const removeAccount = (index: number) => {
    if (accounts.length > 1) {
      setAccounts(accounts.filter((_, i) => i !== index));
    }
  };

  const updateAccount = (index: number, field: keyof FinancialAccount, value: any) => {
    const updatedAccounts = [...accounts];
    updatedAccounts[index] = { ...updatedAccounts[index], [field]: value };
    setAccounts(updatedAccounts);
  };

  const handleSubmit = async () => {
    // Validation
    const validAccounts = accounts.filter(account => account.account_name.trim() !== '');
    if (validAccounts.length === 0) {
      toast.error('Veuillez ajouter au moins un compte avec un nom');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Utilisateur non connecté');

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();

      if (!profile?.company_id) throw new Error('Entreprise non trouvée');

      const accountsToInsert = validAccounts.map(account => ({
        ...account,
        company_id: profile.company_id
      }));

      const { error } = await supabase
        .from('financial_accounts')
        .insert(accountsToInsert);

      if (error) throw error;

      toast.success(`${validAccounts.length} compte(s) financier(s) créé(s) avec succès`);
      onSuccess();
    } catch (error) {
      console.error('Erreur lors de la création des comptes:', error);
      toast.error('Erreur lors de la création des comptes');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {accounts.map((account, index) => {
        const TypeIcon = accountTypes.find(type => type.value === account.account_type)?.icon || Building;
        
        return (
          <Card key={index} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <TypeIcon className="w-4 h-4" />
                  <span>Compte {index + 1}</span>
                </CardTitle>
                {accounts.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAccount(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom du compte *</label>
                  <Input
                    placeholder="Ex: Compte principal UBA"
                    value={account.account_name}
                    onChange={(e) => updateAccount(index, 'account_name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type de compte</label>
                  <Select 
                    value={account.account_type} 
                    onValueChange={(value) => updateAccount(index, 'account_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {accountTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {account.account_type === 'bank' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom de la banque</label>
                    <Input
                      placeholder="Ex: UBA, Ecobank, SGBS"
                      value={account.bank_name || ''}
                      onChange={(e) => updateAccount(index, 'bank_name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Agence</label>
                    <Input
                      placeholder="Ex: Dakar Plateau"
                      value={account.branch || ''}
                      onChange={(e) => updateAccount(index, 'branch', e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Numéro de compte</label>
                  <Input
                    placeholder="Numéro du compte"
                    value={account.account_number || ''}
                    onChange={(e) => updateAccount(index, 'account_number', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Devise</label>
                  <Select 
                    value={account.currency} 
                    onValueChange={(value) => updateAccount(index, 'currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="XOF">XOF (Franc CFA)</SelectItem>
                      <SelectItem value="EUR">EUR (Euro)</SelectItem>
                      <SelectItem value="USD">USD (Dollar)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Solde initial</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={account.current_balance}
                    onChange={(e) => updateAccount(index, 'current_balance', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <div className="flex justify-between">
        <Button variant="outline" onClick={addAccount}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un autre compte
        </Button>

        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? 'Création...' : 'Enregistrer les comptes'}
        </Button>
      </div>
    </div>
  );
};
