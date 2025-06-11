
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateCategory } from '@/hooks/useProducts';

interface CategoryFormProps {
  category?: any;
  onClose: () => void;
}

export const CategoryForm = ({ category, onClose }: CategoryFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: category || {}
  });

  const createCategory = useCreateCategory();

  const onSubmit = (data: any) => {
    createCategory.mutate(data, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Nom de la catégorie *</Label>
        <Input
          id="name"
          {...register('name', { required: 'Le nom est requis' })}
          placeholder="Nom de la catégorie"
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Description de la catégorie"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit" disabled={createCategory.isPending}>
          {createCategory.isPending ? 'Création...' : 'Créer la catégorie'}
        </Button>
      </div>
    </form>
  );
};
