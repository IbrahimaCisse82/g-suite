import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSecureAdminAuth } from '@/hooks/useSecureAdminAuth';
import { SecurityValidator } from '@/utils/securityValidation';
import { useToast } from '@/hooks/use-toast';

export const SecureAdminLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCreation, setShowPasswordCreation] = useState(false);
  const [newPasswordData, setNewPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const { login, updatePassword } = useSecureAdminAuth();
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    // Sanitize inputs
    const sanitizedEmail = SecurityValidator.sanitizeHtml(formData.email.trim());
    const sanitizedPassword = SecurityValidator.sanitizeHtml(formData.password.trim());

    // Validate email
    if (!sanitizedEmail || !SecurityValidator.validateEmail(sanitizedEmail)) {
      newErrors.push('Adresse email invalide');
    }

    // Validate password
    if (!sanitizedPassword || sanitizedPassword.length < 1) {
      newErrors.push('Mot de passe requis');
    }

    // Check rate limiting
    if (!SecurityValidator.checkRateLimit('admin_login', 5, 900000)) {
      newErrors.push('Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const sanitizedEmail = SecurityValidator.sanitizeHtml(formData.email.trim());
      const sanitizedPassword = SecurityValidator.sanitizeHtml(formData.password.trim());

      const result = await login(sanitizedEmail, sanitizedPassword);
      
      if (result.success) {
        if (result.isFirstLogin) {
          setShowPasswordCreation(true);
        } else {
          navigate('/admin');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setErrors([error.message || 'Une erreur est survenue lors de la connexion']);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPasswordData.newPassword !== newPasswordData.confirmPassword) {
      setErrors(['Les mots de passe ne correspondent pas']);
      return;
    }

    if (newPasswordData.newPassword.length < 8) {
      setErrors(['Le nouveau mot de passe doit contenir au moins 8 caractères']);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const sanitizedEmail = SecurityValidator.sanitizeHtml(formData.email.trim());
      await updatePassword(sanitizedEmail, newPasswordData.newPassword);
      navigate('/admin');
    } catch (error: any) {
      setErrors([error.message || 'Erreur lors de la création du mot de passe']);
    } finally {
      setLoading(false);
    }
  };

  if (showPasswordCreation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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
            <form onSubmit={handlePasswordCreation} className="space-y-4">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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

          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="text-sm"
            >
              Retour à l'accueil
            </Button>
          </div>

          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-xs text-gray-600">
              <strong>Connexion sécurisée.</strong><br />
              Veuillez saisir vos identifiants personnels.<br />
              Contactez le support si vous rencontrez un problème d'accès.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
