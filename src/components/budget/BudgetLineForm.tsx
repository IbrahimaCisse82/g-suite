
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface BudgetLineFormData {
  account_number: string;
  account_name: string;
  budgeted_amount: number;
  category: string;
  notes?: string;
}

interface BudgetLineFormProps {
  onSubmit: (data: BudgetLineFormData) => void;
  onCancel: () => void;
}

export const BudgetLineForm = ({ onSubmit, onCancel }: BudgetLineFormProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BudgetLineFormData>();

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="account_number">Numéro de compte</Label>
            <Input
              id="account_number"
              {...register('account_number', { required: 'Le numéro de compte est requis' })}
              placeholder="60100"
            />
            {errors.account_number && <p className="text-red-500 text-sm">{errors.account_number.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="account_name">Nom du compte</Label>
            <Input
              id="account_name"
              {...register('account_name', { required: 'Le nom du compte est requis' })}
              placeholder="Achats de marchandises"
            />
            {errors.account_name && <p className="text-red-500 text-sm">{errors.account_name.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="budgeted_amount">Montant budgété</Label>
            <Input
              id="budgeted_amount"
              type="number"
              step="0.01"
              {...register('budgeted_amount', { required: 'Le montant est requis', min: 0 })}
              placeholder="0.00"
            />
            {errors.budgeted_amount && <p className="text-red-500 text-sm">{errors.budgeted_amount.message}</p>}
          </div>

          <div>
            <Label htmlFor="category">Catégorie</Label>
            <Select onValueChange={(value) => setValue('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personnel">Personnel</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="operations">Opérations</SelectItem>
                <SelectItem value="achats">Achats</SelectItem>
                <SelectItem value="ventes">Ventes</SelectItem>
                <SelectItem value="autres">Autres</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            {...register('notes')}
            placeholder="Notes optionnelles..."
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            Ajouter la ligne
          </Button>
        </div>
      </form>
    </div>
  );
};
