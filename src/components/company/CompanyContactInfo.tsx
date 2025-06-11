
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
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          {...form.register('phone')}
          placeholder="+33 1 23 45 67 89"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...form.register('email')}
          placeholder="contact@entreprise.com"
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
        )}
      </div>
    </div>
  );
};
