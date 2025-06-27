
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SolutionsDropdown } from './SolutionsDropdown';
import { GSuiteLogo } from '@/components/ui/gsuite-logo';

export const LandingHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (to: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Fermer le menu mobile après navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={() => handleNavigation('/')} className="flex items-center space-x-3">
            <GSuiteLogo size={40} />
            <div>
              <h1 className="text-xl font-bold text-slate-900">G-Suite</h1>
              <p className="text-sm text-slate-600">Gestion d'entreprise digitale</p>
            </div>
          </Link>
          
          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/accueil" 
              onClick={() => handleNavigation('/accueil')}
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              Accueil
            </Link>
            <SolutionsDropdown />
            <Link 
              to="/about-us" 
              onClick={() => handleNavigation('/about-us')}
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              À Propos
            </Link>
            <Link 
              to="/contact" 
              onClick={() => handleNavigation('/contact')}
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>
          
          {/* Bouton Connexion Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/user-login" onClick={() => handleNavigation('/user-login')}>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white border-green-600">
                Connexion Entreprise
              </Button>
            </Link>
          </div>

          {/* Bouton Menu Mobile */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg z-40">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <Link 
                to="/accueil" 
                onClick={() => handleNavigation('/accueil')}
                className="block text-slate-600 hover:text-slate-900 transition-colors font-medium py-2"
              >
                Accueil
              </Link>
              <div className="py-2">
                <SolutionsDropdown />
              </div>
              <Link 
                to="/about-us" 
                onClick={() => handleNavigation('/about-us')}
                className="block text-slate-600 hover:text-slate-900 transition-colors font-medium py-2"
              >
                À Propos
              </Link>
              <Link 
                to="/contact" 
                onClick={() => handleNavigation('/contact')}
                className="block text-slate-600 hover:text-slate-900 transition-colors font-medium py-2"
              >
                Contact
              </Link>
              <div className="pt-4 border-t">
                <Link to="/user-login" onClick={() => handleNavigation('/user-login')}>
                  <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white border-green-600">
                    Connexion Entreprise
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
