
import DOMPurify from 'dompurify';

export class InputSanitizer {
  // Sanitize HTML input to prevent XSS
  static sanitizeHtml(input: string): string {
    return DOMPurify.sanitize(input, { 
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [] 
    });
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
