
import DOMPurify from 'dompurify';

export class SecurityValidator {
  // Sanitize HTML input to prevent XSS
  static sanitizeHtml(input: string): string {
    return DOMPurify.sanitize(input, { 
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [] 
    });
  }

  // Validate email format
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 255;
  }

  // Validate phone number
  static validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]{8,20}$/;
    return phoneRegex.test(phone);
  }

  // Validate company name
  static validateCompanyName(name: string): boolean {
    const sanitized = this.sanitizeHtml(name);
    return sanitized.length >= 2 && sanitized.length <= 255;
  }

  // Validate financial amounts
  static validateAmount(amount: number): boolean {
    return !isNaN(amount) && isFinite(amount) && amount >= 0 && amount <= 999999999;
  }

  // Validate UUID format
  static validateUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  // Validate date format
  static validateDate(date: string): boolean {
    const parsedDate = new Date(date);
    const isValidDate = !isNaN(parsedDate.getTime());
    const matchesFormat = /^\d{4}-\d{2}-\d{2}$/.test(date);
    return isValidDate && matchesFormat;
  }

  // Rate limiting helper
  static checkRateLimit(key: string, maxAttempts: number = 5, windowMs: number = 900000): boolean {
    const now = Date.now();
    const attempts = JSON.parse(localStorage.getItem(`rate_limit_${key}`) || '[]');
    
    // Remove old attempts outside the time window
    const validAttempts = attempts.filter((timestamp: number) => now - timestamp < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false; // Rate limit exceeded
    }
    
    validAttempts.push(now);
    localStorage.setItem(`rate_limit_${key}`, JSON.stringify(validAttempts));
    return true;
  }

  // Validate purchase/invoice data
  static validatePurchaseData(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.supplier_id || !this.validateUUID(data.supplier_id)) {
      errors.push('ID fournisseur invalide');
    }

    if (!data.purchase_number || data.purchase_number.length > 50) {
      errors.push('Numéro d\'achat invalide');
    }

    if (!data.purchase_date || !this.validateDate(data.purchase_date)) {
      errors.push('Date d\'achat invalide');
    }

    if (!this.validateAmount(data.total_amount)) {
      errors.push('Montant total invalide');
    }

    if (data.lines && Array.isArray(data.lines)) {
      data.lines.forEach((line: any, index: number) => {
        if (!line.description || line.description.length > 500) {
          errors.push(`Description de la ligne ${index + 1} invalide`);
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
}
