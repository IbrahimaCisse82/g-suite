
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEnhancedSecurity } from '@/hooks/useEnhancedSecurity';
import { SecurityValidator } from '@/utils/securityValidation';

interface EnhancedTreasuryFormProps {
  onSubmit: (transactionData: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const EnhancedTreasuryForm = ({ onSubmit, onCancel, loading }: EnhancedTreasuryFormProps) => {
  const [formData, setFormData] = useState({
    transaction_type: '',
    amount: 0,
    description: '',
    category: '',
    transaction_date: new Date().toISOString().split('T')[0]
  });

  const { validateAndSanitizeFormData, checkRateLimit, logSecurityEvent } = useEnhancedSecurity();

  const categories = [
    'Ventes',
    'Prestations de services',
    'Fournitures',
    'Loyer',
    'Salaires',
    'Charges sociales',
    'Électricité',
    'Téléphone',
    'Assurances',
    'Transport',
    'Marketing',
    'Frais bancaires',
    'Autre'
  ];

  const handleInputChange = (field: string, value: string | number) => {
    const sanitizedValue = typeof value === 'string' ? SecurityValidator.sanitizeHtml(value) : value;
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limiting for treasury transactions
    const rateLimitAllowed = await checkRateLimit('treasury_submit', 20, 300000); // 20 attempts per 5 minutes
    if (!rateLimitAllowed) {
      return;
    }

    // Validate and sanitize the transaction data
    const { isValid, sanitizedData, errors } = validateAndSanitizeFormData(formData, 'treasury');
    
    if (!isValid) {
      logSecurityEvent('treasury_validation_failed', { errors, formData });
      return;
    }

    try {
      await onSubmit(sanitizedData);
      logSecurityEvent('treasury_submit_success', { 
        transactionType: sanitizedData.transaction_type,
        amount: sanitizedData.amount 
      });
    } catch (error) {
      console.error('Treasury transaction submission failed:', error);
      logSecurityEvent('treasury_submit_failed', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="transaction_type">Type de transaction</Label>
          <Select 
            value={formData.transaction_type} 
            onValueChange={(value) => handleInputChange('transaction_type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner le type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Recette</SelectItem>
              <SelectItem value="expense">Dépense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Montant (XOF)</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            max="999999999.99"
            step="0.01"
            value={formData.amount}
            onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transaction_date">Date</Label>
          <Input
            id="transaction_date"
            type="date"
            value={formData.transaction_date}
            onChange={(e) => handleInputChange('transaction_date', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => handleInputChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Description de la transaction..."
          rows={3}
          maxLength={1000}
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer la transaction'}
        </Button>
      </div>
    </form>
  );
};
