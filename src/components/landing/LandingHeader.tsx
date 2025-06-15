
import React from 'react';
import { Link } from 'react-router-dom';
import { Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SolutionsDropdown } from './SolutionsDropdown';
import { GSuiteLogo } from '@/components/ui/gsuite-logo';

export const LandingHeader = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <GSuiteLogo size={40} />
            <div>
              <h1 className="text-xl font-bold text-slate-900">G-Suite</h1>
              <p className="text-sm text-slate-600">Gestion d'entreprise digitale</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              Accueil
            </Link>
            <SolutionsDropdown />
            <Link 
              to="/about-us" 
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              À Propos
            </Link>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              Contact
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/user-login">
              <Button variant="outline" size="sm" className="text-slate-600 hover:text-slate-900 border-slate-300">
                Connexion Entreprise
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
