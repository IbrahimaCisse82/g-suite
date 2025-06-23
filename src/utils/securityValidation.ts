
import DOMPurify from 'dompurify';

export class SecurityValidator {
  // Sanitize HTML input to prevent XSS
  static sanitizeHtml(input: string): string {
    return DOMPurify.sanitize(input, { 
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [] 
    });
  }

  // Validate email format with enhanced security
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const sanitized = this.sanitizeHtml(email.trim().toLowerCase());
    return emailRegex.test(sanitized) && sanitized.length <= 255 && sanitized.length >= 3;
  }

  // Validate phone number with international format support
  static validatePhone(phone: string): boolean {
    const sanitized = this.sanitizeHtml(phone.trim());
    const phoneRegex = /^\+?[\d\s\-\(\)]{8,20}$/;
    return phoneRegex.test(sanitized);
  }

  // Validate company name with enhanced checks
  static validateCompanyName(name: string): boolean {
    const sanitized = this.sanitizeHtml(name.trim());
    return sanitized.length >= 2 && sanitized.length <= 255 && !/[<>\"'&]/.test(sanitized);
  }

  // Validate financial amounts with strict limits
  static validateAmount(amount: number): boolean {
    return !isNaN(amount) && isFinite(amount) && amount >= 0 && amount <= 999999999.99;
  }

  // Validate UUID format with strict pattern
  static validateUUID(uuid: string): boolean {
    if (!uuid || typeof uuid !== 'string') return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  // Validate date format with enhanced checks
  static validateDate(date: string): boolean {
    if (!date || typeof date !== 'string') return false;
    const parsedDate = new Date(date);
    const isValidDate = !isNaN(parsedDate.getTime());
    const matchesFormat = /^\d{4}-\d{2}-\d{2}$/.test(date);
    const isReasonableDate = parsedDate >= new Date('1900-01-01') && parsedDate <= new Date('2100-12-31');
    return isValidDate && matchesFormat && isReasonableDate;
  }

  // Enhanced rate limiting check using database
  static async checkRateLimit(
    key: string, 
    maxAttempts: number = 5, 
    windowMs: number = 900000
  ): Promise<boolean> {
    try {
      // Import SecurityService dynamically to avoid circular dependency
      const { SecurityService } = await import('@/services/securityService');
      
      const sanitizedKey = this.sanitizeHtml(key);
      const windowMinutes = Math.floor(windowMs / 60000);
      
      return await SecurityService.checkRateLimit(
        sanitizedKey,
        'generic_action',
        maxAttempts,
        windowMinutes,
        windowMinutes
      );
    } catch (error) {
      console.error('Rate limit check failed:', error);
      return true; // Fail open for availability
    }
  }

  // Validate admin credentials format
  static validateAdminCredentials(email: string, password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Email validation
    if (!email || typeof email !== 'string') {
      errors.push('Email requis');
    } else if (!this.validateEmail(email)) {
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

  // Validate session token format
  static validateSessionToken(token: string): boolean {
    if (!token || typeof token !== 'string') return false;
    // Session tokens should be UUIDs with timestamp suffix
    const tokenRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}-[0-9a-z]+$/i;
    return tokenRegex.test(token) && token.length <= 100;
  }

  // Validate invoice data with comprehensive checks
  static validateInvoiceData(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Basic field validation
    if (!data.contact_id || !this.validateUUID(data.contact_id)) {
      errors.push('ID client invalide');
    }

    if (!data.invoice_number || typeof data.invoice_number !== 'string') {
      errors.push('Numéro de facture requis');
    } else {
      const sanitized = this.sanitizeHtml(data.invoice_number);
      if (sanitized.length === 0 || sanitized.length > 50) {
        errors.push('Numéro de facture invalide (1-50 caractères)');
      }
    }

    if (!data.invoice_date || !this.validateDate(data.invoice_date)) {
      errors.push('Date de facture invalide');
    }

    if (!data.due_date || !this.validateDate(data.due_date)) {
      errors.push('Date d\'échéance invalide');
    }

    // Validate dates relationship
    if (data.invoice_date && data.due_date && new Date(data.due_date) < new Date(data.invoice_date)) {
      errors.push('La date d\'échéance ne peut pas être antérieure à la date de facture');
    }

    // Amount validation
    if (!this.validateAmount(data.total_amount)) {
      errors.push('Montant total invalide');
    }

    if (!this.validateAmount(data.subtotal)) {
      errors.push('Sous-total invalide');
    }

    if (!this.validateAmount(data.tax_amount)) {
      errors.push('Montant TVA invalide');
    }

    // Line items validation
    if (data.lines && Array.isArray(data.lines)) {
      data.lines.forEach((line: any, index: number) => {
        if (!line.description || typeof line.description !== 'string') {
          errors.push(`Description de la ligne ${index + 1} requise`);
        } else {
          const sanitized = this.sanitizeHtml(line.description);
          if (sanitized.length === 0 || sanitized.length > 500) {
            errors.push(`Description de la ligne ${index + 1} invalide (1-500 caractères)`);
          }
        }
        
        if (!this.validateAmount(line.quantity) || line.quantity <= 0) {
          errors.push(`Quantité de la ligne ${index + 1} invalide`);
        }
        
        if (!this.validateAmount(line.unit_price)) {
          errors.push(`Prix unitaire de la ligne ${index + 1} invalide`);
        }

        if (line.tax_rate !== undefined && (!this.validateAmount(line.tax_rate) || line.tax_rate < 0 || line.tax_rate > 100)) {
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

    if (!data.supplier_id || !this.validateUUID(data.supplier_id)) {
      errors.push('ID fournisseur invalide');
    }

    if (!data.purchase_number || typeof data.purchase_number !== 'string') {
      errors.push('Numéro d\'achat requis');
    } else {
      const sanitized = this.sanitizeHtml(data.purchase_number);
      if (sanitized.length === 0 || sanitized.length > 50) {
        errors.push('Numéro d\'achat invalide (1-50 caractères)');
      }
    }

    if (!data.purchase_date || !this.validateDate(data.purchase_date)) {
      errors.push('Date d\'achat invalide');
    }

    if (!this.validateAmount(data.total_amount)) {
      errors.push('Montant total invalide');
    }

    if (data.lines && Array.isArray(data.lines)) {
      data.lines.forEach((line: any, index: number) => {
        if (!line.description || typeof line.description !== 'string') {
          errors.push(`Description de la ligne ${index + 1} requise`);
        } else {
          const sanitized = this.sanitizeHtml(line.description);
          if (sanitized.length === 0 || sanitized.length > 500) {
            errors.push(`Description de la ligne ${index + 1} invalide`);
          }
        }
        
        if (!this.validateAmount(line.quantity) || line.quantity <= 0) {
          errors.push(`Quantité de la ligne ${index + 1} invalide`);
        }
        
        if (!this.validateAmount(line.unit_price)) {
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

    if (!this.validateAmount(data.amount) || data.amount <= 0) {
      errors.push('Montant invalide');
    }

    if (!data.description || typeof data.description !== 'string') {
      errors.push('Description requise');
    } else {
      const sanitized = this.sanitizeHtml(data.description);
      if (sanitized.length === 0 || sanitized.length > 1000) {
        errors.push('Description invalide (1-1000 caractères)');
      }
    }

    if (!data.transaction_date || !this.validateDate(data.transaction_date)) {
      errors.push('Date de transaction invalide');
    }

    return { valid: errors.length === 0, errors };
  }

  // Sanitize object recursively
  static sanitizeObject(obj: any): any {
    if (obj === null || obj === undefined) return obj;
    
    if (typeof obj === 'string') {
      return this.sanitizeHtml(obj);
    }
    
    if (typeof obj === 'number' || typeof obj === 'boolean') {
      return obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObject(item));
    }
    
    if (typeof obj === 'object') {
      const sanitized: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          sanitized[key] = this.sanitizeObject(obj[key]);
        }
      }
      return sanitized;
    }
    
    return obj;
  }
}
