
import { InputSanitizer } from './inputSanitizer';

export class FormatValidators {
  // Validate email format with enhanced security
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const sanitized = InputSanitizer.sanitizeHtml(email.trim().toLowerCase());
    return emailRegex.test(sanitized) && sanitized.length <= 255 && sanitized.length >= 3;
  }

  // Validate phone number with international format support
  static validatePhone(phone: string): boolean {
    const sanitized = InputSanitizer.sanitizeHtml(phone.trim());
    const phoneRegex = /^\+?[\d\s\-\(\)]{8,20}$/;
    return phoneRegex.test(sanitized);
  }

  // Validate company name with enhanced checks
  static validateCompanyName(name: string): boolean {
    const sanitized = InputSanitizer.sanitizeHtml(name.trim());
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

  // Validate session token format
  static validateSessionToken(token: string): boolean {
    if (!token || typeof token !== 'string') return false;
    // Session tokens should be UUIDs with timestamp suffix
    const tokenRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}-[0-9a-z]+$/i;
    return tokenRegex.test(token) && token.length <= 100;
  }
}
