
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedData?: any;
}

export interface ValidationRule {
  field: string;
  message: string;
  isValid: boolean;
}

export type ValidationType = 'invoice' | 'purchase' | 'treasury' | 'contact' | 'product';
