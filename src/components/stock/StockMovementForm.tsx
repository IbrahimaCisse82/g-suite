
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProducts } from '@/hooks/useProducts';
import { useUpdateStock } from '@/hooks/useStock';

interface StockMovementFormProps {
  product?: any;
  onClose: () => void;
}

export const StockMovementForm = ({ product, onClose }: StockMovementFormProps) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const { data: products } = useProducts();
  const updateStock = useUpdateStock();

  const movementType = watch('movement_type');

  const onSubmit = (data: any) => {
    updateStock.mutate({
      productId: data.product_id,
      quantity: parseFloat(data.quantity),
      movementType: data.movement_type,
      notes: data.notes
    }, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="product_id">Produit *</Label>
        <Select 
          onValueChange={(value) => setValue('product_id', value)}
          defaultValue={product?.id}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un produit" />
          </SelectTrigger>
          <SelectContent>
            {products?.map((prod) => (
              <SelectItem key={prod.id} value={prod.id}>
                {prod.name} ({prod.sku || 'Sans SKU'})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="movement_type">Type de mouvement *</Label>
        <Select onValueChange={(value) => setValue('movement_type', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner le type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in">Entrée (+)</SelectItem>
            <SelectItem value="out">Sortie (-)</SelectItem>
            <SelectItem value="adjustment">Ajustement</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="quantity">
          {movementType === 'adjustment' ? 'Nouvelle quantité' : 'Quantité'} *
        </Label>
        <Input
          id="quantity"
          type="number"
          step="0.01"
          {...register('quantity', { required: 'La quantité est requise' })}
          placeholder="0"
        />
        {errors.quantity && (
          <p className="text-sm text-red-600">{errors.quantity.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          {...register('notes')}
          placeholder="Commentaires sur le mouvement"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit" disabled={updateStock.isPending}>
          {updateStock.isPending ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </div>
    </form>
  );
};
