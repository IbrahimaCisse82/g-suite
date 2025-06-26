
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Shield className="w-12 h-12 text-white" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Politique de Confidentialité
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Collecte des données</h2>
            <p className="text-slate-600 mb-4">
              Nous collectons uniquement les données nécessaires au fonctionnement de notre service. 
              Vos données sont traitées avec le plus grand soin et dans le respect du RGPD.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-6 mt-8">Utilisation des données</h2>
            <p className="text-slate-600 mb-4">
              Vos données sont utilisées exclusivement pour fournir nos services. 
              Elles ne sont jamais partagées avec des tiers sans votre consentement explicite.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-6 mt-8">Vos droits</h2>
            <p className="text-slate-600 mb-4">
              Vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. 
              Contactez-nous à support@g-suite.com pour exercer ces droits.
            </p>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default PrivacyPolicy;
