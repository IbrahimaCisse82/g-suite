
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CompanyFormData } from '@/hooks/useCompanyRegistration';
import { CURRENCIES } from '@/utils/countryData';

interface CompanyBusinessInfoProps {
  form: UseFormReturn<CompanyFormData>;
}

export const CompanyBusinessInfo = ({ form }: CompanyBusinessInfoProps) => {
  const businessSectors = [
    { value: 'agriculture', label: 'Agriculture, sylviculture et pêche' },
    { value: 'industrie', label: 'Industrie manufacturière' },
    { value: 'construction', label: 'Construction' },
    { value: 'commerce', label: 'Commerce de gros et de détail' },
    { value: 'transport', label: 'Transports et entreposage' },
    { value: 'hebergement_restauration', label: 'Hébergement et restauration' },
    { value: 'information_communication', label: 'Information et communication' },
    { value: 'activites_financieres', label: 'Activités financières et d\'assurance' },
    { value: 'immobilier', label: 'Activités immobilières' },
    { value: 'activites_specialisees', label: 'Activités spécialisées, scientifiques et techniques' },
    { value: 'administration_publique', label: 'Administration publique' },
    { value: 'enseignement', label: 'Enseignement' },
    { value: 'sante_action_sociale', label: 'Santé humaine et action sociale' },
    { value: 'arts_spectacles', label: 'Arts, spectacles et activités récréatives' },
    { value: 'autres_services', label: 'Autres activités de services' },
  ];

  return (
    <>
      {/* Business Sector */}
      <div className="space-y-2">
        <Label htmlFor="business_sector" className="text-slate-800 font-bold text-base">Secteur d'activité <span className="text-red-600 font-bold">*</span></Label>
        <Select
          value={form.watch('business_sector')}
          onValueChange={(value) => form.setValue('business_sector', value as any)}
        >
          <SelectTrigger className="border-2 border-slate-400 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 py-3 shadow-sm">
            <SelectValue placeholder="Sélectionner un secteur" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-slate-400 shadow-lg">
            {businessSectors.map((sector) => (
              <SelectItem key={sector.value} value={sector.value} className="font-semibold hover:bg-slate-100">
                {sector.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.business_sector && (
          <p className="text-sm text-red-600 font-bold">{form.formState.errors.business_sector.message}</p>
        )}
      </div>

      {/* Currency */}
      <div className="space-y-2">
        <Label htmlFor="currency" className="text-slate-800 font-bold text-base">Devise de travail <span className="text-red-600 font-bold">*</span></Label>
        <Select
          value={form.watch('currency')}
          onValueChange={(value) => form.setValue('currency', value)}
        >
          <SelectTrigger className="border-2 border-slate-400 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 py-3 shadow-sm">
            <SelectValue placeholder="Sélectionner une devise" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-slate-400 shadow-lg">
            {CURRENCIES.map((currency) => (
              <SelectItem key={currency.code} value={currency.code} className="font-semibold hover:bg-slate-100">
                {currency.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-slate-600 font-semibold">La devise se met à jour automatiquement selon le pays</p>
        {form.formState.errors.currency && (
          <p className="text-sm text-red-600 font-bold">{form.formState.errors.currency.message}</p>
        )}
      </div>

      {/* Additional fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ninea" className="text-slate-800 font-bold text-base">NINEA</Label>
          <Input
            id="ninea"
            {...form.register('ninea')}
            placeholder="Numéro NINEA"
            className="border-2 border-slate-400 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 py-3 shadow-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rccm" className="text-slate-800 font-bold text-base">RCCM</Label>
          <Input
            id="rccm"
            {...form.register('rccm')}
            placeholder="Numéro RCCM"
            className="border-2 border-slate-400 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 py-3 shadow-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website" className="text-slate-800 font-bold text-base">Site web</Label>
        <Input
          id="website"
          type="url"
          {...form.register('website')}
          placeholder="https://www.exemple.com"
          className="border-2 border-slate-400 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 py-3 shadow-sm"
        />
        {form.formState.errors.website && (
          <p className="text-sm text-red-600 font-bold">{form.formState.errors.website.message}</p>
        )}
      </div>
    </>
  );
};
