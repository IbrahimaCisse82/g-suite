
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { FileCheck } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <FileCheck className="w-12 h-12 text-white" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Conditions Générales d'Utilisation
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Conditions d'utilisation</h2>
            <p className="text-slate-600 mb-4">
              En utilisant G-Suite, vous acceptez nos conditions générales d'utilisation. 
              Nous nous réservons le droit de modifier ces conditions à tout moment.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-6 mt-8">Responsabilités</h2>
            <p className="text-slate-600 mb-4">
              Vous êtes responsable de l'utilisation de votre compte et de la sécurité de vos données. 
              Grow Hub Sénégal décline toute responsabilité en cas d'usage inapproprié.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-6 mt-8">Résiliation</h2>
            <p className="text-slate-600 mb-4">
              Vous pouvez résilier votre compte à tout moment. 
              Nous nous réservons le droit de suspendre un compte en cas de violation des conditions.
            </p>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default TermsOfService;
