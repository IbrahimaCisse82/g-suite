
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, Receipt, Handshake } from "lucide-react";

const PLANS = [
  {
    key: "entreprise",
    name: "G-Suite Entreprise",
    desc: "La suite de gestion tout-en-un : comptabilité, facturation, CRM et stock pour votre organisation.",
    icon: Briefcase,
    color: "from-purple-600 to-indigo-600",
    points: [
      "Gestion intégrée de l’entreprise",
      "Automatisation des processus",
      "Visualisation en temps réel",
      "Support premium & personnalisation"
    ]
  },
  {
    key: "comptable",
    name: "G-Suite Comptabilité",
    desc: "Simplifiez la tenue de vos comptes avec un cockpit financier et une productivité boostée.",
    icon: Receipt,
    color: "from-blue-600 to-purple-600",
    points: [
      "Gestion comptable intuitive",
      "Production des bilans & rapports",
      "Connexion experts-comptables",
      "Processus compliance automatisés"
    ]
  },
  {
    key: "commerciale",
    name: "G-Suite Commerciale",
    desc: "Boostez vos ventes et la relation client avec une solution commerciale entièrement connectée.",
    icon: Handshake,
    color: "from-green-600 to-emerald-600",
    points: [
      "CRM performant & datas clients",
      "Facturation et suivi simplifié",
      "Gestion dynamique des stocks",
      "Statistiques commerciales avancées"
    ]
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            🔑 Découvrez la puissance de G-Suite adaptée à votre métier !
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Nos trois solutions clés
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Optez pour la solution la plus pertinente selon la nature et la structure de votre entreprise.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PLANS.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card key={plan.key} className="relative border shadow-lg rounded-xl">
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${plan.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <p className="text-gray-600 mt-2">{plan.desc}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-4">
                    {plan.points.map((pt, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 text-green-600 font-bold">✓</span>
                        <span className="text-gray-700">{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/company-registration?solution=${plan.key}`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Demander une clé licence
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
