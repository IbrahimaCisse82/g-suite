
import React from 'react';
import { Building, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">G-Suite</h3>
                <p className="text-sm text-gray-400">by GrowHub Sénégal</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              G-Suite révolutionne la gestion d'entreprise en Afrique avec une suite complète 
              d'outils modernes et intuitifs. Développé par GrowHub Sénégal, leader en solutions 
              technologiques pour entreprises.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">contact@growhubsenegal.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">+221 77 XXX XX XX</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">Dakar, Sénégal</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-6 text-white">Produit</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-green-400 transition-colors">Fonctionnalités</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-green-400 transition-colors">Tarifs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Sécurité</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Intégrations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Mobile</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-6 text-white">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Formation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 G-Suite by GrowHub Sénégal. Tous droits réservés.
            </div>
            
            {/* Social links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start space-x-6 mt-4 text-sm text-gray-400">
            <a href="#" className="hover:text-green-400 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-green-400 transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-green-400 transition-colors">CGU</a>
            <a href="#" className="hover:text-green-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
