
import { useState } from 'react';
import { SecurityValidator } from '@/utils/securityValidation';
import { toast } from 'sonner';

interface QuoteValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedData: any;
}

export function useQuoteValidation() {
  const [isValidating, setIsValidating] = useState(false);

  const validateQuoteData = (data: any): QuoteValidationResult => {
    setIsValidating(true);
    const errors: string[] = [];

    try {
      // Sanitize all input data
      const sanitizedData = SecurityValidator.sanitizeObject(data);

      // Validate required fields
      if (!sanitizedData.contact_id) {
        errors.push('Contact client requis');
      }

      if (!sanitizedData.quote_date) {
        errors.push('Date du devis requise');
      }

      if (!sanitizedData.validity_date) {
        errors.push('Date de validité requise');
      }

      // Validate dates
      if (sanitizedData.quote_date && sanitizedData.validity_date) {
        const quoteDate = new Date(sanitizedData.quote_date);
        const validityDate = new Date(sanitizedData.validity_date);
        
        if (validityDate <= quoteDate) {
          errors.push('La date de validité doit être postérieure à la date du devis');
        }
      }

      // Validate amounts
      if (sanitizedData.total_amount !== undefined && !SecurityValidator.validateAmount(sanitizedData.total_amount)) {
        errors.push('Montant total invalide');
      }

      if (sanitizedData.subtotal !== undefined && !SecurityValidator.validateAmount(sanitizedData.subtotal)) {
        errors.push('Sous-total invalide');
      }

      if (sanitizedData.tax_amount !== undefined && !SecurityValidator.validateAmount(sanitizedData.tax_amount)) {
        errors.push('Montant de TVA invalide');
      }

      // Validate line items
      if (sanitizedData.items && Array.isArray(sanitizedData.items)) {
        sanitizedData.items.forEach((item: any, index: number) => {
          if (!item.description || item.description.trim().length === 0) {
            errors.push(`Description requise pour la ligne ${index + 1}`);
          }

          if (!item.quantity || item.quantity <= 0) {
            errors.push(`Quantité invalide pour la ligne ${index + 1}`);
          }

          if (item.unit_price === undefined || item.unit_price < 0) {
            errors.push(`Prix unitaire invalide pour la ligne ${index + 1}`);
          }
        });
      } else {
        errors.push('Au moins un article est requis');
      }

      const result = {
        isValid: errors.length === 0,
        errors,
        sanitizedData
      };

      if (!result.isValid) {
        errors.forEach(error => {
          toast.error(error);
        });
      }

      return result;
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      toast.error('Erreur lors de la validation des données');
      return {
        isValid: false,
        errors: ['Erreur lors de la validation des données'],
        sanitizedData: data
      };
    } finally {
      setIsValidating(false);
    }
  };

  return {
    validateQuoteData,
    isValidating
  };
}
