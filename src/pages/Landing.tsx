
import React from "react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PricingSection from "@/components/landing/PricingSection";
import AdvantagesSection from "@/components/landing/AdvantagesSection";
import TrustedCompaniesSection from "@/components/landing/TrustedCompaniesSection";
import PartnersSection from "@/components/landing/PartnersSection";
import SolutionsComparisonSection from "@/components/landing/SolutionsComparisonSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import LandingFooter from "@/components/landing/LandingFooter";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <TrustedCompaniesSection />
      <AdvantagesSection />
      <PricingSection />
      <PartnersSection />
      <SolutionsComparisonSection />
      <TestimonialsSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
};

export default Landing;
