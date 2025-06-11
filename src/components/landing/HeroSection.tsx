
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const handleWatchDemo = () => {
    // Ouvrir une vidéo de démo ou rediriger vers une page de démo
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 lg:py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-slate-700 [mask-image:linear-gradient(0deg,rgba(0,0,0,0.8),rgba(0,0,0,0.2))] -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                ✨ Solution de gestion nouvelle génération
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Gérez votre entreprise
                <span className="text-green-400"> en toute simplicité</span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed">
                G-Suite révolutionne la gestion d'entreprise avec une suite complète d'outils : 
                comptabilité, facturation, stock, CRM et bien plus. Conçu spécialement pour les PME africaines.
              </p>
            </div>

            {/* Key benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">Interface moderne et intuitive</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">100% cloud et sécurisé</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">Support expert inclus</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">Accessible partout</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all">
                  <span>Essai gratuit 14 jours</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-4 text-lg rounded-lg"
                onClick={handleWatchDemo}
              >
                <Play className="mr-2 w-5 h-5" />
                Voir la démo
              </Button>
            </div>

            <p className="text-sm text-slate-400">
              ✓ Aucune carte bancaire requise ✓ Configuration en 5 minutes ✓ Support gratuit
            </p>
          </div>

          {/* Right column - Visual */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl transform -rotate-6 -z-10"></div>
              <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-3 bg-green-500 rounded w-1/3"></div>
                  <div className="h-3 bg-slate-300 rounded w-16"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-300 rounded w-full"></div>
                  <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-300 rounded w-1/2"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded p-3 border border-slate-200">
                    <div className="h-3 bg-green-400 rounded w-2/3 mb-2"></div>
                    <div className="h-6 bg-slate-200 rounded w-full"></div>
                  </div>
                  <div className="bg-white rounded p-3 border border-slate-200">
                    <div className="h-3 bg-green-400 rounded w-1/2 mb-2"></div>
                    <div className="h-6 bg-slate-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
