
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CompanyFormData } from '@/hooks/useCompanyRegistration';
import type { Database } from '@/integrations/supabase/types';

type BusinessSector = Database['public']['Enums']['business_sector'];

const businessSectors: { value: BusinessSector; label: string }[] = [
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'industrie', label: 'Industrie' },
  { value: 'construction', label: 'Construction' },
  { value: 'commerce', label: 'Commerce' },
  { value: 'transport', label: 'Transport' },
  { value: 'hebergement_restauration', label: 'Hébergement et Restauration' },
  { value: 'information_communication', label: 'Information et Communication' },
  { value: 'activites_financieres', label: 'Activités Financières' },
  { value: 'immobilier', label: 'Immobilier' },
  { value: 'activites_specialisees', label: 'Activités Spécialisées' },
  { value: 'administration_publique', label: 'Administration Publique' },
  { value: 'enseignement', label: 'Enseignement' },
  { value: 'sante_action_sociale', label: 'Santé et Action Sociale' },
  { value: 'arts_spectacles', label: 'Arts et Spectacles' },
  { value: 'autres_services', label: 'Autres Services' },
];

const currencies = [
  { value: 'XOF', label: 'Franc CFA (XOF)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'USD', label: 'Dollar américain (USD)' },
  { value: 'GBP', label: 'Livre sterling (GBP)' },
  { value: 'CHF', label: 'Franc suisse (CHF)' },
  { value: 'MAD', label: 'Dirham marocain (MAD)' },
  { value: 'TND', label: 'Dinar tunisien (TND)' },
  { value: 'DZD', label: 'Dinar algérien (DZD)' },
];

interface CompanyBusinessInfoProps {
  form: UseFormReturn<CompanyFormData>;
}

export const CompanyBusinessInfo = ({ form }: CompanyBusinessInfoProps) => {
  return (
    <>
      {/* Business Sector */}
      <div className="space-y-2">
        <Label htmlFor="business_sector">Secteur d'activité *</Label>
        <Select 
          value={form.watch('business_sector')} 
          onValueChange={(value) => form.setValue('business_sector', value as BusinessSector)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez votre secteur d'activité" />
          </SelectTrigger>
          <SelectContent>
            {businessSectors.map((sector) => (
              <SelectItem key={sector.value} value={sector.value}>
                {sector.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.business_sector && (
          <p className="text-sm text-destructive">{form.formState.errors.business_sector.message}</p>
        )}
      </div>

      {/* Currency Selection */}
      <div className="space-y-2">
        <Label htmlFor="currency">Devise *</Label>
        <Select 
          value={form.watch('currency')} 
          onValueChange={(value) => form.setValue('currency', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez votre devise" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency.value} value={currency.value}>
                {currency.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.currency && (
          <p className="text-sm text-destructive">{form.formState.errors.currency.message}</p>
        )}
      </div>

      {/* NINEA and RCCM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ninea">NINEA</Label>
          <Input
            id="ninea"
            {...form.register('ninea')}
            placeholder="Numéro NINEA"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rccm">RCCM</Label>
          <Input
            id="rccm"
            {...form.register('rccm')}
            placeholder="Numéro RCCM"
          />
        </div>
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label htmlFor="website">Site web</Label>
        <Input
          id="website"
          type="url"
          {...form.register('website')}
          placeholder="https://www.votre-site.com"
        />
        {form.formState.errors.website && (
          <p className="text-sm text-destructive">{form.formState.errors.website.message}</p>
        )}
      </div>
    </>
  );
};
