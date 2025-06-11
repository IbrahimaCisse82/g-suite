
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calculator, 
  Users, 
  FileText, 
  ShoppingCart, 
  CreditCard, 
  PieChart
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Calculator,
      title: "Comptabilité générale",
      description: "Gestion complète de votre comptabilité avec saisie automatisée et rapprochement bancaire"
    },
    {
      icon: Users,
      title: "Clients & Fournisseurs",
      description: "Gestion centralisée de vos contacts avec historique des transactions"
    },
    {
      icon: FileText,
      title: "Facturation",
      description: "Création et envoi automatique de factures personnalisées"
    },
    {
      icon: ShoppingCart,
      title: "Gestion des achats",
      description: "Suivi des commandes et gestion des stocks en temps réel"
    },
    {
      icon: CreditCard,
      title: "Trésorerie",
      description: "Pilotage de votre trésorerie avec prévisions et alertes"
    },
    {
      icon: PieChart,
      title: "Rapports avancés",
      description: "Tableaux de bord et analyses financières détaillées"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Toutes les fonctionnalités dont vous avez besoin
          </h2>
          <p className="text-xl text-gray-600">
            Une suite complète d'outils pour gérer votre entreprise efficacement
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
