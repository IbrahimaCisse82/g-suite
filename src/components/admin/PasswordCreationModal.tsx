
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, Shield } from 'lucide-react';
import { usePasswordCreation } from '@/hooks/usePasswordCreation';
import { PasswordRequirements } from './PasswordRequirements';
import { PasswordMatchIndicator } from './PasswordMatchIndicator';

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
  const {
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isLoading,
    error,
    passwordsMatch,
    canSubmit,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
    setShowPassword,
    setShowConfirmPassword
  } = usePasswordCreation({ email, onPasswordCreated });

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

          <PasswordRequirements password={password} />

          <PasswordMatchIndicator 
            confirmPassword={confirmPassword} 
            passwordsMatch={passwordsMatch} 
          />

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
