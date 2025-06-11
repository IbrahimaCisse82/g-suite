
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateProduct, useProductCategories } from '@/hooks/useProducts';

interface ProductFormProps {
  product?: any;
  onClose: () => void;
}

export const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: product || {}
  });

  const { data: categories } = useProductCategories();
  const createProduct = useCreateProduct();

  const onSubmit = (data: any) => {
    createProduct.mutate(data, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nom du produit *</Label>
          <Input
            id="name"
            {...register('name', { required: 'Le nom est requis' })}
            placeholder="Nom du produit"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="sku">Code SKU</Label>
          <Input
            id="sku"
            {...register('sku')}
            placeholder="Code produit"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="category_id">Catégorie *</Label>
        <Select onValueChange={(value) => setValue('category_id', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Description du produit"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="unit_price">Prix de vente *</Label>
          <Input
            id="unit_price"
            type="number"
            step="0.01"
            {...register('unit_price', { required: 'Le prix est requis' })}
            placeholder="0.00"
          />
          {errors.unit_price && (
            <p className="text-sm text-red-600">{errors.unit_price.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="cost_price">Prix d'achat</Label>
          <Input
            id="cost_price"
            type="number"
            step="0.01"
            {...register('cost_price')}
            placeholder="0.00"
          />
        </div>

        <div>
          <Label htmlFor="tax_rate">Taux de TVA (%)</Label>
          <Input
            id="tax_rate"
            type="number"
            step="0.01"
            {...register('tax_rate')}
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="minimum_stock_level">Seuil de stock minimum</Label>
        <Input
          id="minimum_stock_level"
          type="number"
          {...register('minimum_stock_level')}
          placeholder="0"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit" disabled={createProduct.isPending}>
          {createProduct.isPending ? 'Création...' : 'Créer le produit'}
        </Button>
      </div>
    </form>
  );
};
