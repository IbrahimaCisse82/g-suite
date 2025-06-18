
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FormData {
  name: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  email: string;
  business_sector: string;
  currency: string;
  representative_title: string;
  representative_first_name: string;
  representative_last_name: string;
  ninea?: string;
  rccm?: string;
  website?: string;
}

interface CompanyContactInfoProps {
  form: UseFormReturn<FormData>;
}

export const CompanyContactInfo = ({ form }: CompanyContactInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-slate-800 font-bold text-base">Téléphone</Label>
        <Input
          id="phone"
          {...form.register('phone')}
          placeholder="+33 1 23 45 67 89"
          className="border-2 border-slate-400 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 py-3 shadow-sm"
        />
        <p className="text-xs text-slate-600 font-semibold">L'indicatif se met à jour automatiquement selon le pays</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-800 font-bold text-base">Email <span className="text-red-600 font-bold">*</span></Label>
        <Input
          id="email"
          type="email"
          {...form.register('email')}
          placeholder="contact@entreprise.com"
          className="border-2 border-slate-400 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 py-3 shadow-sm"
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-600 font-bold">{form.formState.errors.email.message}</p>
        )}
      </div>
    </div>
  );
};
