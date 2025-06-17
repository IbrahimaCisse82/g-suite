
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setEmailSent(true);
      toast.success('Email de réinitialisation envoyé');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de l\'envoi de l\'email');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white border-gray-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Email envoyé</CardTitle>
            <p className="text-gray-600">Vérifiez votre boîte email</p>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-700 mb-6">
              Un email de réinitialisation a été envoyé à <strong>{email}</strong>. 
              Cliquez sur le lien dans l'email pour réinitialiser votre mot de passe.
            </p>
            
            <Link to="/login" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 w-full justify-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Retour à la connexion
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-gray-200 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <Building className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Mot de passe oublié</CardTitle>
          <p className="text-gray-600">Entrez votre email pour recevoir un lien de réinitialisation</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900">Email professionnel</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@entreprise.com"
                  className="pl-10 text-gray-900 bg-white border-gray-300"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white" 
              disabled={isLoading}
            >
              {isLoading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Retour à la connexion
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
