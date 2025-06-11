
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Building, Upload } from 'lucide-react';
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

type CompanyFormData = z.infer<typeof companySchema>;

interface CompanyRegistrationFormProps {
  onSuccess?: () => void;
}

export const CompanyRegistrationForm = ({ onSuccess }: CompanyRegistrationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const { toast } = useToast();

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

  const uploadLogo = async (companyId: string, file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${companyId}/logo.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('company-logos')
        .upload(fileName, file, {
          upsert: true
        });

      if (uploadError) {
        console.error('Erreur upload logo:', uploadError);
        return null;
      }

      const { data } = supabase.storage
        .from('company-logos')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Erreur inattendue upload logo:', error);
      return null;
    }
  };

  const onSubmit = async (data: CompanyFormData) => {
    console.log('Début de la soumission du formulaire:', data);
    setIsLoading(true);
    
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('Erreur utilisateur:', userError);
        toast({
          title: 'Erreur',
          description: 'Vous devez être connecté pour créer une entreprise',
          variant: 'destructive',
        });
        return;
      }

      console.log('Utilisateur connecté:', user.id);

      // Create company first
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert({
          name: data.name,
          address: data.address,
          city: data.city,
          country: data.country,
          phone: data.phone,
          email: data.email,
          business_sector: data.business_sector,
          currency: data.currency,
          representative_first_name: data.representative_first_name,
          representative_last_name: data.representative_last_name,
          ninea: data.ninea,
          rccm: data.rccm,
          website: data.website || null,
        })
        .select()
        .single();

      if (companyError) {
        console.error('Erreur création entreprise:', companyError);
        toast({
          title: 'Erreur',
          description: 'Erreur lors de la création de l\'entreprise: ' + companyError.message,
          variant: 'destructive',
        });
        return;
      }

      console.log('Entreprise créée:', companyData);

      // Upload logo if provided
      let logoUrl = null;
      if (logoFile) {
        logoUrl = await uploadLogo(companyData.id, logoFile);
        if (logoUrl) {
          // Update company with logo URL
          const { error: logoUpdateError } = await supabase
            .from('companies')
            .update({ logo_url: logoUrl })
            .eq('id', companyData.id);

          if (logoUpdateError) {
            console.error('Erreur mise à jour logo:', logoUpdateError);
          }
        }
      }

      // Update user profile to link to company and make them admin
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          company_id: companyData.id,
          is_company_admin: true,
        })
        .eq('id', user.id);

      if (profileError) {
        console.error('Erreur mise à jour profil:', profileError);
        toast({
          title: 'Attention',
          description: 'L\'entreprise a été créée mais votre profil n\'a pas pu être mis à jour',
          variant: 'destructive',
        });
      }

      console.log('Profil mis à jour avec succès');

      toast({
        title: 'Succès',
        description: 'Votre entreprise a été créée avec succès !',
      });

      onSuccess?.();
      
    } catch (error) {
      console.error('Erreur inattendue:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur inattendue s\'est produite',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-6 w-6" />
          Créer le profil de votre entreprise
        </CardTitle>
        <CardDescription>
          Renseignez les informations de votre entreprise pour commencer à utiliser G-Compta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Logo Upload */}
          <div className="space-y-2">
            <Label htmlFor="logo">Logo de l'entreprise</Label>
            <div className="flex items-center gap-4">
              {logoPreview && (
                <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Formats acceptés: JPG, PNG, GIF. Taille max: 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nom de l'entreprise *</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="Nom de votre entreprise"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Adresse *</Label>
              <Input
                id="address"
                {...form.register('address')}
                placeholder="Adresse complète"
              />
              {form.formState.errors.address && (
                <p className="text-sm text-destructive">{form.formState.errors.address.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ville *</Label>
              <Input
                id="city"
                {...form.register('city')}
                placeholder="Ville"
              />
              {form.formState.errors.city && (
                <p className="text-sm text-destructive">{form.formState.errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Pays</Label>
            <Input
              id="country"
              {...form.register('country')}
              placeholder="Pays"
            />
          </div>

          {/* Contact Info */}
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

          {/* Representative */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="representative_first_name">Prénom du représentant *</Label>
              <Input
                id="representative_first_name"
                {...form.register('representative_first_name')}
                placeholder="Prénom"
              />
              {form.formState.errors.representative_first_name && (
                <p className="text-sm text-destructive">{form.formState.errors.representative_first_name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="representative_last_name">Nom du représentant *</Label>
              <Input
                id="representative_last_name"
                {...form.register('representative_last_name')}
                placeholder="Nom"
              />
              {form.formState.errors.representative_last_name && (
                <p className="text-sm text-destructive">{form.formState.errors.representative_last_name.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Création en cours...' : 'Créer l\'entreprise'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
