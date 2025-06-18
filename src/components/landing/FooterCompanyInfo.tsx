
import React from 'react';
import { Building, Mail, Phone, MapPin } from 'lucide-react';
import { GrowHubLogo } from './GrowHubLogo';

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
          <h3 className="text-xl font-bold !text-white">G-Suite</h3>
          <p className="text-sm !text-slate-400">by Grow Hub Sarl</p>
        </div>
      </div>
      <p className="!text-slate-300 mb-6 leading-relaxed">
        G-Suite révolutionne la gestion d'entreprise en Afrique avec une suite complète 
        d'outils modernes et intuitifs. Développé par Grow Hub Sarl, votre partenaire en solutions 
        technologiques pour entreprises.
      </p>
      <div className="flex items-center space-y-0 gap-x-5">
        <div className="flex flex-col space-y-3">
          <button 
            onClick={onEmailClick}
            className="flex items-center space-x-3 !text-slate-300 hover:!text-green-400 transition-colors"
          >
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm !text-slate-300">support@g-suite.com</span>
          </button>
          <button 
            onClick={onPhoneClick}
            className="flex items-center space-x-3 !text-slate-300 hover:!text-green-400 transition-colors"
          >
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm !text-slate-300">+221 78 475 28 58</span>
          </button>
          <div className="flex items-center space-x-3 !text-slate-300">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm !text-slate-300">Dakar, Sénégal</span>
          </div>
        </div>
        {/* Logo GrowHub - agrandi à droite des contacts */}
        <div className="pl-6 flex items-center">
          <GrowHubLogo size={96} className="bg-white rounded shadow-lg p-2" />
        </div>
      </div>
    </div>
  );
};
