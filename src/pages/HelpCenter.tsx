
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { HelpCircle, Book, MessageCircle, Video } from 'lucide-react';

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <HelpCircle className="w-12 h-12 text-white" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Centre d'Aide
            </h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Trouvez rapidement les réponses à vos questions sur G-Suite.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Book className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Documentation</h3>
              <p className="text-slate-600">
                Guides détaillés pour utiliser toutes les fonctionnalités de G-Suite.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Video className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Tutoriels Vidéo</h3>
              <p className="text-slate-600">
                Apprenez à utiliser G-Suite avec nos tutoriels pas à pas.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <MessageCircle className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Support Chat</h3>
              <p className="text-slate-600">
                Contactez notre équipe support pour une aide personnalisée.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default HelpCenter;
