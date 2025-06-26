
import { ValidationResult } from '../types';
import { InputSanitizer } from '@/utils/validation/inputSanitizer';
import { FormatValidators } from '@/utils/validation/formatValidators';

export class SecurityValidator {
  static sanitizeInput(input: string): string {
    return InputSanitizer.sanitizeHtml(input);
  }

  static sanitizeObject(obj: any): any {
    return InputSanitizer.sanitizeObject(obj);
  }

  static validateEmail(email: string): boolean {
    return FormatValidators.validateEmail(email);
  }

  static validatePhone(phone: string): boolean {
    return FormatValidators.validatePhone(phone);
  }

  static validateAmount(amount: number): boolean {
    return FormatValidators.validateAmount(amount);
  }

  static validateSecurityData(data: any): ValidationResult {
    const errors: string[] = [];
    const sanitizedData = this.sanitizeObject(data);

    // Validation des champs critiques
    if (data.password && data.password.length < 8) {
      errors.push('Le mot de passe doit contenir au moins 8 caractères');
    }

    if (data.email && !this.validateEmail(data.email)) {
      errors.push('Format d\'email invalide');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData: errors.length === 0 ? sanitizedData : undefined
    };
  }
}
