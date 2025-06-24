
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, Shield, CheckCircle, X } from 'lucide-react';
import { SecurityService } from '@/services/securityService';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PasswordRequirement {
  text: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  { text: "Au moins 12 caractères", test: (p) => p.length >= 12 },
  { text: "Une majuscule", test: (p) => /[A-Z]/.test(p) },
  { text: "Une minuscule", test: (p) => /[a-z]/.test(p) },
  { text: "Un chiffre", test: (p) => /[0-9]/.test(p) },
  { text: "Un caractère spécial", test: (p) => /[^A-Za-z0-9]/.test(p) },
  { text: "Pas de caractères répétitifs", test: (p) => !/(.)\1{2,}/.test(p) }
];

interface PasswordCreationModalProps {
  email: string;
  onPasswordCreated: () => void;
  onCancel: () => void;
}

export const PasswordCreationModal: React.FC<PasswordCreationModalProps> = ({
  email,
  onPasswordCreated,
  onCancel
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const isPasswordValid = passwordRequirements.every(req => req.test(password));
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const canSubmit = isPasswordValid && passwordsMatch && !isLoading;

  const handlePasswordChange = (value: string) => {
    // Sanitize input to prevent XSS
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
          password: password // Password will be hashed server-side
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

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span>Création du mot de passe administrateur</span>
          </DialogTitle>
          <DialogDescription>
            Créez un mot de passe sécurisé pour votre compte administrateur
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">Nouveau mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Créez un mot de passe sécurisé"
                required
                maxLength={128}
                className="pr-12"
                autoComplete="new-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-8 w-8 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                placeholder="Confirmez votre mot de passe"
                required
                maxLength={128}
                className="pr-12"
                autoComplete="new-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-8 w-8 p-0"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Password requirements checklist */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-slate-900 mb-3">
              Exigences du mot de passe :
            </h4>
            <div className="space-y-2">
              {passwordRequirements.map((requirement, index) => {
                const isValid = requirement.test(password);
                return (
                  <div key={index} className="flex items-center space-x-2">
                    {isValid ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-slate-400" />
                    )}
                    <span className={`text-sm ${isValid ? 'text-green-700' : 'text-slate-600'}`}>
                      {requirement.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Password match indicator */}
          {confirmPassword && (
            <div className="flex items-center space-x-2">
              {passwordsMatch ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">Les mots de passe correspondent</span>
                </>
              ) : (
                <>
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-600">Les mots de passe ne correspondent pas</span>
                </>
              )}
            </div>
          )}

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex space-x-3">
            <Button
              type="submit"
              disabled={!canSubmit}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Lock className="w-4 h-4 mr-2 animate-spin" />
                  Création...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Créer le mot de passe
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
