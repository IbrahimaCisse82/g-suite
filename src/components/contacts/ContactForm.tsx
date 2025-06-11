
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Database } from '@/integrations/supabase/types';

type ContactInsert = Database['public']['Tables']['contacts']['Insert'];

const contactSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  type: z.enum(['client', 'fournisseur', 'both']),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
  siret: z.string().optional(),
  tax_number: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSubmit: (data: Omit<ContactInsert, 'company_id'>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const ContactForm = ({ onSubmit, onCancel, loading }: ContactFormProps) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      country: 'Sénégal',
    },
  });

  const typeValue = watch('type');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nom *</Label>
          <Input {...register('name')} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="type">Type *</Label>
          <Select onValueChange={(value) => setValue('type', value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="fournisseur">Fournisseur</SelectItem>
              <SelectItem value="both">Client & Fournisseur</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" {...register('email')} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input {...register('phone')} />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Adresse</Label>
        <Textarea {...register('address')} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">Ville</Label>
          <Input {...register('city')} />
        </div>
        
        <div>
          <Label htmlFor="postal_code">Code postal</Label>
          <Input {...register('postal_code')} />
        </div>
        
        <div>
          <Label htmlFor="country">Pays</Label>
          <Input {...register('country')} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="siret">SIRET</Label>
          <Input {...register('siret')} />
        </div>
        
        <div>
          <Label htmlFor="tax_number">Numéro de TVA</Label>
          <Input {...register('tax_number')} />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Ajout...' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};
