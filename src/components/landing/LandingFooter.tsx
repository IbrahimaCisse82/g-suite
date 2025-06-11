
import React from 'react';
import { Building, Mail } from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Building className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">G-Compta</h3>
                <p className="text-sm text-gray-400">Gestion d'entreprise</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              La solution comptable moderne pour les entreprises africaines.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <Mail className="w-4 h-4" />
              <span className="text-sm">facturation@growhubsenegal.com</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Fonctionnalités</li>
              <li>Tarifs</li>
              <li>Sécurité</li>
              <li>Intégrations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Centre d'aide</li>
              <li>Contact</li>
              <li>Formation</li>
              <li>Documentation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-gray-400">
              <li>À propos</li>
              <li>Blog</li>
              <li>Carrières</li>
              <li>Partenaires</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 G-Compta by GrowHub Sénégal. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
