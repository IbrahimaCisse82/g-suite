
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { InvoiceFormFields } from './InvoiceFormFields';
import { InvoiceLinesSection } from './InvoiceLinesSection';
import { InvoiceTotalsSection } from './InvoiceTotalsSection';

interface InvoiceLine {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  line_total: number;
}

interface InvoiceFormProps {
  onSubmit: (invoiceData: any) => void;
  onCancel: () => void;
  loading?: boolean;
  initialData?: any;
}

export const InvoiceForm = ({ onSubmit, onCancel, loading, initialData }: InvoiceFormProps) => {
  const [formData, setFormData] = useState({
    contact_id: '',
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: '',
    notes: ''
  });

  const [lines, setLines] = useState<InvoiceLine[]>([
    {
      id: '1',
      description: '',
      quantity: 1,
      unit_price: 0,
      tax_rate: 18,
      line_total: 0
    }
  ]);

  // Initialize form with existing data if provided
  useEffect(() => {
    if (initialData) {
      setFormData({
        contact_id: initialData.contact_id || '',
        invoice_date: initialData.invoice_date ? new Date(initialData.invoice_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        due_date: initialData.due_date ? new Date(initialData.due_date).toISOString().split('T')[0] : '',
        notes: initialData.notes || ''
      });

      // If there are existing lines, use them; otherwise use default
      if (initialData.lines && initialData.lines.length > 0) {
        setLines(initialData.lines.map((line: any, index: number) => ({
          id: line.id || (index + 1).toString(),
          description: line.description || '',
          quantity: line.quantity || 1,
          unit_price: line.unit_price || 0,
          tax_rate: line.tax_rate || 18,
          line_total: calculateLineTotal(line.quantity || 1, line.unit_price || 0, line.tax_rate || 18)
        })));
      }
    }
  }, [initialData]);

  const calculateLineTotal = (quantity: number, unitPrice: number, taxRate: number) => {
    const subtotal = quantity * unitPrice;
    const taxAmount = subtotal * (taxRate / 100);
    return subtotal + taxAmount;
  };

  const handleFormDataChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateLine = (id: string, field: keyof InvoiceLine, value: any) => {
    setLines(prev => prev.map(line => {
      if (line.id === id) {
        const updated = { ...line, [field]: value };
        if (['quantity', 'unit_price', 'tax_rate'].includes(field)) {
          updated.line_total = calculateLineTotal(updated.quantity, updated.unit_price, updated.tax_rate);
        }
        return updated;
      }
      return line;
    }));
  };

  const addLine = () => {
    const newLine: InvoiceLine = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unit_price: 0,
      tax_rate: 18,
      line_total: 0
    };
    setLines(prev => [...prev, newLine]);
  };

  const removeLine = (id: string) => {
    if (lines.length > 1) {
      setLines(prev => prev.filter(line => line.id !== id));
    }
  };

  const calculateTotals = () => {
    const subtotal = lines.reduce((sum, line) => sum + (line.quantity * line.unit_price), 0);
    const taxAmount = lines.reduce((sum, line) => sum + (line.quantity * line.unit_price * line.tax_rate / 100), 0);
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { subtotal, taxAmount, total } = calculateTotals();
    
    const invoiceData = {
      ...formData,
      subtotal,
      tax_amount: taxAmount,
      total_amount: total,
      lines: lines.filter(line => line.description.trim() !== '')
    };
    
    onSubmit(invoiceData);
  };

  const { subtotal, taxAmount, total } = calculateTotals();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InvoiceFormFields 
        formData={formData}
        onFormDataChange={handleFormDataChange}
      />

      <InvoiceLinesSection
        lines={lines}
        onUpdateLine={updateLine}
        onAddLine={addLine}
        onRemoveLine={removeLine}
      />

      <InvoiceTotalsSection
        subtotal={subtotal}
        taxAmount={taxAmount}
        total={total}
      />

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (initialData ? 'Modification...' : 'Création...') : (initialData ? 'Modifier la facture' : 'Créer la facture')}
        </Button>
      </div>
    </form>
  );
};
