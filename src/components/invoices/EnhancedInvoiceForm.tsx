
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { InvoiceFormFields } from './InvoiceFormFields';
import { InvoiceLinesSection } from './InvoiceLinesSection';
import { InvoiceTotalsSection } from './InvoiceTotalsSection';
import { useEnhancedSecurity } from '@/hooks/useEnhancedSecurity';
import { SecurityValidator } from '@/utils/securityValidation';
import { useToast } from '@/hooks/use-toast';

interface InvoiceLine {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  line_total: number;
}

interface EnhancedInvoiceFormProps {
  onSubmit: (invoiceData: any) => void;
  onCancel: () => void;
  loading?: boolean;
  initialData?: any;
}

export const EnhancedInvoiceForm = ({ onSubmit, onCancel, loading, initialData }: EnhancedInvoiceFormProps) => {
  const [formData, setFormData] = useState({
    contact_id: '',
    invoice_number: '',
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

  const { validateAndSanitizeFormData, checkRateLimit, logSecurityEvent } = useEnhancedSecurity();
  const { toast } = useToast();

  // Initialize form with existing data if provided
  useEffect(() => {
    if (initialData) {
      const sanitizedData = SecurityValidator.sanitizeObject(initialData);
      setFormData({
        contact_id: sanitizedData.contact_id || '',
        invoice_number: sanitizedData.invoice_number || '',
        invoice_date: sanitizedData.invoice_date ? new Date(sanitizedData.invoice_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        due_date: sanitizedData.due_date ? new Date(sanitizedData.due_date).toISOString().split('T')[0] : '',
        notes: sanitizedData.notes || ''
      });

      if (sanitizedData.lines && sanitizedData.lines.length > 0) {
        setLines(sanitizedData.lines.map((line: any, index: number) => ({
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
    if (!SecurityValidator.validateAmount(quantity) || !SecurityValidator.validateAmount(unitPrice) || !SecurityValidator.validateAmount(taxRate)) {
      return 0;
    }
    const subtotal = quantity * unitPrice;
    const taxAmount = subtotal * (taxRate / 100);
    return subtotal + taxAmount;
  };

  const handleFormDataChange = (field: string, value: string) => {
    const sanitizedValue = SecurityValidator.sanitizeHtml(value);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  const updateLine = (id: string, field: keyof InvoiceLine, value: any) => {
    setLines(prev => prev.map(line => {
      if (line.id === id) {
        const sanitizedValue = typeof value === 'string' ? SecurityValidator.sanitizeHtml(value) : value;
        const updated = { ...line, [field]: sanitizedValue };
        
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
    const subtotal = lines.reduce((sum, line) => {
      if (!SecurityValidator.validateAmount(line.quantity) || !SecurityValidator.validateAmount(line.unit_price)) {
        return sum;
      }
      return sum + (line.quantity * line.unit_price);
    }, 0);
    
    const taxAmount = lines.reduce((sum, line) => {
      if (!SecurityValidator.validateAmount(line.quantity) || !SecurityValidator.validateAmount(line.unit_price) || !SecurityValidator.validateAmount(line.tax_rate)) {
        return sum;
      }
      return sum + (line.quantity * line.unit_price * line.tax_rate / 100);
    }, 0);
    
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limiting for invoice submissions
    const rateLimitAllowed = await checkRateLimit('invoice_submit', 10, 300000); // 10 attempts per 5 minutes
    if (!rateLimitAllowed) {
      return;
    }

    const { subtotal, taxAmount, total } = calculateTotals();
    
    const invoiceData = {
      ...formData,
      subtotal,
      tax_amount: taxAmount,
      total_amount: total,
      lines: lines.filter(line => line.description.trim() !== '')
    };
    
    // Validate and sanitize the complete invoice data
    const { isValid, sanitizedData, errors } = validateAndSanitizeFormData(invoiceData, 'invoice');
    
    if (!isValid) {
      logSecurityEvent('invoice_validation_failed', { errors, formData: formData });
      return;
    }

    // Additional business rule validation
    if (sanitizedData.lines.length === 0) {
      toast({
        title: "Erreur de validation",
        description: "Au moins une ligne de facturation est requise",
        variant: "destructive"
      });
      return;
    }

    try {
      await onSubmit(sanitizedData);
      logSecurityEvent('invoice_submit_success', { invoiceNumber: sanitizedData.invoice_number });
    } catch (error) {
      console.error('Invoice submission failed:', error);
      logSecurityEvent('invoice_submit_failed', { error: error instanceof Error ? error.message : 'Unknown error' });
    }
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
