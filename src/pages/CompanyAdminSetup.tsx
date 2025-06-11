
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Building2 } from 'lucide-react';

const CompanyAdminSetup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const companyId = searchParams.get('company_id');
  const token = searchParams.get('token');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyId || !token) {
      toast({
        title: "Erreur",
        description: "Lien invalide. Veuillez utiliser le lien reçu par email.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Vérifier que la demande est valide et approuvée
      const { data: request } = await supabase
        .from('paid_account_requests')
        .select('*, companies(name)')
        .eq('company_id', companyId)
        .eq('status', 'approved')
        .single();

      if (!request) {
        throw new Error('Demande non trouvée ou non approuvée');
      }

      // Créer le compte utilisateur
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            company_id: companyId,
            is_company_admin: true,
          },
        },
      });

      if (authError) throw authError;

      // Envoyer email de validation personnalisé
      await supabase.functions.invoke('send-profile-validation', {
        body: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          companyName: request.companies?.name,
        },
      });

      toast({
        title: "Compte créé avec succès !",
        description: "Un email de validation a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception.",
      });

      // Rediriger vers une page de confirmation
      navigate('/admin-setup-success');

    } catch (error: any) {
      console.error('Erreur lors de la création du profil:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création du profil.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Créer votre profil administrateur</CardTitle>
          <CardDescription>
            Configurez votre compte administrateur pour accéder à votre tableau de bord entreprise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Votre nom"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Adresse email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@votreentreprise.com"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Mot de passe *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Minimum 8 caractères"
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirmez votre mot de passe"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création en cours...
                </>
              ) : (
                'Créer mon profil administrateur'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyAdminSetup;
