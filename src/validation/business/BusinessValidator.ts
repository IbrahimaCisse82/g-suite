
import { ValidationResult } from '../types';
import { SecurityValidator } from '../core/SecurityValidator';

export class BusinessValidator {
  static validateInvoiceData(data: any): ValidationResult {
    const errors: string[] = [];
    
    if (!data.customer_id) {
      errors.push('Client obligatoire');
    }
    
    if (!data.amount || !SecurityValidator.validateAmount(data.amount)) {
      errors.push('Montant invalide');
    }
    
    if (!data.due_date) {
      errors.push('Date d\'échéance obligatoire');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData: errors.length === 0 ? SecurityValidator.sanitizeObject(data) : undefined
    };
  }

  static validatePurchaseData(data: any): ValidationResult {
    const errors: string[] = [];
    
    if (!data.supplier_id) {
      errors.push('Fournisseur obligatoire');
    }
    
    if (!data.amount || !SecurityValidator.validateAmount(data.amount)) {
      errors.push('Montant invalide');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData: errors.length === 0 ? SecurityValidator.sanitizeObject(data) : undefined
    };
  }

  static validateTreasuryData(data: any): ValidationResult {
    const errors: string[] = [];
    
    if (!data.type || !['income', 'expense'].includes(data.type)) {
      errors.push('Type de transaction invalide');
    }
    
    if (!data.amount || !SecurityValidator.validateAmount(data.amount)) {
      errors.push('Montant invalide');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData: errors.length === 0 ? SecurityValidator.sanitizeObject(data) : undefined
    };
  }
}
