
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useContacts } from '@/hooks/useContacts';

interface InvoiceFormFieldsProps {
  formData: {
    contact_id: string;
    invoice_date: string;
    due_date: string;
    notes: string;
  };
  onFormDataChange: (field: string, value: string) => void;
}

export const InvoiceFormFields = ({ formData, onFormDataChange }: InvoiceFormFieldsProps) => {
  const { data: contacts = [] } = useContacts();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact_id">Client</Label>
          <Select value={formData.contact_id} onValueChange={(value) => onFormDataChange('contact_id', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un client" />
            </SelectTrigger>
            <SelectContent>
              {contacts.filter(contact => contact.type === 'client' || contact.type === 'both').map((contact) => (
                <SelectItem key={contact.id} value={contact.id}>
                  {contact.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Numéro de facture</Label>
          <div className="p-2 bg-gray-50 rounded border text-sm text-gray-600">
            Généré automatiquement (FAC-{new Date().getFullYear()}-XXX)
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoice_date">Date de facture</Label>
          <Input
            id="invoice_date"
            type="date"
            value={formData.invoice_date}
            onChange={(e) => onFormDataChange('invoice_date', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="due_date">Date d'échéance</Label>
          <Input
            id="due_date"
            type="date"
            value={formData.due_date}
            onChange={(e) => onFormDataChange('due_date', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => onFormDataChange('notes', e.target.value)}
          placeholder="Notes ou conditions particulières..."
          rows={3}
        />
      </div>
    </>
  );
};
