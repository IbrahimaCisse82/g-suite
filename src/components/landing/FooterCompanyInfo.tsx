
import React from 'react';
import { Building, Mail, Phone, MapPin } from 'lucide-react';

interface FooterCompanyInfoProps {
  onLogoClick: () => void;
  onEmailClick: () => void;
  onPhoneClick: () => void;
}

export const FooterCompanyInfo = ({ 
  onLogoClick, 
  onEmailClick, 
  onPhoneClick 
}: FooterCompanyInfoProps) => {
  return (
    <div className="md:col-span-2">
      <div className="flex items-center space-x-3 mb-6 cursor-pointer" onClick={onLogoClick}>
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
          onClick={onEmailClick}
          className="flex items-center space-x-3 text-slate-300 hover:text-green-400 transition-colors"
        >
          <Mail className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">support@g-suite.com</span>
        </button>
        <button 
          onClick={onPhoneClick}
          className="flex items-center space-x-3 text-slate-300 hover:text-green-400 transition-colors"
        >
          <Phone className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">+221 78 475 28 58</span>
        </button>
        <div className="flex items-center space-x-3 text-slate-300">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">Dakar, Sénégal</span>
        </div>
      </div>
    </div>
  );
};
