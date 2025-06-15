
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      <ContactHero />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Contact;
