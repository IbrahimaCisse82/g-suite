
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const handleVideoDemo = () => {
    // Pour l'instant, on peut rediriger vers une page de démo ou ouvrir un modal
    alert('Démonstration vidéo bientôt disponible !');
  };

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge de lancement */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium animate-pulse">
            🚀 Nouveau : Essai gratuit de 5 jours sans engagement
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            La solution de gestion
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              pensée pour l'Afrique
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Transformez votre entreprise avec G-Suite : comptabilité, facturation, CRM et gestion de stock 
            réunis dans une plateforme intuitive et puissante.
          </p>

          {/* Statistiques de confiance */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span>500+ entreprises</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span>4.9/5 étoiles</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span>99.9% de disponibilité</span>
            </div>
          </div>

          {/* Appels à l'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/company-registration">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <span>Essai gratuit 5 jours</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 rounded-lg border-2 hover:bg-gray-50 transition-all"
              onClick={handleVideoDemo}
            >
              <Play className="mr-2 w-5 h-5" />
              Voir la démo
            </Button>
          </div>

          {/* Garantie */}
          <div className="pt-8">
            <p className="text-sm text-gray-500">
              ✅ Aucune carte bancaire requise • ✅ Configuration en moins de 5 minutes • ✅ Support francophone
            </p>
          </div>
        </div>

        {/* Illustration ou screenshot */}
        <div className="mt-16 relative">
          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-xl shadow-2xl overflow-hidden bg-white border">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Interface G-Suite</h3>
                  <p className="text-gray-600">Découvrez notre tableau de bord intuitif</p>
                  <Link to="/dashboard">
                    <Button>Voir l'aperçu</Button>
                  </Link>
                </div>
              </div>
              {/* Simulated browser window */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
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
