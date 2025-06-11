
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateDelivery, useInvoicesForDelivery } from '@/hooks/useDeliveries';

interface DeliveryFormProps {
  onClose: () => void;
}

export const DeliveryForm = ({ onClose }: DeliveryFormProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { data: invoices } = useInvoicesForDelivery();
  const createDelivery = useCreateDelivery();

  const onSubmit = (data: any) => {
    createDelivery.mutate(data, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="invoice_id">Facture payée *</Label>
        <Select onValueChange={(value) => setValue('invoice_id', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une facture" />
          </SelectTrigger>
          <SelectContent>
            {invoices?.map((invoice) => (
              <SelectItem key={invoice.id} value={invoice.id}>
                {invoice.invoice_number} - {invoice.contacts?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="delivery_address">Adresse de livraison</Label>
        <Textarea
          id="delivery_address"
          {...register('delivery_address')}
          placeholder="Adresse complète de livraison"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="tracking_number">Numéro de suivi</Label>
        <Input
          id="tracking_number"
          {...register('tracking_number')}
          placeholder="Numéro de suivi transporteur"
        />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          {...register('notes')}
          placeholder="Instructions de livraison"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit" disabled={createDelivery.isPending}>
          {createDelivery.isPending ? 'Création...' : 'Créer la livraison'}
        </Button>
      </div>
    </form>
  );
};
