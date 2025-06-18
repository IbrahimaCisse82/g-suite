
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterNavigationProps {
  onNavClick: (sectionId: string) => void;
  onNavigation: (path: string) => void;
}

export const FooterNavigation = ({ onNavClick, onNavigation }: FooterNavigationProps) => {
  return (
    <>
      {/* Product links */}
      <div>
        <h4 className="font-semibold mb-6 !text-white">Produit</h4>
        <ul className="space-y-3">
          <li>
            <button 
              onClick={() => onNavClick('features')} 
              className="!text-slate-300 hover:!text-green-400 transition-colors"
            >
              Fonctionnalités
            </button>
          </li>
          <li>
            <button 
              onClick={() => onNavClick('pricing')} 
              className="!text-slate-300 hover:!text-green-400 transition-colors"
            >
              Tarifs
            </button>
          </li>
          <li>
            <Link 
              to="/security" 
              onClick={() => onNavigation('/security')}
              className="!text-slate-300 hover:!text-green-400 transition-colors"
            >
              Sécurité
            </Link>
          </li>
          <li>
            <Link 
              to="/integrations" 
              onClick={() => onNavigation('/integrations')}
              className="!text-slate-300 hover:!text-green-400 transition-colors"
            >
              Intégrations
            </Link>
          </li>
          <li>
            <Link 
              to="/mobile" 
              onClick={() => onNavigation('/mobile')}
              className="!text-slate-300 hover:!text-green-400 transition-colors"
            >
              Mobile
            </Link>
          </li>
        </ul>
      </div>

      {/* Support links */}
      <div>
        <h4 className="font-semibold mb-6 !text-white">Support</h4>
        <ul className="space-y-3">
          <li>
            <Link 
              to="/help-center" 
              onClick={() => onNavigation('/help-center')}
              className="!text-slate-300 hover:!text-green-400 transition-colors"
            >
              Centre d'aide
            </Link>
          </li>
          <li>
            <Link 
              to="/product-documentation" 
              onClick={() => onNavigation('/product-documentation')}
              className="!text-slate-300 hover:!text-green-400 transition-colors"
            >
              Documentation
            </Link>
          </li>
          <li>
            <Link 
              to="/formation" 
              onClick={() => onNavigation('/formation')}
              className="!text-slate-300 hover:!text-green-400 transition-colors"
            >
              Formation
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              onClick={() => onNavigation('/contact')}
              className="!text-slate-300 hover:!text-green-400 transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
