
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
  onSubmit: (data: ContactFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const ContactForm = ({ onSubmit, onCancel, loading }: ContactFormProps) => {
  const { register, handleSubmit, setValue, watch, formState: { errors, isValid }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      country: 'Sénégal',
      type: 'client',
    },
  });

  const typeValue = watch('type');

  const generatePreviewNumber = (type: string) => {
    const prefix = type === 'client' ? 'C' : 'F';
    return `${prefix}000001 (exemple)`;
  };

  const onFormSubmit = async (data: ContactFormData) => {
    if (loading) {
      console.log('Form submission blocked - already in progress');
      return;
    }
    
    console.log('Contact form submission triggered with data:', data);
    
    try {
      await onSubmit(data);
      console.log('Contact form submitted successfully, resetting form');
      reset(); // Reset form après succès
    } catch (error) {
      console.error('Error in contact form submission:', error);
      // L'erreur est gérée dans le composant parent
    }
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        {/* Prévisualisation du numéro */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <Label className="text-blue-800 font-semibold">Numéro de contact</Label>
          <div className="mt-1 text-blue-700 font-mono text-lg font-bold">
            {generatePreviewNumber(typeValue || 'client')}
          </div>
          <p className="text-xs text-blue-600 mt-1">
            Le numéro définitif sera généré automatiquement et séquentiellement
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-readable-primary">Nom *</Label>
            <Input 
              {...register('name')} 
              className="bg-white text-readable-primary"
              placeholder="Nom du contact"
              disabled={loading}
            />
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
              disabled={loading}
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
            <Input 
              type="email" 
              {...register('email')} 
              className="bg-white text-readable-primary"
              placeholder="email@exemple.com"
              disabled={loading}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-readable-primary">Téléphone</Label>
            <Input 
              {...register('phone')} 
              className="bg-white text-readable-primary"
              placeholder="+221 XX XXX XX XX"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address" className="text-readable-primary">Adresse</Label>
          <Textarea 
            {...register('address')} 
            className="bg-white text-readable-primary"
            placeholder="Adresse complète"
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city" className="text-readable-primary">Ville</Label>
            <Input 
              {...register('city')} 
              className="bg-white text-readable-primary"
              placeholder="Ville"
              disabled={loading}
            />
          </div>
          
          <div>
            <Label htmlFor="country" className="text-readable-primary">Pays</Label>
            <Input 
              {...register('country')} 
              className="bg-white text-readable-primary"
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel} 
            className="text-readable-primary border-gray-300 hover:bg-gray-50"
            disabled={loading}
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            disabled={loading || !isValid} 
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6"
          >
            {loading ? 'Ajout en cours...' : 'Ajouter le contact'}
          </Button>
        </div>
      </form>
    </div>
  );
};
