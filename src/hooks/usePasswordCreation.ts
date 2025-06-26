
import { useState } from 'react';
import { SecurityService } from '@/services/securityService';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { validatePassword, checkPasswordsMatch } from '@/utils/validation/passwordValidator';

interface UsePasswordCreationProps {
  email: string;
  onPasswordCreated: () => void;
}

export const usePasswordCreation = ({ email, onPasswordCreated }: UsePasswordCreationProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const isPasswordValid = validatePassword(password);
  const passwordsMatch = checkPasswordsMatch(password, confirmPassword);
  const canSubmit = isPasswordValid && passwordsMatch && !isLoading;

  const handlePasswordChange = (value: string) => {
    const sanitizedValue = SecurityService.sanitizeInput(value);
    setPassword(sanitizedValue);
    setError('');
  };

  const handleConfirmPasswordChange = (value: string) => {
    const sanitizedValue = SecurityService.sanitizeInput(value);
    setConfirmPassword(sanitizedValue);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit) return;

    setIsLoading(true);
    setError('');

    try {
      // Validate password strength using our security service
      const isStrong = await SecurityService.validatePasswordStrength(password);
      if (!isStrong) {
        throw new Error('Le mot de passe ne respecte pas les critères de sécurité');
      }

      // Log security event
      await SecurityService.logSecurityAudit({
        eventType: 'admin_password_creation',
        userIdentifier: email,
        success: true
      });

      // Call edge function to securely update password
      const { data, error: updateError } = await supabase.functions.invoke('update-admin-password', {
        body: { 
          email: SecurityService.sanitizeInput(email), 
          password: password
        }
      });

      if (updateError || !data?.success) {
        throw new Error(data?.error || 'Erreur lors de la mise à jour du mot de passe');
      }

      toast({
        title: "Mot de passe créé",
        description: "Votre mot de passe administrateur a été configuré avec succès"
      });

      onPasswordCreated();

    } catch (error: any) {
      console.error('Password creation error:', error);
      
      await SecurityService.logSecurityAudit({
        eventType: 'admin_password_creation_failed',
        userIdentifier: email,
        success: false,
        errorMessage: error.message
      });

      setError(error.message || 'Erreur lors de la création du mot de passe');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isLoading,
    error,
    isPasswordValid,
    passwordsMatch,
    canSubmit,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
    setShowPassword,
    setShowConfirmPassword
  };
};
