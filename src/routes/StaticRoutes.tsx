
import React from 'react';
import { Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Landing from '@/pages/Landing';
import AboutUs from '@/pages/AboutUs';
import Contact from '@/pages/Contact';
import Formation from '@/pages/Formation';
import QuoteRequest from '@/pages/QuoteRequest';
import Security from '@/pages/Security';
import Integrations from '@/pages/Integrations';
import Mobile from '@/pages/Mobile';
import HelpCenter from '@/pages/HelpCenter';
import ProductDocumentation from '@/pages/ProductDocumentation';
import LegalNotices from '@/pages/LegalNotices';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import CookiesPolicy from '@/pages/CookiesPolicy';

export const StaticRoutes = () => (
  <>
    <Route path="/" element={<Index />} />
    <Route path="/accueil" element={<Landing />} />
    <Route path="/landing" element={<Landing />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/formation" element={<Formation />} />
    <Route path="/quote-request" element={<QuoteRequest />} />
    <Route path="/security" element={<Security />} />
    <Route path="/integrations" element={<Integrations />} />
    <Route path="/mobile" element={<Mobile />} />
    <Route path="/help-center" element={<HelpCenter />} />
    <Route path="/product-documentation" element={<ProductDocumentation />} />
    <Route path="/legal-notices" element={<LegalNotices />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/cookies-policy" element={<CookiesPolicy />} />
  </>
);
