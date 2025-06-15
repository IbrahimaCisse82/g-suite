
import React from 'react';
import { FooterCompanyInfo } from './FooterCompanyInfo';
import { FooterNavigation } from './FooterNavigation';
import { FooterBottomSection } from './FooterBottomSection';

const LandingFooter = () => {
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:support@g-suite.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+221784752858';
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

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <FooterCompanyInfo 
            onLogoClick={scrollToTop}
            onEmailClick={handleEmailClick}
            onPhoneClick={handlePhoneClick}
          />
          <FooterNavigation 
            onNavClick={handleNavClick}
            onNavigation={handleNavigation}
          />
        </div>

        <FooterBottomSection 
          onSocialClick={handleSocialClick}
          onNavigation={handleNavigation}
        />
      </div>
    </footer>
  );
};

export default LandingFooter;
