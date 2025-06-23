import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, AlertTriangle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEnhancedAdminAuth } from '@/hooks/useSecureAdminAuth';
import { useEnhancedSecurity } from '@/hooks/useEnhancedSecurity';
import { SecurityValidator } from '@/utils/securityValidation';
import { useToast } from '@/hooks/use-toast';

export const EnhancedAdminLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  
  const navigate = useNavigate();
  const { login } = useEnhancedAdminAuth();
  const { checkRateLimit, logSecurityEvent, securityState } = useEnhancedSecurity();
  const { toast } = useToast();

  const validateForm = async (): Promise<boolean> => {
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

    // Check rate limiting with enhanced feedback
    const rateLimitAllowed = await checkRateLimit('admin_login', 5, 900000);
    if (!rateLimitAllowed) {
      newErrors.push('Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.');
      setRemainingAttempts(0);
    } else {
      // Calculate remaining attempts (this would be better served by the server)
      const attempts = JSON.parse(localStorage.getItem('rate_limit_admin_login') || '[]');
      const remainingCount = Math.max(0, 5 - attempts.length);
      setRemainingAttempts(remainingCount);
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!(await validateForm())) {
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const sanitizedEmail = SecurityValidator.sanitizeHtml(formData.email.trim());
      const sanitizedName = SecurityValidator.sanitizeHtml(formData.name.trim());

      // Log security event
      await logSecurityEvent('admin_login_attempt', {
        email: sanitizedEmail,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });

      const success = await login(sanitizedEmail, sanitizedName);
      
      if (success) {
        await logSecurityEvent('admin_login_success', { email: sanitizedEmail });
        navigate('/admin');
      } else {
        await logSecurityEvent('admin_login_failed', { email: sanitizedEmail });
        setErrors(['Identifiants administrateur invalides']);
      }
    } catch (error) {
      console.error('Login error:', error);
      await logSecurityEvent('admin_login_error', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      toast({
        title: "Erreur de connexion",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    const sanitizedValue = SecurityValidator.sanitizeHtml(value);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
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

            {securityState.rateLimitExceeded && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Clock className="w-4 h-4 text-orange-600 mr-2" />
                  <span className="text-sm font-medium text-orange-800">Limite de sécurité atteinte</span>
                </div>
                <p className="text-sm text-orange-700">
                  Veuillez attendre avant de réessayer. Cette mesure protège contre les attaques automatisées.
                </p>
              </div>
            )}

            {remainingAttempts !== null && remainingAttempts > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                <p className="text-sm text-yellow-800">
                  Tentatives restantes : {remainingAttempts}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email administrateur</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="admin@growhub.com"
                required
                maxLength={255}
                autoComplete="email"
                disabled={loading || securityState.rateLimitExceeded}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Nom Prénom"
                required
                maxLength={100}
                autoComplete="name"
                disabled={loading || securityState.rateLimitExceeded}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || securityState.rateLimitExceeded}
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

          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>Connexion sécurisée avec validation renforcée</p>
            <p>Toutes les tentatives de connexion sont surveillées</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
