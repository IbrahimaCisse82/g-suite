
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
  contact_number: z.string().min(1, 'Le numéro de contact est requis'),
  type: z.enum(['client', 'fournisseur']),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
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

  const onFormSubmit = (data: ContactFormData) => {
    // Transform the form data to match the expected type
    const submitData: Omit<ContactInsert, 'company_id'> = {
      name: data.name,
      contact_number: data.contact_number,
      type: data.type,
      email: data.email || null,
      phone: data.phone || null,
      address: data.address || null,
      city: data.city || null,
      country: data.country || null,
    };
    onSubmit(submitData);
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-readable-primary">Nom *</Label>
            <Input {...register('name')} className="bg-white text-readable-primary" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="contact_number" className="text-readable-primary">Numéro de contact *</Label>
            <Input {...register('contact_number')} placeholder="Ex: C001, F001" className="bg-white text-readable-primary" />
            {errors.contact_number && <p className="text-sm text-red-500">{errors.contact_number.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="type" className="text-readable-primary">Type *</Label>
          <Select onValueChange={(value) => setValue('type', value as any)}>
            <SelectTrigger className="bg-white text-readable-primary">
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="client" className="text-readable-primary">Client</SelectItem>
              <SelectItem value="fournisseur" className="text-readable-primary">Fournisseur</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-readable-primary">Email</Label>
            <Input type="email" {...register('email')} className="bg-white text-readable-primary" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-readable-primary">Téléphone</Label>
            <Input {...register('phone')} className="bg-white text-readable-primary" />
          </div>
        </div>

        <div>
          <Label htmlFor="address" className="text-readable-primary">Adresse</Label>
          <Textarea {...register('address')} className="bg-white text-readable-primary" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city" className="text-readable-primary">Ville</Label>
            <Input {...register('city')} className="bg-white text-readable-primary" />
          </div>
          
          <div>
            <Label htmlFor="country" className="text-readable-primary">Pays</Label>
            <Input {...register('country')} className="bg-white text-readable-primary" />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel} className="text-readable-primary">
            Annuler
          </Button>
          <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
            {loading ? 'Ajout...' : 'Ajouter'}
          </Button>
        </div>
      </form>
    </div>
  );
};
