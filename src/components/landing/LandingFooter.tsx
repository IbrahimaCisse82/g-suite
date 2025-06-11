
import React from 'react';
import { Building, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingFooter = () => {
  const navigate = useNavigate();

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:contact@growhubsenegal.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+221770000000';
  };

  const handleSocialClick = (platform: string) => {
    const urls = {
      facebook: 'https://facebook.com/growhubsenegal',
      twitter: 'https://twitter.com/growhubsenegal',
      linkedin: 'https://linkedin.com/company/growhubsenegal'
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDocumentationClick = () => {
    navigate('/training');
  };

  const handleFormationClick = () => {
    navigate('/training');
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6 cursor-pointer" onClick={scrollToTop}>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">G-Suite</h3>
                <p className="text-sm text-slate-400">by GrowHub Sénégal</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              G-Suite révolutionne la gestion d'entreprise en Afrique avec une suite complète 
              d'outils modernes et intuitifs. Développé par GrowHub Sénégal, leader en solutions 
              technologiques pour entreprises.
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={handleEmailClick}
                className="flex items-center space-x-3 text-slate-300 hover:text-green-400 transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">contact@growhubsenegal.com</span>
              </button>
              <button 
                onClick={handlePhoneClick}
                className="flex items-center space-x-3 text-slate-300 hover:text-green-400 transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">+221 77 XXX XX XX</span>
              </button>
              <div className="flex items-center space-x-3 text-slate-300">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">Dakar, Sénégal</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-6 text-white">Produit</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleNavClick('features')} 
                  className="text-slate-300 hover:text-green-400 transition-colors"
                >
                  Fonctionnalités
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('pricing')} 
                  className="text-slate-300 hover:text-green-400 transition-colors"
                >
                  Tarifs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => alert('Page Sécurité en construction')} 
                  className="text-slate-300 hover:text-green-400 transition-colors"
                >
                  Sécurité
                </button>
              </li>
              <li>
                <button 
                  onClick={() => alert('Page Intégrations en construction')} 
                  className="text-slate-300 hover:text-green-400 transition-colors"
                >
                  Intégrations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => alert('Application mobile bientôt disponible')} 
                  className="text-slate-300 hover:text-green-400 transition-colors"
                >
                  Mobile
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-6 text-white">Support</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => alert('Centre d\'aide en construction')} 
                  className="text-slate-300 hover:text-green-400 transition-colors"
                >
                  Centre d'aide
                </button>
              </li>
              <li>
                <button 
                  onClick={handleDocumentationClick} 
                  className="text-slate-300 hover:text-green-400 transition-colors"
                >
                  Documentation
                </button>
              </li>
              <li>
                <button 
                  onClick={handleFormationClick} 
                  className="text-slate-300 hover:text-green-400 transition-colors"
                >
                  Formation
                </button>
              </li>
              <li>
                <button 
                  onClick={handleEmailClick} 
                  className="text-slate-300 hover:text-green-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © 2024 G-Suite by GrowHub Sénégal. Tous droits réservés.
            </div>
            
            {/* Social links */}
            <div className="flex space-x-4">
              <button 
                onClick={() => handleSocialClick('facebook')} 
                className="text-slate-400 hover:text-green-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('twitter')} 
                className="text-slate-400 hover:text-green-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('linkedin')} 
                className="text-slate-400 hover:text-green-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start space-x-6 mt-4 text-sm text-slate-400">
            <button 
              onClick={() => alert('Mentions légales en construction')} 
              className="hover:text-green-400 transition-colors"
            >
              Mentions légales
            </button>
            <button 
              onClick={() => alert('Politique de confidentialité en construction')} 
              className="hover:text-green-400 transition-colors"
            >
              Politique de confidentialité
            </button>
            <button 
              onClick={() => alert('CGU en construction')} 
              className="hover:text-green-400 transition-colors"
            >
              CGU
            </button>
            <button 
              onClick={() => alert('Politique de cookies en construction')} 
              className="hover:text-green-400 transition-colors"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
