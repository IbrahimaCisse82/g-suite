import React from "react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import AdvantagesSection from "@/components/landing/AdvantagesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import LandingFooter from "@/components/landing/LandingFooter";
import { Link } from "react-router-dom";
import { Briefcase, Receipt, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import GsuiteLogo from "/gsuite-logo.png";

const OFFERS = [
  {
    key: "entreprise",
    name: "G-Suite Entreprise",
    icon: Briefcase,
    color: "from-purple-600 to-indigo-600",
    desc: "Découvrez la plateforme qui centralise gestion, comptabilité et opérations. Pensée pour la performance globale.",
    features: [
      "Automatisation de la gestion d’entreprise",
      "Comptabilité & facturation centralisées",
      "Gestion commerciale et des stocks",
      "Reporting étendu et support prioritaire"
    ]
  },
  {
    key: "comptable",
    name: "G-Suite Comptabilité",
    icon: Receipt,
    color: "from-blue-600 to-purple-600",
    desc: "Fluidifiez la gestion financière et fiscale de votre entreprise. Un cockpit digital pour les professionnels de la compta.",
    features: [
      "Tableau de bord comptable",
      "Bilans et exports simplifiés",
      "Suivi règlementaire automatisé",
      "Connexion expert-comptable"
    ]
  },
  {
    key: "commerciale",
    name: "G-Suite Commerciale",
    icon: Handshake,
    color: "from-green-600 to-emerald-600",
    desc: "Accélérez vos ventes et gérez votre base clients efficacement. Un CRM moderne, axé sur l’action.",
    features: [
      "CRM et suivi client",
      "Facturation sans friction",
      "Gestion des offres et stocks",
      "Reporting des ventes"
    ]
  }
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      {/* Hero section “Découvrez nos solutions” */}
      <section className="pt-20 pb-10 bg-gradient-to-br from-green-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            G-Suite : Choisissez la solution adaptée à votre entreprise
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            G-Suite propose trois solutions pour accompagner les entreprises africaines dans leur transformation digitale, de la comptabilité à la gestion commerciale.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
            {OFFERS.map((offer) => {
              const Icon = offer.icon;
              return (
                <div key={offer.key} className="relative bg-white rounded-2xl shadow-xl px-8 pt-10 pb-8 border">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto bg-gradient-to-br ${offer.color}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{offer.name}</h2>
                  <div className="mb-3 text-gray-700">{offer.desc}</div>
                  <ul className="text-left space-y-1 mb-6">
                    {offer.features.map((f, i) => (
                      <li key={i} className="flex items-center text-gray-600 text-sm">
                        <span className="mr-2 text-green-600 font-bold">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/company-registration?solution=${offer.key}`}
                    className="block"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                      Demander une clé licence
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <AdvantagesSection />
      <TestimonialsSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
};

export default Landing;
