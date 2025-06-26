
// Main SecurityValidator class that aggregates all validation functionality
import { InputSanitizer } from './validation/inputSanitizer';
import { FormatValidators } from './validation/formatValidators';
import { BusinessValidators } from './validation/businessValidators';
import { SecurityHelpers } from './validation/securityHelpers';

export class SecurityValidator {
  // Sanitization methods
  static sanitizeHtml(input: string): string {
    return InputSanitizer.sanitizeHtml(input);
  }

  static sanitizeObject(obj: any): any {
    return InputSanitizer.sanitizeObject(obj);
  }

  // Format validation methods
  static validateEmail(email: string): boolean {
    return FormatValidators.validateEmail(email);
  }

  static validatePhone(phone: string): boolean {
    return FormatValidators.validatePhone(phone);
  }

  static validateCompanyName(name: string): boolean {
    return FormatValidators.validateCompanyName(name);
  }

  static validateAmount(amount: number): boolean {
    return FormatValidators.validateAmount(amount);
  }

  static validateUUID(uuid: string): boolean {
    return FormatValidators.validateUUID(uuid);
  }

  static validateDate(date: string): boolean {
    return FormatValidators.validateDate(date);
  }

  static validateSessionToken(token: string): boolean {
    return FormatValidators.validateSessionToken(token);
  }

  // Business validation methods
  static validateAdminCredentials(email: string, password: string): { valid: boolean; errors: string[] } {
    return BusinessValidators.validateAdminCredentials(email, password);
  }

  static validateInvoiceData(data: any): { valid: boolean; errors: string[] } {
    return BusinessValidators.validateInvoiceData(data);
  }

  static validatePurchaseData(data: any): { valid: boolean; errors: string[] } {
    return BusinessValidators.validatePurchaseData(data);
  }

  static validateTreasuryData(data: any): { valid: boolean; errors: string[] } {
    return BusinessValidators.validateTreasuryData(data);
  }

  // Security helpers
  static async checkRateLimit(
    key: string, 
    maxAttempts: number = 5, 
    windowMs: number = 900000
  ): Promise<boolean> {
    return SecurityHelpers.checkRateLimit(key, maxAttempts, windowMs);
  }
}
