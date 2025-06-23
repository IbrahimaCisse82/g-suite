
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield, Eye, EyeOff } from 'lucide-react';
import { useSecureAdminAuth } from '@/hooks/useSecureAdminAuth';
import { PasswordCreationModal } from './PasswordCreationModal';
import { GSuiteLogo } from '@/components/ui/gsuite-logo';

export const SecureAdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPasswordCreation, setShowPasswordCreation] = useState(false);
  
  const { login } = useSecureAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      
      if (result.success) {
        if (result.isFirstLogin) {
          setShowPasswordCreation(true);
        } else {
          navigate('/admin');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordCreated = () => {
    setShowPasswordCreation(false);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-6 text-center bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <GSuiteLogo size={48} />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">G-Suite Admin</CardTitle>
              <CardDescription className="text-green-100 text-base mt-2">
                Connexion au panneau d'administration G-Suite
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email administrateur
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="support@g-suiteapp.com"
                  required
                  className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-12 pr-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Accéder au panneau d'administration
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Connexion sécurisée G-Suite</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  © 2024 G-Suite Application
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {showPasswordCreation && (
          <PasswordCreationModal
            email={email}
            onPasswordCreated={handlePasswordCreated}
            onCancel={() => setShowPasswordCreation(false)}
          />
        )}
      </div>
    </div>
  );
};
