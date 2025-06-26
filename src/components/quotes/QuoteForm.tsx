
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface QuoteFormData {
  quote_number: string;
  contact_id: string;
  quote_date: Date;
  validity_date: Date;
  status: string;
  terms_conditions?: string;
  notes?: string;
}

interface QuoteLineItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  line_total: number;
}

interface QuoteFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  contacts?: any[];
  products?: any[];
}

export const QuoteForm = ({ onSubmit, onCancel, contacts = [], products = [] }: QuoteFormProps) => {
  const [quoteDate, setQuoteDate] = useState<Date>(new Date());
  const [validityDate, setValidityDate] = useState<Date>();
  const [lines, setLines] = useState<QuoteLineItem[]>([
    { id: '1', description: '', quantity: 1, unit_price: 0, tax_rate: 18, line_total: 0 }
  ]);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<QuoteFormData>();

  const addLine = () => {
    const newLine: QuoteLineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unit_price: 0,
      tax_rate: 18,
      line_total: 0
    };
    setLines([...lines, newLine]);
  };

  const removeLine = (id: string) => {
    if (lines.length > 1) {
      setLines(lines.filter(line => line.id !== id));
    }
  };

  const updateLine = (id: string, field: keyof QuoteLineItem, value: any) => {
    setLines(lines.map(line => {
      if (line.id === id) {
        const updatedLine = { ...line, [field]: value };
        if (field === 'quantity' || field === 'unit_price') {
          updatedLine.line_total = updatedLine.quantity * updatedLine.unit_price;
        }
        return updatedLine;
      }
      return line;
    }));
  };

  const calculateTotals = () => {
    const subtotal = lines.reduce((sum, line) => sum + line.line_total, 0);
    const taxAmount = lines.reduce((sum, line) => sum + (line.line_total * line.tax_rate / 100), 0);
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  };

  const handleFormSubmit = (data: QuoteFormData) => {
    const { subtotal, taxAmount, total } = calculateTotals();
    
    onSubmit({
      ...data,
      quote_date: quoteDate,
      validity_date: validityDate,
      subtotal,
      tax_amount: taxAmount,
      total_amount: total,
      quote_lines: lines.filter(line => line.description.trim() !== '')
    });
  };

  const { subtotal, taxAmount, total } = calculateTotals();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nouveau Devis</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* En-tête du devis */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quote_number">Numéro de devis</Label>
              <Input
                id="quote_number"
                {...register('quote_number', { required: 'Le numéro est requis' })}
                placeholder="DEV-2024-001"
              />
              {errors.quote_number && <p className="text-red-500 text-sm">{errors.quote_number.message}</p>}
            </div>

            <div>
              <Label htmlFor="contact_id">Client</Label>
              <Select onValueChange={(value) => setValue('contact_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un client" />
                </SelectTrigger>
                <SelectContent>
                  {contacts.map((contact) => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date du devis</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {quoteDate ? format(quoteDate, 'dd MMMM yyyy', { locale: fr }) : 'Sélectionner une date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={quoteDate}
                    onSelect={setQuoteDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Date de validité</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {validityDate ? format(validityDate, 'dd MMMM yyyy', { locale: fr }) : 'Sélectionner une date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={validityDate}
                    onSelect={setValidityDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Lignes du devis */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Lignes du devis</h3>
              <Button type="button" onClick={addLine} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une ligne
              </Button>
            </div>

            <div className="space-y-2">
              {lines.map((line, index) => (
                <div key={line.id} className="grid grid-cols-12 gap-2 items-end p-4 border rounded-lg">
                  <div className="col-span-4">
                    <Label>Description</Label>
                    <Input
                      value={line.description}
                      onChange={(e) => updateLine(line.id, 'description', e.target.value)}
                      placeholder="Description du produit/service"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Quantité</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={line.quantity}
                      onChange={(e) => updateLine(line.id, 'quantity', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Prix unitaire</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={line.unit_price}
                      onChange={(e) => updateLine(line.id, 'unit_price', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>TVA (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={line.tax_rate}
                      onChange={(e) => updateLine(line.id, 'tax_rate', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-1">
                    <Label>Total</Label>
                    <div className="text-sm font-medium p-2">
                      {line.line_total.toLocaleString('fr-FR')} XOF
                    </div>
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLine(line.id)}
                      disabled={lines.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totaux */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span>Sous-total :</span>
                <span>{subtotal.toLocaleString('fr-FR')} XOF</span>
              </div>
              <div className="flex justify-between">
                <span>TVA :</span>
                <span>{taxAmount.toLocaleString('fr-FR')} XOF</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total :</span>
                <span>{total.toLocaleString('fr-FR')} XOF</span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="terms_conditions">Conditions générales</Label>
            <Textarea
              id="terms_conditions"
              {...register('terms_conditions')}
              placeholder="Conditions générales de vente..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Notes internes..."
              rows={2}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit">
              Créer le devis
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
