
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Mail } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

interface LicenseRequestConfirmationProps {
  companyName: string;
  email: string;
}

export const LicenseRequestConfirmation = ({ companyName, email }: LicenseRequestConfirmationProps) => {
  const [countdown, setCountdown] = useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const progressValue = ((15 - countdown) / 15) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0">
        <CardHeader className="text-center bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Demande envoyée avec succès !</CardTitle>
        </CardHeader>
        
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <Mail className="w-6 h-6" />
              <span className="text-lg font-semibold">Confirmation envoyée à {email}</span>
            </div>
            
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-800 mb-3">Prochaines étapes :</h3>
              <ul className="text-left space-y-2 text-green-700">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">1.</span>
                  <span>Vous recevrez un email de confirmation de <strong>support@g-suiteapp.com</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">2.</span>
                  <span>Votre compte sera activé dans les <strong>24 heures</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">3.</span>
                  <span>Vous recevrez votre clé licence par email</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-semibold mb-2">
                Entreprise : <span className="text-blue-600">{companyName}</span>
              </p>
              <p className="text-sm text-blue-600">
                Notre équipe traitera votre demande dans les plus brefs délais.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>Redirection automatique dans {countdown} secondes</span>
            </div>
            <Progress value={progressValue} className="w-full" />
          </div>

          <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold mb-2">Besoin d'aide ?</p>
            <p>Contactez notre support : <strong>support@g-suiteapp.com</strong></p>
            <p>Téléphone : <strong>+221 78 475 28 58</strong></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
