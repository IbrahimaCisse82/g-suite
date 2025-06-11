
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CompanyFormData } from '@/hooks/useCompanyRegistration';

interface CompanyRepresentativeInfoProps {
  form: UseFormReturn<CompanyFormData>;
}

export const CompanyRepresentativeInfo = ({ form }: CompanyRepresentativeInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="representative_first_name">Prénom du représentant *</Label>
        <Input
          id="representative_first_name"
          {...form.register('representative_first_name')}
          placeholder="Prénom"
        />
        {form.formState.errors.representative_first_name && (
          <p className="text-sm text-destructive">{form.formState.errors.representative_first_name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="representative_last_name">Nom du représentant *</Label>
        <Input
          id="representative_last_name"
          {...form.register('representative_last_name')}
          placeholder="Nom"
        />
        {form.formState.errors.representative_last_name && (
          <p className="text-sm text-destructive">{form.formState.errors.representative_last_name.message}</p>
        )}
      </div>
    </div>
  );
};
