
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { Shield, Lock, Eye, Server, FileCheck, Users } from 'lucide-react';

const Security = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Shield className="w-12 h-12 text-white" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Sécurité G-Suite
            </h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Votre sécurité est notre priorité absolue. Découvrez comment nous protégeons vos données d'entreprise.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Lock className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Chiffrement End-to-End</h3>
              <p className="text-slate-600">
                Toutes vos données sont chiffrées avec les dernières technologies de sécurité.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Server className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Infrastructure Sécurisée</h3>
              <p className="text-slate-600">
                Nos serveurs sont hébergés dans des centres de données certifiés ISO 27001.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Eye className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Contrôle d'Accès</h3>
              <p className="text-slate-600">
                Gestion fine des permissions et authentification à deux facteurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Security;
