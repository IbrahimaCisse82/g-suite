
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Prêt à transformer votre gestion d'entreprise ?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Rejoignez des centaines d'entreprises qui font confiance à G-Compta
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Commencer l'essai gratuit
            </Button>
          </Link>
          <Link to="/quote">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
              Parler à un expert
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
