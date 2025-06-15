
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Building } from 'lucide-react';
import { useCompanyRegistration, type CompanyFormData } from '@/hooks/useCompanyRegistration';
import { CompanyLogoUpload } from '@/components/company/CompanyLogoUpload';
import { CompanyBasicInfo } from '@/components/company/CompanyBasicInfo';
import { CompanyContactInfo } from '@/components/company/CompanyContactInfo';
import { CompanyBusinessInfo } from '@/components/company/CompanyBusinessInfo';
import { CompanyRepresentativeInfo } from '@/components/company/CompanyRepresentativeInfo';
import { useSearchParams } from "react-router-dom";
import { getCountryByName } from '@/utils/countryData';

const companySchema = z.object({
  name: z.string().min(2, 'Le nom de l\'entreprise doit contenir au moins 2 caractères'),
  address: z.string().min(5, 'L\'adresse doit contenir au moins 5 caractères'),
  city: z.string().min(2, 'La ville doit contenir au moins 2 caractères'),
  country: z.string().default('France'),
  phone: z.string().optional(),
  email: z.string().email('Adresse email invalide'),
  business_sector: z.enum([
    'agriculture', 'industrie', 'construction', 'commerce', 'transport',
    'hebergement_restauration', 'information_communication', 'activites_financieres',
    'immobilier', 'activites_specialisees', 'administration_publique',
    'enseignement', 'sante_action_sociale', 'arts_spectacles', 'autres_services'
  ]),
  currency: z.string().min(1, 'Veuillez sélectionner une devise'),
  representative_title: z.enum(['M.', 'Mme', 'Mlle'], 'Veuillez sélectionner une civilité'),
  representative_first_name: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  representative_last_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  ninea: z.string().optional(),
  rccm: z.string().optional(),
  website: z.string().url('URL invalide').optional().or(z.literal('')),
});

interface CompanyRegistrationFormProps {
  onSuccess?: () => void;
}

export const CompanyRegistrationForm = ({ onSuccess }: CompanyRegistrationFormProps) => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [searchParams] = useSearchParams();
  const moduleParam = searchParams.get('solution');
  const MODULE_OPTIONS = [
    { value: "entreprise", label: "Gestion d'Entreprise" },
    { value: "comptable", label: "Comptabilité" },
    { value: "commerciale", label: "Commerciale" }
  ];
  const [selectedModule, setSelectedModule] = useState<string>(
    moduleParam || "entreprise"
  );
  const { isLoading, submitForm } = useCompanyRegistration(onSuccess);

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      country: 'France',
      website: '',
      currency: 'EUR',
      business_sector: 'commerce',
      representative_title: 'M.',
    },
  });

  // Gérer le changement de pays automatiquement
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'country' && value.country) {
        const countryData = getCountryByName(value.country);
        if (countryData) {
          form.setValue('currency', countryData.currency);
          // Mettre à jour l'indicatif si le téléphone est vide ou commence par un autre indicatif
          const currentPhone = form.getValues('phone');
          if (!currentPhone || currentPhone.startsWith('+')) {
            form.setValue('phone', countryData.phoneCode + ' ');
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CompanyFormData) => {
    await submitForm(
      data, // strictly CompanyFormData type as expected by hook
      logoFile,
      "paid"
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-xl border-2 border-slate-300">
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg border-b-4 border-emerald-800">
        <CardTitle className="flex items-center gap-2 text-white font-bold text-xl">
          <Building className="h-6 w-6 text-white" />
          Créer le profil de votre entreprise
        </CardTitle>
        <CardDescription className="text-emerald-100 font-semibold">
          Renseignez les informations de votre entreprise pour demander une clé licence G-Suite.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Choix obligatoire de la solution/module */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
            <Label className="text-slate-800 font-bold text-base">Solution G-Suite souhaitée <span className="text-red-600 font-bold">*</span></Label>
            <select
              className="w-full border-3 border-slate-400 rounded-md px-3 py-3 bg-white text-slate-800 font-semibold focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              value={selectedModule}
              onChange={e => setSelectedModule(e.target.value)}
              required
            >
              {MODULE_OPTIONS.map(opt =>
                <option key={opt.value} value={opt.value} className="text-slate-800 font-semibold">{opt.label}</option>
              )}
            </select>
          </div>

          <div className="border-2 border-slate-200 rounded-lg p-4">
            <CompanyLogoUpload 
              logoPreview={logoPreview} 
              onLogoChange={handleLogoChange} 
            />
          </div>

          <div className="border-2 border-slate-200 rounded-lg p-4 space-y-4">
            <CompanyBasicInfo form={form} />
          </div>

          <div className="border-2 border-slate-200 rounded-lg p-4 space-y-4">
            <CompanyContactInfo form={form} />
          </div>

          <div className="border-2 border-slate-200 rounded-lg p-4 space-y-4">
            <CompanyBusinessInfo form={form} />
          </div>

          <div className="border-2 border-slate-200 rounded-lg p-4 space-y-4">
            <CompanyRepresentativeInfo form={form} />
          </div>

          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 text-lg border-3 border-emerald-600 shadow-lg" disabled={isLoading}>
            {isLoading ? "Création en cours..." : "Demander ma clé licence"}
          </Button>
          <div className="text-sm text-slate-700 text-center font-bold bg-slate-100 p-4 rounded-md border-2 border-slate-300">
            Votre demande sera validée sous 24h. Vous recevrez un email avec votre clé licence.
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
