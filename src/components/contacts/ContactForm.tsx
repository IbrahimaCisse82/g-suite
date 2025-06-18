
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const contactSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  type: z.enum(['client', 'fournisseur']),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const ContactForm = ({ onSubmit, onCancel, loading }: ContactFormProps) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      country: 'Sénégal',
      type: 'client',
    },
  });

  const typeValue = watch('type');

  const onFormSubmit = (data: ContactFormData) => {
    console.log('Form submission triggered with data:', data);
    onSubmit(data);
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
            <Label htmlFor="type" className="text-readable-primary">Type *</Label>
            <Select 
              onValueChange={(value) => {
                console.log('Type changed to:', value);
                setValue('type', value as 'client' | 'fournisseur');
              }} 
              value={typeValue}
            >
              <SelectTrigger className="bg-white text-readable-primary">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="client" className="text-readable-primary">Client</SelectItem>
                <SelectItem value="fournisseur" className="text-readable-primary">Fournisseur</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
          </div>
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
          <Button 
            type="submit" 
            disabled={loading} 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => console.log('Submit button clicked')}
          >
            {loading ? 'Ajout...' : 'Ajouter'}
          </Button>
        </div>
      </form>
    </div>
  );
};
