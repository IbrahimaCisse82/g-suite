
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CompanyFormData } from '@/hooks/useCompanyRegistration';

interface CompanyBasicInfoProps {
  form: UseFormReturn<CompanyFormData>;
}

export const CompanyBasicInfo = ({ form }: CompanyBasicInfoProps) => {
  return (
    <>
      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Nom de l'entreprise *</Label>
        <Input
          id="name"
          {...form.register('name')}
          placeholder="Nom de votre entreprise"
        />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
        )}
      </div>

      {/* Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Adresse *</Label>
          <Input
            id="address"
            {...form.register('address')}
            placeholder="Adresse complète"
          />
          {form.formState.errors.address && (
            <p className="text-sm text-destructive">{form.formState.errors.address.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Ville *</Label>
          <Input
            id="city"
            {...form.register('city')}
            placeholder="Ville"
          />
          {form.formState.errors.city && (
            <p className="text-sm text-destructive">{form.formState.errors.city.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Pays</Label>
        <Input
          id="country"
          {...form.register('country')}
          placeholder="Pays"
        />
      </div>
    </>
  );
};
