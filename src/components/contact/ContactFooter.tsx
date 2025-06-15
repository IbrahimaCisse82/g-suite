
import React from 'react';
import { GSuiteLogo } from '@/components/ui/gsuite-logo';
import { Link } from 'react-router-dom';

export const ContactFooter = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t-4 border-emerald-600">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <GSuiteLogo size={32} />
            <div>
              <h3 className="text-lg font-bold text-white">G-Suite</h3>
              <p className="text-xs text-slate-300">by GrowHub Sénégal</p>
            </div>
          </div>
          <p className="text-slate-300 mb-6 font-medium">
            Votre partenaire de confiance pour la transformation digitale
          </p>
          <div className="flex justify-center space-x-8 text-sm font-semibold">
            <Link to="/" className="text-slate-300 hover:text-emerald-400 transition-colors">Accueil</Link>
            <Link to="/about-us" className="text-slate-300 hover:text-emerald-400 transition-colors">À Propos</Link>
            <span className="text-emerald-400">Contact</span>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700 text-xs text-slate-400 font-medium">
            © 2024 G-Suite by GrowHub Sénégal. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};
