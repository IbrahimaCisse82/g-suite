
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { FormationHero } from '@/components/formation/FormationHero';
import { FormationCourses } from '@/components/formation/FormationCourses';
import { FormationMethods } from '@/components/formation/FormationMethods';
import { FormationCTA } from '@/components/formation/FormationCTA';

const Formation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      <FormationHero />
      <FormationCourses />
      <FormationMethods />
      <FormationCTA />
      <LandingFooter />
    </div>
  );
};

export default Formation;
