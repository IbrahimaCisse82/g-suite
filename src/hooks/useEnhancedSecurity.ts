
import { useState, useCallback } from 'react';
import { SecurityValidator } from '@/utils/securityValidation';
import { useToast } from '@/hooks/use-toast';

interface SecurityState {
  rateLimitExceeded: boolean;
  lastAttempt: number | null;
}

export const useEnhancedSecurity = () => {
  const [securityState, setSecurityState] = useState<SecurityState>({
    rateLimitExceeded: false,
    lastAttempt: null
  });
  const { toast } = useToast();

  const checkRateLimit = useCallback(async (
    action: string,
    maxAttempts: number = 5,
    windowMs: number = 900000
  ): Promise<boolean> => {
    try {
      const allowed = await SecurityValidator.checkRateLimit(action, maxAttempts, windowMs);
      
      if (!allowed) {
        setSecurityState(prev => ({
          ...prev,
          rateLimitExceeded: true,
          lastAttempt: Date.now()
        }));
        
        toast({
          title: "Limite de tentatives dépassée",
          description: "Veuillez attendre avant de réessayer",
          variant: "destructive"
        });
        
        return false;
      }
      
      setSecurityState(prev => ({
        ...prev,
        rateLimitExceeded: false,
        lastAttempt: Date.now()
      }));
      
      return true;
    } catch (error) {
      console.error('Rate limit check failed:', error);
      return true; // Fail open
    }
  }, [toast]);

  const validateAndSanitizeFormData = useCallback((data: any, validationType: 'invoice' | 'purchase' | 'treasury') => {
    // First sanitize the data
    const sanitizedData = SecurityValidator.sanitizeObject(data);
    
    // Then validate based on type
    let validation;
    switch (validationType) {
      case 'invoice':
        validation = SecurityValidator.validateInvoiceData(sanitizedData);
        break;
      case 'purchase':
        validation = SecurityValidator.validatePurchaseData(sanitizedData);
        break;
      case 'treasury':
        validation = SecurityValidator.validateTreasuryData(sanitizedData);
        break;
      default:
        validation = { valid: false, errors: ['Type de validation non supporté'] };
    }
    
    if (!validation.valid) {
      validation.errors.forEach(error => {
        toast({
          title: "Erreur de validation",
          description: error,
          variant: "destructive"
        });
      });
    }
    
    return {
      isValid: validation.valid,
      sanitizedData,
      errors: validation.errors
    };
  }, [toast]);

  const logSecurityEvent = useCallback(async (eventType: string, metadata: any = {}) => {
    try {
      // In a real implementation, this would call a server endpoint
      console.log('Security event logged:', {
        eventType,
        timestamp: new Date().toISOString(),
        metadata: SecurityValidator.sanitizeObject(metadata)
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }, []);

  return {
    securityState,
    checkRateLimit,
    validateAndSanitizeFormData,
    logSecurityEvent
  };
};
