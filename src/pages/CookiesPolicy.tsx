
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { Cookie } from 'lucide-react';

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Cookie className="w-12 h-12 text-white" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Politique des Cookies
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Utilisation des cookies</h2>
            <p className="text-slate-600 mb-4">
              G-Suite utilise des cookies pour améliorer votre expérience utilisateur et analyser l'utilisation du site. 
              Ces cookies sont essentiels au bon fonctionnement de notre service.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-6 mt-8">Types de cookies</h2>
            <p className="text-slate-600 mb-4">
              Nous utilisons des cookies de session, des cookies persistants et des cookies d'analyse. 
              Vous pouvez configurer votre navigateur pour refuser les cookies.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-6 mt-8">Gestion des cookies</h2>
            <p className="text-slate-600 mb-4">
              Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur. 
              Notez que désactiver les cookies peut affecter certaines fonctionnalités.
            </p>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default CookiesPolicy;
