
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const ComparisonCTA = () => {
  return (
    <div className="text-center mt-12">
      <p className="text-slate-600 mb-6">
        Besoin d'aide pour choisir la solution adaptée à votre entreprise ?
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/contact">
          <Button variant="outline" size="lg">
            Contactez nos experts
          </Button>
        </Link>
        <Link to="/company-registration">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Commencer mon essai gratuit
          </Button>
        </Link>
      </div>
    </div>
  );
};
