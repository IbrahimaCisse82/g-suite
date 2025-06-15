import React, { useState } from 'react';
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
      currency: 'XOF',
      business_sector: 'commerce',
    },
  });

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
      { ...data, plan_type: selectedModule },
      logoFile,
      "paid"
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-6 w-6" />
          Créer le profil de votre entreprise
        </CardTitle>
        <CardDescription>
          Renseignez les informations de votre entreprise pour demander une clé licence G-Suite.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Choix obligatoire de la solution/module */}
          <div className="space-y-3">
            <Label>Solution G-Suite souhaitée <span className="text-red-500">*</span></Label>
            <select
              className="w-full border rounded-md px-3 py-2"
              value={selectedModule}
              onChange={e => setSelectedModule(e.target.value)}
              required
            >
              {MODULE_OPTIONS.map(opt =>
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              )}
            </select>
          </div>

          <CompanyLogoUpload 
            logoPreview={logoPreview} 
            onLogoChange={handleLogoChange} 
          />

          <CompanyBasicInfo form={form} />

          <CompanyContactInfo form={form} />

          <CompanyBusinessInfo form={form} />

          <CompanyRepresentativeInfo form={form} />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Création en cours..." : "Demander ma clé licence"}
          </Button>
          <div className="text-sm text-gray-600 text-center">
            Votre demande sera validée sous 24h. Vous recevrez un email avec votre clé licence.
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
