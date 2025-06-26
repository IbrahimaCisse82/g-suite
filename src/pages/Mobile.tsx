
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { Smartphone, Tablet, Download, Wifi } from 'lucide-react';

const Mobile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Smartphone className="w-12 h-12 text-white" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              G-Suite Mobile
            </h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Gérez votre entreprise où que vous soyez avec nos applications mobiles.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Smartphone className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Application iOS</h3>
              <p className="text-slate-600">
                Disponible sur l'App Store pour iPhone et iPad.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Tablet className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Application Android</h3>
              <p className="text-slate-600">
                Téléchargeable sur Google Play Store.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Wifi className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Mode Hors Ligne</h3>
              <p className="text-slate-600">
                Travaillez même sans connexion internet.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Mobile;
