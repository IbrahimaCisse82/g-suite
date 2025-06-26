
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { SecurityValidator } from '@/validation/core/SecurityValidator';
import { BusinessValidator } from '@/validation/business/BusinessValidator';
import { ValidationResult, ValidationType } from '@/validation/types';

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
    validationType: ValidationType
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
        // Import SecurityService dynamically to avoid circular dependency
        const { SecurityService } = await import('@/services/securityService');
        const rateLimitOk = await SecurityService.checkRateLimit(
          `validation_${validationType}`,
          'validation',
          5,
          1,
          1
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
      let validation: ValidationResult;
      switch (validationType) {
        case 'invoice':
          validation = BusinessValidator.validateInvoiceData(sanitizedData);
          break;
        case 'purchase':
          validation = BusinessValidator.validatePurchaseData(sanitizedData);
          break;
        case 'treasury':
          validation = BusinessValidator.validateTreasuryData(sanitizedData);
          break;
        case 'contact':
          validation = validateContactData(sanitizedData);
          break;
        case 'product':
          validation = validateProductData(sanitizedData);
          break;
        default:
          validation = { isValid: false, errors: ['Type de validation non supporté'] };
      }
      
      // Show user-friendly error messages
      if (!validation.isValid) {
        validation.errors.forEach(error => {
          toast.error(error);
        });
      }
      
      // Log validation if enabled
      if (config.enableLogging) {
        console.log(`Validation ${validationType}:`, {
          isValid: validation.isValid,
          errorCount: validation.errors.length
        });
      }
      
      setLastValidation(validation);
      return validation;
      
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

  const validateContactData = (data: any): ValidationResult => {
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
    
    return { 
      isValid: errors.length === 0, 
      errors,
      sanitizedData: errors.length === 0 ? SecurityValidator.sanitizeObject(data) : undefined
    };
  };

  const validateProductData = (data: any): ValidationResult => {
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
    
    return { 
      isValid: errors.length === 0, 
      errors,
      sanitizedData: errors.length === 0 ? SecurityValidator.sanitizeObject(data) : undefined
    };
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
