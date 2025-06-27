
import React from 'react';
import { Route } from 'react-router-dom';
import TPEAssistant from '@/pages/TPEAssistant';
import TPEGuides from '@/pages/TPEGuides';
import TPEOnboarding from '@/pages/TPEOnboarding';
import CompanyRegistration from '@/pages/CompanyRegistration';

export const TPERoutes = () => (
  <>
    <Route path="/company-registration" element={<CompanyRegistration />} />
    <Route path="/tpe/onboarding" element={<TPEOnboarding />} />
    <Route path="/tpe-assistant" element={<TPEAssistant />} />
    <Route path="/tpe-guides" element={<TPEGuides />} />
  </>
);
