import React from 'react';
import { Link } from 'react-router-dom';
import { Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SolutionsDropdown } from './SolutionsDropdown';
import GsuiteLogo from "/gsuite-logo.png";
import { Briefcase, Handshake, Receipt } from 'lucide-react';

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
            <img src={GsuiteLogo} alt="G-Suite Logo" className="w-10 h-10 object-contain rounded-md shadow" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">G-Suite</h1>
              <p className="text-sm text-gray-600">Gestion d'entreprise digitale</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Accueil
            </Link>
            <SolutionsDropdown />
            <Link 
              to="/company-registration" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Test Gratuit
            </Link>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/user-login">
              <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900">
                Connexion Entreprise
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
