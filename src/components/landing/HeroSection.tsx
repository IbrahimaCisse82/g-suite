
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          La solution comptable 
          <span className="text-blue-600"> pour les PME africaines</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Simplifiez votre gestion d'entreprise avec G-Compta : comptabilité, facturation, 
          trésorerie et analyses, le tout dans une interface moderne et intuitive.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              <span>Essai gratuit 5 jours</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/quote">
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              Demander un devis
            </Button>
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          ✓ Aucune carte bancaire requise ✓ Configuration en 5 minutes
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
