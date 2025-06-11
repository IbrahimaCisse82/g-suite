
import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const LandingHeader = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">G-Suite</h1>
              <p className="text-sm text-gray-600">Gestion d'entreprise</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Fonctionnalités
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Tarifs
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/admin-login">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
            <Link to="/user-login">
              <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900">
                Application
              </Button>
            </Link>
            <Link to="/company-registration">
              <Button>Inscription Entreprise</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
