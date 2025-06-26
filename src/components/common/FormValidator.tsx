
import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ValidationRule {
  field: string;
  message: string;
  isValid: boolean;
}

interface FormValidatorProps {
  rules: ValidationRule[];
  showSuccess?: boolean;
}

export const FormValidator = ({ rules, showSuccess = false }: FormValidatorProps) => {
  const errors = rules.filter(rule => !rule.isValid);
  const allValid = errors.length === 0;

  if (allValid && !showSuccess) return null;

  return (
    <div className="space-y-2">
      {errors.map((rule) => (
        <Alert key={rule.field} variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{rule.message}</AlertDescription>
        </Alert>
      ))}
      
      {allValid && showSuccess && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Tous les champs sont valides</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

// Hook utilitaire pour la validation
export const useFormValidation = () => {
  const validateRequired = (value: any, fieldName: string): ValidationRule => ({
    field: fieldName,
    message: `${fieldName} est obligatoire`,
    isValid: !!value && value.toString().trim().length > 0
  });

  const validateEmail = (email: string): ValidationRule => ({
    field: 'email',
    message: 'Format d\'email invalide',
    isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  });

  const validatePhone = (phone: string): ValidationRule => ({
    field: 'telephone',
    message: 'Numéro de téléphone invalide',
    isValid: /^[\+]?[\d\s\-\(\)]{8,20}$/.test(phone)
  });

  const validateAmount = (amount: number, fieldName: string = 'montant'): ValidationRule => ({
    field: fieldName,
    message: `${fieldName} doit être un nombre positif`,
    isValid: !isNaN(amount) && amount >= 0
  });

  const validateDate = (date: string, fieldName: string = 'date'): ValidationRule => ({
    field: fieldName,
    message: `${fieldName} invalide`,
    isValid: !isNaN(Date.parse(date))
  });

  return {
    validateRequired,
    validateEmail,
    validatePhone,
    validateAmount,
    validateDate
  };
};
