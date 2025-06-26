
import { ValidationResult } from '../types';
import { SecurityValidator } from '../core/SecurityValidator';

export class UIValidator {
  static validateFormField(fieldName: string, value: any, required: boolean = true): ValidationResult {
    const errors: string[] = [];
    
    if (required && (!value || (typeof value === 'string' && !value.trim()))) {
      errors.push(`${fieldName} est obligatoire`);
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData: errors.length === 0 ? SecurityValidator.sanitizeObject(value) : undefined
    };
  }

  static validateSelectOption(value: string, allowedOptions: string[], fieldName: string): ValidationResult {
    const errors: string[] = [];
    
    if (!value) {
      errors.push(`${fieldName} est obligatoire`);
    } else if (!allowedOptions.includes(value)) {
      errors.push(`${fieldName} invalide`);
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData: errors.length === 0 ? SecurityValidator.sanitizeInput(value) : undefined
    };
  }

  static validateFileUpload(file: File | null, maxSize: number = 5000000, allowedTypes: string[] = []): ValidationResult {
    const errors: string[] = [];
    
    if (!file) {
      errors.push('Fichier obligatoire');
      return { isValid: false, errors };
    }
    
    if (file.size > maxSize) {
      errors.push(`Fichier trop volumineux (max ${Math.round(maxSize / 1000000)}MB)`);
    }
    
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      errors.push(`Type de fichier non autorisé`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateMultipleFields(validations: ValidationResult[]): ValidationResult {
    const allErrors = validations.flatMap(v => v.errors);
    
    return {
      isValid: allErrors.length === 0,
      errors: allErrors
    };
  }
}
