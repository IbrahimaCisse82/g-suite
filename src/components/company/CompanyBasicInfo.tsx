
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
        <Label htmlFor="name" className="text-slate-800 font-semibold">Nom de l'entreprise <span className="text-red-600">*</span></Label>
        <Input
          id="name"
          {...form.register('name')}
          placeholder="Nom de votre entreprise"
          className="border-2 border-gray-300 bg-white text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-600 font-medium">{form.formState.errors.name.message}</p>
        )}
      </div>

      {/* Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address" className="text-slate-800 font-semibold">Adresse <span className="text-red-600">*</span></Label>
          <Input
            id="address"
            {...form.register('address')}
            placeholder="Adresse complète"
            className="border-2 border-gray-300 bg-white text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
          {form.formState.errors.address && (
            <p className="text-sm text-red-600 font-medium">{form.formState.errors.address.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="city" className="text-slate-800 font-semibold">Ville <span className="text-red-600">*</span></Label>
          <Input
            id="city"
            {...form.register('city')}
            placeholder="Ville"
            className="border-2 border-gray-300 bg-white text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
          {form.formState.errors.city && (
            <p className="text-sm text-red-600 font-medium">{form.formState.errors.city.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country" className="text-slate-800 font-semibold">Pays</Label>
        <Input
          id="country"
          {...form.register('country')}
          placeholder="Pays"
          className="border-2 border-gray-300 bg-white text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
      </div>
    </>
  );
};
