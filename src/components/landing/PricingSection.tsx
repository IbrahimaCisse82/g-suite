
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building, Calculator, Users } from "lucide-react";

const PLANS = [
  {
    key: "entreprise",
    name: "Gestion d'Entreprise",
    desc: "La solution complète pour la gestion comptable et commerciale.",
    icon: Building,
    color: "from-purple-600 to-indigo-600",
    points: [
      "Comptabilité et facturation intégrées",
      "CRM : contacts, fournisseurs, clients",
      "Gestion du stock avancée",
      "Trésorerie & rapports dynamiques"
    ]
  },
  {
    key: "comptable",
    name: "Comptabilité",
    desc: "Automatisez votre comptabilité en toute tranquillité.",
    icon: Calculator,
    color: "from-blue-600 to-purple-600",
    points: [
      "Gestion des écritures simplifiée",
      "Rapports et bilans automatiques",
      "Suivi trésorerie",
      "Export expert-comptable"
    ]
  },
  {
    key: "commerciale",
    name: "Commerciale",
    desc: "Optimisez vos ventes et votre gestion commerciale.",
    icon: Users,
    color: "from-green-600 to-emerald-600",
    points: [
      "Clients & fournisseurs",
      "Facturation automatisée",
      "Gestion de stock",
      "Statistiques commerciales"
    ]
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            🔑 Offres G-Suite : Demandez votre clé licence !
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Nos trois solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sélectionnez l'offre la plus adaptée à votre besoin.
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
