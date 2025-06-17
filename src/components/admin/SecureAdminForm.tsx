
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { SecurityValidator } from '@/utils/securityValidation';

interface SecureAdminFormProps {
  onSubmit: (formData: { email: string; password: string }) => void;
  errors: string[];
  loading: boolean;
}

export const SecureAdminForm = ({ onSubmit, errors, loading }: SecureAdminFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    const sanitizedEmail = SecurityValidator.sanitizeHtml(formData.email.trim());
    const sanitizedPassword = SecurityValidator.sanitizeHtml(formData.password.trim());

    if (!sanitizedEmail || !SecurityValidator.validateEmail(sanitizedEmail)) {
      return false;
    }

    if (!sanitizedPassword || sanitizedPassword.length < 1) {
      return false;
    }

    if (!SecurityValidator.checkRateLimit('admin_login', 5, 900000)) {
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const sanitizedData = {
      email: SecurityValidator.sanitizeHtml(formData.email.trim()),
      password: SecurityValidator.sanitizeHtml(formData.password.trim())
    };

    onSubmit(sanitizedData);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl">Administration Sécurisée</CardTitle>
        <CardDescription>
          Connexion au panneau d'administration GrowHub
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                <span className="text-sm font-medium text-red-800">Erreurs de validation :</span>
              </div>
              <ul className="list-disc list-inside text-sm text-red-700">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email administrateur</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="admin@growhubsenegal.com"
              required
              maxLength={255}
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Mot de passe"
                required
                autoComplete="current-password"
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

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
