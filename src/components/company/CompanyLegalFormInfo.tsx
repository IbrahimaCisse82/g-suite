
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormData {
  name: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  email: string;
  business_sector: "agriculture" | "industrie" | "construction" | "commerce" | "transport" | "hebergement_restauration" | "information_communication" | "activites_financieres" | "immobilier" | "activites_specialisees" | "administration_publique" | "enseignement" | "sante_action_sociale" | "arts_spectacles" | "autres_services";
  forme_juridique: "entreprise_individuelle" | "gie" | "sarl" | "sa" | "snc" | "scs" | "societe_civile" | "sas" | "societe_sans_personnalite_juridique";
  currency: string;
  representative_title: "M." | "Mme" | "Mlle";
  representative_first_name: string;
  representative_last_name: string;
  ninea?: string;
  rccm?: string;
  website?: string;
}

interface CompanyLegalFormInfoProps {
  form: UseFormReturn<FormData>;
}

const LEGAL_FORMS = [
  { value: 'entreprise_individuelle', label: 'Entreprise individuelle' },
  { value: 'gie', label: 'GIE' },
  { value: 'sarl', label: 'Société à Responsabilité Limitée (SARL)' },
  { value: 'sa', label: 'Société Anonyme (SA)' },
  { value: 'snc', label: 'Société en Nom Collectif (SNC)' },
  { value: 'scs', label: 'Société en Commandite Simple (SCS)' },
  { value: 'societe_civile', label: 'Société Civile' },
  { value: 'sas', label: 'Société par Action Simplifiée (SAS)' },
  { value: 'societe_sans_personnalite_juridique', label: 'Société sans personnalité juridique' },
];

export const CompanyLegalFormInfo = ({ form }: CompanyLegalFormInfoProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="forme_juridique" className="text-slate-800 font-bold text-base">
        Forme juridique <span className="text-red-600 font-bold">*</span>
      </Label>
      <Select
        value={form.watch('forme_juridique')}
        onValueChange={(value) => form.setValue('forme_juridique', value as any)}
      >
        <SelectTrigger className="border-2 border-slate-400 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 py-3 shadow-sm">
          <SelectValue placeholder="Sélectionner une forme juridique" />
        </SelectTrigger>
        <SelectContent className="bg-white border-2 border-slate-400 shadow-lg max-h-60 overflow-y-auto">
          {LEGAL_FORMS.map((form) => (
            <SelectItem key={form.value} value={form.value} className="font-semibold hover:bg-slate-100">
              {form.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {form.formState.errors.forme_juridique && (
        <p className="text-sm text-red-600 font-bold">{form.formState.errors.forme_juridique.message}</p>
      )}
    </div>
  );
};
