
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CompanyFormData } from '@/hooks/useCompanyRegistration';

interface CompanyContactInfoProps {
  form: UseFormReturn<CompanyFormData>;
}

export const CompanyContactInfo = ({ form }: CompanyContactInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-slate-800 font-semibold">Téléphone</Label>
        <Input
          id="phone"
          {...form.register('phone')}
          placeholder="+33 1 23 45 67 89"
          className="border-2 border-gray-300 bg-white text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-800 font-semibold">Email <span className="text-red-600">*</span></Label>
        <Input
          id="email"
          type="email"
          {...form.register('email')}
          placeholder="contact@entreprise.com"
          className="border-2 border-gray-300 bg-white text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-600 font-medium">{form.formState.errors.email.message}</p>
        )}
      </div>
    </div>
  );
};
