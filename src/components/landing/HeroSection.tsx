
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users, CheckCircle, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge de lancement */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                🚀 Nouvelle génération de gestion d'entreprise
              </div>

              {/* Titre principal */}
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Transformez votre
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                  gestion d'entreprise
                </span>
              </h1>

              {/* Sous-titre */}
              <p className="text-xl text-slate-600 leading-relaxed">
                G-Suite révolutionne la gestion d'entreprise en Afrique avec une suite complète 
                d'outils modernes : comptabilité, CRM, facturation et gestion de stock.
              </p>

              {/* Points clés */}
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Interface intuitive en français",
                  "Données sécurisées et chiffrées", 
                  "Support technique dédié",
                  "Compatible multi-devises"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Appels à l'action */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/company-registration">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                    <span>Démarrer maintenant</span>
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/about-us">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-4 rounded-lg border-2 hover:bg-slate-50 transition-all"
                  >
                    <Play className="mr-2 w-5 h-5" />
                    En savoir plus
                  </Button>
                </Link>
              </div>

              {/* Statistiques de confiance */}
              <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-slate-200">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold">500+</span>
                  <span>entreprises</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">4.9/5</span>
                  <span>satisfaction</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">99.9%</span>
                  <span>disponibilité</span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              {/* Dashboard Preview */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-slate-100 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-emerald-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-4 bg-blue-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-600">250K</div>
                    <div className="text-sm text-slate-600">Chiffre d'affaires</div>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">1,2K</div>
                    <div className="text-sm text-slate-600">Clients actifs</div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <Zap className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-emerald-500 rounded-full p-4 shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
