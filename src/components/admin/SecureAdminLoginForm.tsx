
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSecureAdminAuth } from '@/hooks/useSecureAdminAuth';
import { SecurityValidator } from '@/utils/securityValidation';
import { useToast } from '@/hooks/use-toast';

export const SecureAdminLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { login } = useSecureAdminAuth();
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    // Sanitize inputs
    const sanitizedEmail = SecurityValidator.sanitizeHtml(formData.email.trim());
    const sanitizedName = SecurityValidator.sanitizeHtml(formData.name.trim());

    // Validate email
    if (!sanitizedEmail || !SecurityValidator.validateEmail(sanitizedEmail)) {
      newErrors.push('Adresse email invalide');
    }

    // Validate name
    if (!sanitizedName || sanitizedName.length < 2 || sanitizedName.length > 100) {
      newErrors.push('Nom invalide (2-100 caractères requis)');
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
      const sanitizedName = SecurityValidator.sanitizeHtml(formData.name.trim());

      const success = await login(sanitizedEmail, sanitizedName);
      
      if (success) {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erreur de connexion",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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
                placeholder="admin@growhub.com"
                required
                maxLength={255}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nom Prénom"
                required
                maxLength={100}
                autoComplete="name"
              />
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
        </CardContent>
      </Card>
    </div>
  );
};
