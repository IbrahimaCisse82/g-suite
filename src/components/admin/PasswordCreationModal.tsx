
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, AlertTriangle, Eye, EyeOff } from 'lucide-react';

interface PasswordCreationModalProps {
  email: string;
  onPasswordCreated: () => void;
  onCancel: () => void;
}

export const PasswordCreationModal = ({ email, onPasswordCreated, onCancel }: PasswordCreationModalProps) => {
  const [newPasswordData, setNewPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    // Validation
    const validationErrors: string[] = [];
    
    if (newPasswordData.newPassword.length < 8) {
      validationErrors.push('Le mot de passe doit contenir au moins 8 caractères');
    }
    
    if (newPasswordData.newPassword !== newPasswordData.confirmPassword) {
      validationErrors.push('Les mots de passe ne correspondent pas');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      // Here you would typically call your password update function
      // For now, we'll just simulate success
      setTimeout(() => {
        setLoading(false);
        onPasswordCreated();
      }, 1000);
    } catch (error) {
      setErrors(['Erreur lors de la création du mot de passe']);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Première connexion</CardTitle>
          <CardDescription>
            Créez un nouveau mot de passe sécurisé pour {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                  <span className="text-sm font-medium text-red-800">Erreurs :</span>
                </div>
                <ul className="list-disc list-inside text-sm text-red-700">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPasswordData.newPassword}
                  onChange={(e) => setNewPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Minimum 8 caractères"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={newPasswordData.confirmPassword}
                onChange={(e) => setNewPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirmer le mot de passe"
                required
              />
            </div>

            <div className="flex space-x-2">
              <Button 
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
                disabled={loading}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={loading}
              >
                {loading ? 'Création...' : 'Créer le mot de passe'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
