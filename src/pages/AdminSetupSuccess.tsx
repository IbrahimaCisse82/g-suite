
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSetupSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-800">Profil créé avec succès !</CardTitle>
          <CardDescription>
            Votre compte administrateur a été créé. Un email de validation a été envoyé.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center mb-2">
              <Mail className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-800">Vérifiez votre email</span>
            </div>
            <p className="text-sm text-blue-700">
              Cliquez sur le lien dans l'email pour valider votre compte et accéder à votre tableau de bord.
            </p>
          </div>
          
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Étapes suivantes :</strong></p>
            <ol className="list-decimal list-inside space-y-1 text-left">
              <li>Vérifiez votre boîte de réception</li>
              <li>Cliquez sur le lien de validation</li>
              <li>Accédez à votre tableau de bord entreprise</li>
            </ol>
          </div>

          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="w-full"
          >
            Retour à l'accueil
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetupSuccess;
