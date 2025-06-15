
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

interface FooterBottomSectionProps {
  onSocialClick: (platform: string) => void;
  onNavigation: (path: string) => void;
}

export const FooterBottomSection = ({ onSocialClick, onNavigation }: FooterBottomSectionProps) => {
  return (
    <div className="border-t border-slate-700 mt-12 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-slate-400 text-sm">
          Développé par GrowHub Sénégal, cabinet de conseils aux entreprises.
        </div>
        
        {/* Social links */}
        <div className="flex space-x-4">
          <button 
            onClick={() => onSocialClick('facebook')} 
            className="text-slate-400 hover:text-green-400 transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onSocialClick('twitter')} 
            className="text-slate-400 hover:text-green-400 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onSocialClick('linkedin')} 
            className="text-slate-400 hover:text-green-400 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center md:justify-start space-x-6 mt-4 text-sm text-slate-400">
        <Link 
          to="/legal-notices" 
          onClick={() => onNavigation('/legal-notices')}
          className="hover:text-green-400 transition-colors"
        >
          Mentions légales
        </Link>
        <Link 
          to="/privacy-policy" 
          onClick={() => onNavigation('/privacy-policy')}
          className="hover:text-green-400 transition-colors"
        >
          Politique de confidentialité
        </Link>
        <Link 
          to="/terms-of-service" 
          onClick={() => onNavigation('/terms-of-service')}
          className="hover:text-green-400 transition-colors"
        >
          CGU
        </Link>
        <Link 
          to="/cookies-policy" 
          onClick={() => onNavigation('/cookies-policy')}
          className="hover:text-green-400 transition-colors"
        >
          Cookies
        </Link>
        <Link 
          to="/admin-login" 
          onClick={() => onNavigation('/admin-login')}
          className="hover:text-green-400 transition-colors text-xs opacity-50 hover:opacity-100"
        >
          Admin
        </Link>
      </div>
    </div>
  );
};
