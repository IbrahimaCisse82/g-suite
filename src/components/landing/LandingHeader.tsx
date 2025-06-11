
import React from 'react';
import { Button } from '@/components/ui/button';
import { Building, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">G-Suite</h1>
              <p className="text-xs text-gray-600">by GrowHub Sénégal</p>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">
              Fonctionnalités
            </a>
            <a href="#advantages" className="text-gray-600 hover:text-green-600 transition-colors">
              Avantages
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-green-600 transition-colors">
              Tarifs
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-green-600 transition-colors">
              Témoignages
            </a>
          </nav>

          {/* CTA Buttons Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-gray-600 hover:text-green-600">
                Se connecter
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Essai gratuit
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">
                Fonctionnalités
              </a>
              <a href="#advantages" className="text-gray-600 hover:text-green-600 transition-colors">
                Avantages
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-green-600 transition-colors">
                Tarifs
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-green-600 transition-colors">
                Témoignages
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Link to="/dashboard">
                  <Button variant="ghost" className="w-full justify-start">
                    Se connecter
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Essai gratuit
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

export default LandingHeader;
