
import { useState, useCallback } from 'react';
import { SecurityValidator } from '@/utils/securityValidation';
import { toast } from 'sonner';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedData?: any;
}

interface ValidationConfig {
  enableRateLimit?: boolean;
  enableSanitization?: boolean;
  enableLogging?: boolean;
}

export const useUnifiedValidation = (config: ValidationConfig = {}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [lastValidation, setLastValidation] = useState<ValidationResult | null>(null);

  const validateForm = useCallback(async (
    data: any,
    validationType: 'invoice' | 'purchase' | 'treasury' | 'contact' | 'product'
  ): Promise<ValidationResult> => {
    setIsValidating(true);
    
    try {
      let sanitizedData = data;
      
      // Sanitize data if enabled
      if (config.enableSanitization !== false) {
        sanitizedData = SecurityValidator.sanitizeObject(data);
      }
      
      // Rate limiting check if enabled
      if (config.enableRateLimit) {
        const rateLimitOk = await SecurityValidator.checkRateLimit(
          `validation_${validationType}`,
          5,
          60000 // 1 minute window
        );
        
        if (!rateLimitOk) {
          const result = {
            isValid: false,
            errors: ['Trop de tentatives de validation. Veuillez attendre.']
          };
          setLastValidation(result);
          return result;
        }
      }
      
      // Perform validation based on type
      let validation;
      switch (validationType) {
        case 'invoice':
          validation = SecurityValidator.validateInvoiceData(sanitizedData);
          break;
        case 'purchase':
          validation = SecurityValidator.validatePurchaseData(sanitizedData);
          break;
        case 'treasury':
          validation = SecurityValidator.validateTreasuryData(sanitizedData);
          break;
        case 'contact':
          validation = this.validateContactData(sanitizedData);
          break;
        case 'product':
          validation = this.validateProductData(sanitizedData);
          break;
        default:
          validation = { valid: false, errors: ['Type de validation non supporté'] };
      }
      
      const result: ValidationResult = {
        isValid: validation.valid,
        errors: validation.errors,
        sanitizedData: validation.valid ? sanitizedData : undefined
      };
      
      // Show user-friendly error messages
      if (!result.isValid) {
        result.errors.forEach(error => {
          toast.error(error);
        });
      }
      
      // Log validation if enabled
      if (config.enableLogging) {
        console.log(`Validation ${validationType}:`, {
          isValid: result.isValid,
          errorCount: result.errors.length
        });
      }
      
      setLastValidation(result);
      return result;
      
    } catch (error) {
      console.error('Validation error:', error);
      const result = {
        isValid: false,
        errors: ['Erreur de validation interne']
      };
      setLastValidation(result);
      return result;
    } finally {
      setIsValidating(false);
    }
  }, [config]);

  const validateContactData = (data: any) => {
    const errors: string[] = [];
    
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Le nom du contact doit contenir au moins 2 caractères');
    }
    
    if (data.email && !SecurityValidator.validateEmail(data.email)) {
      errors.push('Format d\'email invalide');
    }
    
    if (data.phone && !SecurityValidator.validatePhone(data.phone)) {
      errors.push('Format de téléphone invalide');
    }
    
    if (data.credit_limit && !SecurityValidator.validateAmount(data.credit_limit)) {
      errors.push('Limite de crédit invalide');
    }
    
    return { valid: errors.length === 0, errors };
  };

  const validateProductData = (data: any) => {
    const errors: string[] = [];
    
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Le nom du produit doit contenir au moins 2 caractères');
    }
    
    if (data.unit_price && !SecurityValidator.validateAmount(data.unit_price)) {
      errors.push('Prix unitaire invalide');
    }
    
    if (data.cost && !SecurityValidator.validateAmount(data.cost)) {
      errors.push('Coût invalide');
    }
    
    if (data.stock_quantity && (isNaN(data.stock_quantity) || data.stock_quantity < 0)) {
      errors.push('Quantité en stock invalide');
    }
    
    return { valid: errors.length === 0, errors };
  };

  const clearValidation = useCallback(() => {
    setLastValidation(null);
  }, []);

  return {
    validateForm,
    clearValidation,
    isValidating,
    lastValidation
  };
};
