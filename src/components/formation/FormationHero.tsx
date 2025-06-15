
import React from 'react';
import { Play, Video } from 'lucide-react';

export const FormationHero = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Formation G-Suite
        </h1>
        <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
          Développez vos compétences avec nos formations complètes et devenez un expert G-Suite. 
          Formations en ligne, en présentiel et personnalisées disponibles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            <Play className="w-5 h-5 mr-2" />
            Commencer maintenant
          </button>
          <button className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors">
            <Video className="w-5 h-5 mr-2" />
            Voir la démo
          </button>
        </div>
      </div>
    </section>
  );
};
