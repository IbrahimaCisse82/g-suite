
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, AlertTriangle, Eye, EyeOff } from 'lucide-react';

interface PasswordCreationModalProps {
  onSubmit: (passwordData: { newPassword: string; confirmPassword: string }) => void;
  errors: string[];
  loading: boolean;
}

export const PasswordCreationModal = ({ onSubmit, errors, loading }: PasswordCreationModalProps) => {
  const [newPasswordData, setNewPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newPasswordData);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl">Première connexion</CardTitle>
        <CardDescription>
          Créez un nouveau mot de passe sécurisé
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

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? 'Création...' : 'Créer le mot de passe'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
