
import React from 'react';
import { Link } from 'react-router-dom';

export const FormationCTA = () => {
  const handleNavigation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-green-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Prêt à Commencer Votre Formation ?
        </h2>
        <p className="text-xl text-green-100 mb-8">
          Rejoignez des centaines d'entrepreneurs qui ont transformé leur entreprise avec G-Suite
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            onClick={handleNavigation}
            className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Demander un devis
          </Link>
          <Link
            to="/help-center"
            onClick={handleNavigation}
            className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </section>
  );
};
