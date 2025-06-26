
import { FormatValidators } from './formatValidators';
import { InputSanitizer } from './inputSanitizer';

export class BusinessValidators {
  // Validate admin credentials format
  static validateAdminCredentials(email: string, password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Email validation
    if (!email || typeof email !== 'string') {
      errors.push('Email requis');
    } else if (!FormatValidators.validateEmail(email)) {
      errors.push('Format d\'email invalide');
    }

    // Password validation
    if (!password || typeof password !== 'string') {
      errors.push('Mot de passe requis');
    } else if (password.length < 8) {
      errors.push('Mot de passe trop court (minimum 8 caractères)');
    }

    return { valid: errors.length === 0, errors };
  }

  // Validate invoice data with comprehensive checks
  static validateInvoiceData(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Basic field validation
    if (!data.contact_id || !FormatValidators.validateUUID(data.contact_id)) {
      errors.push('ID client invalide');
    }

    if (!data.invoice_number || typeof data.invoice_number !== 'string') {
      errors.push('Numéro de facture requis');
    } else {
      const sanitized = InputSanitizer.sanitizeHtml(data.invoice_number);
      if (sanitized.length === 0 || sanitized.length > 50) {
        errors.push('Numéro de facture invalide (1-50 caractères)');
      }
    }

    if (!data.invoice_date || !FormatValidators.validateDate(data.invoice_date)) {
      errors.push('Date de facture invalide');
    }

    if (!data.due_date || !FormatValidators.validateDate(data.due_date)) {
      errors.push('Date d\'échéance invalide');
    }

    // Validate dates relationship
    if (data.invoice_date && data.due_date && new Date(data.due_date) < new Date(data.invoice_date)) {
      errors.push('La date d\'échéance ne peut pas être antérieure à la date de facture');
    }

    // Amount validation
    if (!FormatValidators.validateAmount(data.total_amount)) {
      errors.push('Montant total invalide');
    }

    if (!FormatValidators.validateAmount(data.subtotal)) {
      errors.push('Sous-total invalide');
    }

    if (!FormatValidators.validateAmount(data.tax_amount)) {
      errors.push('Montant TVA invalide');
    }

    // Line items validation
    if (data.lines && Array.isArray(data.lines)) {
      data.lines.forEach((line: any, index: number) => {
        if (!line.description || typeof line.description !== 'string') {
          errors.push(`Description de la ligne ${index + 1} requise`);
        } else {
          const sanitized = InputSanitizer.sanitizeHtml(line.description);
          if (sanitized.length === 0 || sanitized.length > 500) {
            errors.push(`Description de la ligne ${index + 1} invalide (1-500 caractères)`);
          }
        }
        
        if (!FormatValidators.validateAmount(line.quantity) || line.quantity <= 0) {
          errors.push(`Quantité de la ligne ${index + 1} invalide`);
        }
        
        if (!FormatValidators.validateAmount(line.unit_price)) {
          errors.push(`Prix unitaire de la ligne ${index + 1} invalide`);
        }

        if (line.tax_rate !== undefined && (!FormatValidators.validateAmount(line.tax_rate) || line.tax_rate < 0 || line.tax_rate > 100)) {
          errors.push(`Taux de TVA de la ligne ${index + 1} invalide (0-100%)`);
        }
      });
    } else {
      errors.push('Au moins une ligne de facturation est requise');
    }

    return { valid: errors.length === 0, errors };
  }

  // Validate purchase data with comprehensive checks
  static validatePurchaseData(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.supplier_id || !FormatValidators.validateUUID(data.supplier_id)) {
      errors.push('ID fournisseur invalide');
    }

    if (!data.purchase_number || typeof data.purchase_number !== 'string') {
      errors.push('Numéro d\'achat requis');
    } else {
      const sanitized = InputSanitizer.sanitizeHtml(data.purchase_number);
      if (sanitized.length === 0 || sanitized.length > 50) {
        errors.push('Numéro d\'achat invalide (1-50 caractères)');
      }
    }

    if (!data.purchase_date || !FormatValidators.validateDate(data.purchase_date)) {
      errors.push('Date d\'achat invalide');
    }

    if (!FormatValidators.validateAmount(data.total_amount)) {
      errors.push('Montant total invalide');
    }

    if (data.lines && Array.isArray(data.lines)) {
      data.lines.forEach((line: any, index: number) => {
        if (!line.description || typeof line.description !== 'string') {
          errors.push(`Description de la ligne ${index + 1} requise`);
        } else {
          const sanitized = InputSanitizer.sanitizeHtml(line.description);
          if (sanitized.length === 0 || sanitized.length > 500) {
            errors.push(`Description de la ligne ${index + 1} invalide`);
          }
        }
        
        if (!FormatValidators.validateAmount(line.quantity) || line.quantity <= 0) {
          errors.push(`Quantité de la ligne ${index + 1} invalide`);
        }
        
        if (!FormatValidators.validateAmount(line.unit_price)) {
          errors.push(`Prix unitaire de la ligne ${index + 1} invalide`);
        }
      });
    }

    return { valid: errors.length === 0, errors };
  }

  // Validate treasury transaction data
  static validateTreasuryData(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.transaction_type || !['income', 'expense'].includes(data.transaction_type)) {
      errors.push('Type de transaction invalide');
    }

    if (!FormatValidators.validateAmount(data.amount) || data.amount <= 0) {
      errors.push('Montant invalide');
    }

    if (!data.description || typeof data.description !== 'string') {
      errors.push('Description requise');
    } else {
      const sanitized = InputSanitizer.sanitizeHtml(data.description);
      if (sanitized.length === 0 || sanitized.length > 1000) {
        errors.push('Description invalide (1-1000 caractères)');
      }
    }

    if (!data.transaction_date || !FormatValidators.validateDate(data.transaction_date)) {
      errors.push('Date de transaction invalide');
    }

    return { valid: errors.length === 0, errors };
  }
}
