
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const plans = [
    {
      name: "Essai Gratuit",
      price: "0 FCFA",
      period: "5 jours",
      description: "Découvrez toutes les fonctionnalités",
      features: [
        "Accès complet à toutes les fonctionnalités",
        "Facturation illimitée",
        "Gestion de stock",
        "Rapports financiers",
        "Support par email",
        "Formation en ligne"
      ],
      cta: "Commencer l'essai gratuit",
      popular: false,
      color: "border-gray-200"
    },
    {
      name: "Professional",
      price: "25 000 FCFA",
      period: "mois",
      description: "Parfait pour les PME en croissance",
      features: [
        "Toutes les fonctionnalités de base",
        "Utilisateurs illimités",
        "Sauvegarde automatique",
        "Support prioritaire",
        "Formation personnalisée",
        "Intégrations avancées",
        "Rapports personnalisés"
      ],
      cta: "Choisir Professional",
      popular: true,
      color: "border-green-500"
    },
    {
      name: "Enterprise",
      price: "Sur mesure",
      period: "",
      description: "Solution adaptée aux grandes entreprises",
      features: [
        "Toutes les fonctionnalités Professional",
        "Déploiement sur site possible",
        "API personnalisée",
        "Formation sur site",
        "Support dédié 24/7",
        "Intégration ERP existant",
        "Audit de sécurité"
      ],
      cta: "Nous contacter",
      popular: false,
      color: "border-purple-500"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            💰 Tarifs transparents
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Choisissez votre formule
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Commencez avec un essai gratuit de 5 jours, puis choisissez le plan qui correspond à vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`${plan.color} relative ${plan.popular ? 'ring-2 ring-green-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Recommandé
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-500">/{plan.period}</span>}
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/company-registration" className="block">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-green-500 hover:bg-green-600' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Toutes nos formules incluent la TVA. Aucun engagement, résiliation possible à tout moment.
          </p>
          <div className="inline-flex items-center space-x-8 text-sm text-gray-500">
            <span className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              Aucun frais d'installation
            </span>
            <span className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              Mises à jour gratuites
            </span>
            <span className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              Support technique inclus
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
