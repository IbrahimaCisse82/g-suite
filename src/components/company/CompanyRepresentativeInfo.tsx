
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

interface CompanyRepresentativeInfoProps {
  form: UseFormReturn<FormData>;
}

export const CompanyRepresentativeInfo = ({ form }: CompanyRepresentativeInfoProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="representative_title" className="text-slate-800 font-bold text-base">Civilité du représentant <span className="text-red-600 font-bold">*</span></Label>
        <Select
          value={form.watch('representative_title')}
          onValueChange={(value) => form.setValue('representative_title', value as FormData['representative_title'])}
        >
          <SelectTrigger className="border-2 border-slate-400 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 py-3 shadow-sm">
            <SelectValue placeholder="Sélectionner une civilité" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-slate-400 shadow-lg">
            <SelectItem value="M." className="font-semibold hover:bg-slate-100">M.</SelectItem>
            <SelectItem value="Mme" className="font-semibold hover:bg-slate-100">Mme</SelectItem>
            <SelectItem value="Mlle" className="font-semibold hover:bg-slate-100">Mlle</SelectItem>
          </SelectContent>
        </Select>
        {form.formState.errors.representative_title && (
          <p className="text-sm text-red-600 font-bold">{form.formState.errors.representative_title.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="representative_first_name" className="text-slate-800 font-bold text-base">Prénom du représentant <span className="text-red-600 font-bold">*</span></Label>
          <Input
            id="representative_first_name"
            {...form.register('representative_first_name')}
            placeholder="Prénom"
            className="border-2 border-slate-400 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 py-3 shadow-sm"
          />
          {form.formState.errors.representative_first_name && (
            <p className="text-sm text-red-600 font-bold">{form.formState.errors.representative_first_name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="representative_last_name" className="text-slate-800 font-bold text-base">Nom du représentant <span className="text-red-600 font-bold">*</span></Label>
          <Input
            id="representative_last_name"
            {...form.register('representative_last_name')}
            placeholder="Nom"
            className="border-2 border-slate-400 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 py-3 shadow-sm"
          />
          {form.formState.errors.representative_last_name && (
            <p className="text-sm text-red-600 font-bold">{form.formState.errors.representative_last_name.message}</p>
          )}
        </div>
      </div>
    </>
  );
};
