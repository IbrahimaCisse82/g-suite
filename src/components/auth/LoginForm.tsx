import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GSuiteLogo } from '@/components/ui/gsuite-logo';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  isLoading
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Image de gestion en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Gestion d'entreprise"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-6xl">
        {/* Section image à gauche */}
        <div className="hidden lg:flex lg:w-1/2 lg:pr-12">
          <div className="w-full">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Équipe travaillant sur la gestion d'entreprise"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Gérez votre entreprise efficacement
              </h2>
              <p className="text-gray-600">
                Une solution complète pour la gestion de votre entreprise avec G-Suite
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire de connexion à droite */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <Card className="w-full max-w-md bg-white border-gray-200 shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <GSuiteLogo size={64} />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Connexion G-Suite</CardTitle>
              <p className="text-gray-600">Accédez à votre espace entreprise</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
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
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-900">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Votre mot de passe"
                      className="pl-10 pr-10 text-gray-900 bg-white border-gray-300"
                      required
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

                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700">
                    Mot de passe oublié ?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </form>

              <div className="mt-6 text-center space-y-4">
                <div className="text-sm text-gray-600">
                  Pas encore de compte ? 
                  <Link to="/company-registration" className="text-green-600 hover:text-green-700 font-medium ml-1">
                    Inscrivez votre entreprise
                  </Link>
                </div>
                
                <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Retour à l'accueil
                </Link>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Compte d'entreprise requis</strong><br />
                  Chaque email est associé à un compte d'entreprise unique. Contactez votre administrateur si vous avez des difficultés de connexion.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
