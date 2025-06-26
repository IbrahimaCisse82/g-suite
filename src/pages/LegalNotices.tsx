
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { Scale } from 'lucide-react';

const LegalNotices = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Scale className="w-12 h-12 text-white" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Mentions Légales
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Éditeur du site</h2>
            <p className="text-slate-600 mb-4">
              <strong>Raison sociale :</strong> Grow Hub Sénégal SARL<br />
              <strong>Adresse :</strong> Dakar, Sénégal<br />
              <strong>Email :</strong> support@g-suite.com<br />
              <strong>Téléphone :</strong> +221 78 475 28 58
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-6 mt-8">Hébergement</h2>
            <p className="text-slate-600 mb-4">
              Le site G-Suite est hébergé par des services cloud sécurisés respectant les normes internationales de sécurité.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-6 mt-8">Propriété intellectuelle</h2>
            <p className="text-slate-600 mb-4">
              Tous les contenus présents sur ce site sont protégés par les droits de propriété intellectuelle. 
              Toute reproduction sans autorisation est interdite.
            </p>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default LegalNotices;
