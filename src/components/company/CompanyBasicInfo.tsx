
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COUNTRIES } from '@/utils/countryData';

interface FormData {
  name: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  email: string;
  business_sector: "agriculture" | "industrie" | "construction" | "commerce" | "transport" | "hebergement_restauration" | "information_communication" | "activites_financieres" | "immobilier" | "activites_specialisees" | "administration_publique" | "enseignement" | "sante_action_sociale" | "arts_spectacles" | "autres_services";
  currency: string;
  representative_title: "M." | "Mme" | "Mlle";
  representative_first_name: string;
  representative_last_name: string;
  ninea?: string;
  rccm?: string;
  website?: string;
}

interface CompanyBasicInfoProps {
  form: UseFormReturn<FormData>;
}

export const CompanyBasicInfo = ({ form }: CompanyBasicInfoProps) => {
  return (
    <>
      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-slate-800 font-bold text-base">Nom de l'entreprise <span className="text-red-600 font-bold">*</span></Label>
        <Input
          id="name"
          {...form.register('name')}
          placeholder="Nom de votre entreprise"
          className="border-2 border-slate-400 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 py-3 shadow-sm"
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-600 font-bold">{form.formState.errors.name.message}</p>
        )}
      </div>

      {/* Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address" className="text-slate-800 font-bold text-base">Adresse <span className="text-red-600 font-bold">*</span></Label>
          <Input
            id="address"
            {...form.register('address')}
            placeholder="Adresse complète"
            className="border-2 border-slate-400 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 py-3 shadow-sm"
          />
          {form.formState.errors.address && (
            <p className="text-sm text-red-600 font-bold">{form.formState.errors.address.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="city" className="text-slate-800 font-bold text-base">Ville <span className="text-red-600 font-bold">*</span></Label>
          <Input
            id="city"
            {...form.register('city')}
            placeholder="Ville"
            className="border-2 border-slate-400 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 py-3 shadow-sm"
          />
          {form.formState.errors.city && (
            <p className="text-sm text-red-600 font-bold">{form.formState.errors.city.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country" className="text-slate-800 font-bold text-base">Pays <span className="text-red-600 font-bold">*</span></Label>
        <Select
          value={form.watch('country')}
          onValueChange={(value) => form.setValue('country', value)}
        >
          <SelectTrigger className="border-2 border-slate-400 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 py-3 shadow-sm">
            <SelectValue placeholder="Sélectionner un pays" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-slate-400 shadow-lg">
            {COUNTRIES.map((country) => (
              <SelectItem key={country.code} value={country.name} className="font-semibold hover:bg-slate-100">
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
