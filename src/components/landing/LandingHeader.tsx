
import React from 'react';
import { Button } from '@/components/ui/button';
import { Building, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">G-Suite</h1>
              <p className="text-xs text-slate-400">by GrowHub Sénégal</p>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-green-400 transition-colors">
              Fonctionnalités
            </a>
            <a href="#advantages" className="text-slate-300 hover:text-green-400 transition-colors">
              Avantages
            </a>
            <a href="#pricing" className="text-slate-300 hover:text-green-400 transition-colors">
              Tarifs
            </a>
            <a href="#testimonials" className="text-slate-300 hover:text-green-400 transition-colors">
              Témoignages
            </a>
          </nav>

          {/* CTA Buttons Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-slate-300 hover:text-green-400 hover:bg-slate-800">
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
              <X className="w-6 h-6 text-slate-300" />
            ) : (
              <Menu className="w-6 h-6 text-slate-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-slate-300 hover:text-green-400 transition-colors">
                Fonctionnalités
              </a>
              <a href="#advantages" className="text-slate-300 hover:text-green-400 transition-colors">
                Avantages
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-green-400 transition-colors">
                Tarifs
              </a>
              <a href="#testimonials" className="text-slate-300 hover:text-green-400 transition-colors">
                Témoignages
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Link to="/dashboard">
                  <Button variant="ghost" className="w-full justify-start text-slate-300 hover:bg-slate-800">
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
