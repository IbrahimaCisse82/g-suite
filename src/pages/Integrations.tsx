
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { Zap, Download, Globe, Smartphone } from 'lucide-react';

const Integrations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Zap className="w-12 h-12 text-white" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Intégrations G-Suite
            </h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Connectez G-Suite à vos outils préférés pour une expérience de gestion optimale.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Download className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">API REST</h3>
              <p className="text-slate-600">
                API complète pour intégrer G-Suite à vos applications existantes.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Globe className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Webhooks</h3>
              <p className="text-slate-600">
                Recevez des notifications en temps réel sur les événements importants.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Smartphone className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Applications Mobiles</h3>
              <p className="text-slate-600">
                SDK pour créer vos propres applications mobiles connectées.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Integrations;
