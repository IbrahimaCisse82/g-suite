
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users, CheckCircle, Shield, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-emerald-600" />
        </div>
      </div>
      <div className="absolute top-32 right-20 animate-pulse">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Zap className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge de lancement */}
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 text-sm font-semibold shadow-sm">
                🚀 Nouvelle génération de gestion d'entreprise
              </div>

              {/* Titre principal */}
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
                Révolutionnez votre
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-blue-600">
                  gestion d'entreprise
                </span>
              </h1>

              {/* Sous-titre */}
              <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed">
                G-Suite transforme la gestion d'entreprise en Afrique avec une suite complète 
                d'outils modernes : comptabilité, CRM, facturation et gestion de stock en un seul endroit.
              </p>

              {/* Points clés avec animations */}
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { text: "Interface intuitive en français", delay: "0ms" },
                  { text: "Données sécurisées et chiffrées", delay: "100ms" }, 
                  { text: "Support technique dédié 24/7", delay: "200ms" },
                  { text: "Compatible multi-devises FCFA", delay: "300ms" }
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 animate-fade-in"
                    style={{ animationDelay: feature.delay }}
                  >
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Appels à l'action */}
              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    <span>Commencer gratuitement</span>
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-10 py-4 rounded-xl border-2 border-slate-300 hover:bg-slate-50 transition-all transform hover:scale-105"
                  >
                    <Play className="mr-3 w-5 h-5" />
                    Voir la démo
                  </Button>
                </Link>
              </div>

              {/* Statistiques de confiance avec animations */}
              <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-slate-200">
                {[
                  { icon: Users, number: "500+", text: "entreprises", color: "text-emerald-600" },
                  { icon: Star, number: "4.9/5", text: "satisfaction", color: "text-yellow-500 fill-current" },
                  { icon: Shield, number: "99.9%", text: "disponibilité", color: "text-blue-600" }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm text-slate-600 animate-fade-in hover:scale-105 transition-transform">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="font-bold text-slate-900">{stat.number}</span>
                    <span>{stat.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Visual amélioré */}
            <div className="relative">
              {/* Dashboard Preview principal */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-700">
                {/* Browser mockup */}
                <div className="bg-slate-100 rounded-2xl p-6 mb-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="flex-1 bg-slate-200 rounded h-6 mx-4"></div>
                  </div>
                  
                  {/* Dashboard content mockup */}
                  <div className="space-y-4">
                    <div className="h-6 bg-gradient-to-r from-emerald-300 to-emerald-200 rounded w-3/4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-4 bg-slate-200 rounded"></div>
                      <div className="h-4 bg-blue-200 rounded"></div>
                    </div>
                    <div className="h-4 bg-gradient-to-r from-green-200 to-emerald-200 rounded w-2/3"></div>
                  </div>
                </div>
                
                {/* Stats mockup */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">2.5M</div>
                    <div className="text-sm text-slate-600">Chiffre d'affaires</div>
                    <div className="text-xs text-emerald-600 font-medium">+15% ↗</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">1.2K</div>
                    <div className="text-sm text-slate-600">Clients actifs</div>
                    <div className="text-xs text-blue-600 font-medium">+8% ↗</div>
                  </div>
                </div>
              </div>

              {/* Floating elements améliorés */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full p-5 shadow-lg animate-bounce">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full p-5 shadow-lg animate-pulse">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              
              {/* Additional floating card */}
              <div className="absolute top-16 -left-8 bg-white rounded-2xl p-4 shadow-lg animate-fade-in">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">En ligne</span>
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
