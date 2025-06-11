
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calculator, 
  Users, 
  FileText, 
  ShoppingCart, 
  CreditCard, 
  PieChart,
  Package,
  Smartphone,
  BarChart3
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Calculator,
      title: "Comptabilité générale",
      description: "Gestion complète de votre comptabilité avec saisie automatisée et rapprochement bancaire",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: FileText,
      title: "Facturation intelligente",
      description: "Création et envoi automatique de factures personnalisées avec suivi des paiements",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Users,
      title: "CRM intégré",
      description: "Gestion centralisée de vos clients et prospects avec historique complet",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Package,
      title: "Gestion de stock",
      description: "Suivi en temps réel de vos stocks avec alertes automatiques et inventaire",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: ShoppingCart,
      title: "Achats et commandes",
      description: "Optimisez vos achats et gérez vos fournisseurs efficacement",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: CreditCard,
      title: "Trésorerie",
      description: "Pilotage de votre trésorerie avec prévisions et alertes de liquidité",
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      icon: BarChart3,
      title: "Analyses avancées",
      description: "Tableaux de bord dynamiques et rapports financiers détaillés",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: Smartphone,
      title: "Mobile-first",
      description: "Application mobile native pour gérer votre entreprise en déplacement",
      color: "bg-pink-100 text-pink-600"
    },
    {
      icon: PieChart,
      title: "Business Intelligence",
      description: "Intelligence artificielle pour optimiser vos décisions business",
      color: "bg-teal-100 text-teal-600"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            🚀 Fonctionnalités complètes
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Tout ce dont votre entreprise a besoin
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une suite d'outils puissants et intégrés pour digitaliser et optimiser 
            tous les aspects de votre gestion d'entreprise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl text-gray-900 group-hover:text-green-600 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <Link to="/register">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
              Découvrir toutes les fonctionnalités
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
