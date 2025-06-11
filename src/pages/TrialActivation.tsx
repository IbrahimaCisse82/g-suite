
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const TrialActivation = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'expired' | 'error'>('loading');
  const [trialInfo, setTrialInfo] = useState<any>(null);

  useEffect(() => {
    const activateTrial = async () => {
      if (!token) {
        setStatus('error');
        return;
      }

      try {
        // Vérifier la validité du token
        const { data: trialData, error } = await supabase
          .from('trial_accounts')
          .select(`
            *,
            companies (
              name,
              email
            )
          `)
          .eq('trial_token', token)
          .single();

        if (error || !trialData) {
          setStatus('error');
          return;
        }

        // Vérifier si l'essai n'a pas expiré
        const now = new Date();
        const expiresAt = new Date(trialData.expires_at);
        
        if (now > expiresAt) {
          setStatus('expired');
          setTrialInfo(trialData);
          return;
        }

        // Activer l'essai
        const { error: updateError } = await supabase
          .from('trial_accounts')
          .update({ 
            activated_at: new Date().toISOString(),
            is_active: true 
          })
          .eq('trial_token', token);

        if (updateError) {
          setStatus('error');
          return;
        }

        setTrialInfo(trialData);
        setStatus('success');

      } catch (error) {
        console.error('Erreur activation essai:', error);
        setStatus('error');
      }
    };

    activateTrial();
  }, [token]);

  const handleAccessApp = () => {
    navigate('/dashboard');
  };

  const handleRequestQuote = () => {
    navigate(`/quote-request?company_id=${trialInfo?.company_id}`);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
              <h2 className="text-xl font-semibold mb-2">Activation en cours...</h2>
              <p className="text-gray-600">Veuillez patienter pendant que nous activons votre essai.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'success') {
    const expiresAt = new Date(trialInfo.expires_at);
    const remainingDays = Math.ceil((expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-600">
              Essai activé avec succès !
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-lg">
                Bienvenue <strong>{trialInfo.companies?.name}</strong> !
              </p>
              <p className="text-gray-600">
                Votre période d'essai gratuite de <strong>5 jours</strong> est maintenant active.
                Il vous reste <strong>{remainingDays} jour(s)</strong> pour découvrir toutes les fonctionnalités de G-Suite.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg my-6">
                <h3 className="font-semibold text-blue-900 mb-2">Pendant votre essai, vous pouvez :</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>✓ Créer et envoyer des factures professionnelles</li>
                  <li>✓ Gérer vos clients et contacts</li>
                  <li>✓ Suivre votre trésorerie en temps réel</li>
                  <li>✓ Contrôler vos stocks et inventaires</li>
                  <li>✓ Générer des rapports financiers détaillés</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleAccessApp} size="lg" className="flex-1 sm:flex-none">
                  Accéder à l'application
                </Button>
                <Button variant="outline" onClick={handleRequestQuote} size="lg" className="flex-1 sm:flex-none">
                  Demander un devis
                </Button>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Besoin d'aide ? Contactez notre support : support@growhubsenegal.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'expired') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-2xl text-red-600">
              Lien d'essai expiré
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Désolé, ce lien d'activation a expiré. La période d'essai de 5 jours est dépassée.
              </p>
              
              <div className="bg-yellow-50 p-4 rounded-lg my-6">
                <h3 className="font-semibold text-yellow-900 mb-2">Pas de panique !</h3>
                <p className="text-yellow-800 text-sm">
                  Vous pouvez toujours accéder à G-Suite en souscrivant à un de nos forfaits.
                  Toutes vos données sont conservées et vous les retrouverez dès votre souscription.
                </p>
              </div>

              <Button onClick={handleRequestQuote} size="lg">
                Demander un devis personnalisé
              </Button>

              <p className="text-sm text-gray-500 mt-4">
                Questions ? Contactez-nous : commercial@growhubsenegal.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <CardTitle className="text-2xl text-red-600">
            Erreur d'activation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Le lien d'activation n'est pas valide ou a expiré.
            </p>
            <Button onClick={() => navigate('/')} variant="outline">
              Retour à l'accueil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrialActivation;
