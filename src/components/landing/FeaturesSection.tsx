
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
  BarChart3,
  Zap,
  Globe,
  Shield
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Calculator,
      title: "Comptabilité automatisée",
      description: "Gestion complète de votre comptabilité avec saisie automatisée, rapprochement bancaire et états financiers",
      color: "bg-green-100 text-green-600",
      accent: "border-green-200"
    },
    {
      icon: FileText,
      title: "Facturation intelligente",
      description: "Création et envoi automatique de factures personnalisées avec suivi des paiements en temps réel",
      color: "bg-blue-100 text-blue-600",
      accent: "border-blue-200"
    },
    {
      icon: Users,
      title: "CRM intégré",
      description: "Gestion centralisée de vos clients et prospects avec historique complet et segmentation avancée",
      color: "bg-purple-100 text-purple-600",
      accent: "border-purple-200"
    },
    {
      icon: Package,
      title: "Gestion de stock intelligente",
      description: "Suivi en temps réel de vos stocks avec alertes automatiques, codes-barres et inventaire simplifié",
      color: "bg-orange-100 text-orange-600",
      accent: "border-orange-200"
    },
    {
      icon: ShoppingCart,
      title: "Achats optimisés",
      description: "Optimisez vos achats et gérez vos fournisseurs avec des outils de négociation et de suivi",
      color: "bg-red-100 text-red-600",
      accent: "border-red-200"
    },
    {
      icon: CreditCard,
      title: "Trésorerie prédictive",
      description: "Pilotage de votre trésorerie avec prévisions IA et alertes de liquidité pour anticiper",
      color: "bg-indigo-100 text-indigo-600",
      accent: "border-indigo-200"
    },
    {
      icon: BarChart3,
      title: "Analytics avancées",
      description: "Tableaux de bord dynamiques et rapports financiers détaillés avec intelligence artificielle",
      color: "bg-yellow-100 text-yellow-600",
      accent: "border-yellow-200"
    },
    {
      icon: Smartphone,
      title: "Mobile-first",
      description: "Application mobile native pour gérer votre entreprise en déplacement avec synchronisation totale",
      color: "bg-pink-100 text-pink-600",
      accent: "border-pink-200"
    },
    {
      icon: PieChart,
      title: "Business Intelligence",
      description: "Intelligence artificielle pour optimiser vos décisions business et prédire les tendances",
      color: "bg-teal-100 text-teal-600",
      accent: "border-teal-200"
    },
    {
      icon: Globe,
      title: "Multi-devises avancé",
      description: "Gestion native des devises africaines et internationales avec taux de change automatiques",
      color: "bg-emerald-100 text-emerald-600",
      accent: "border-emerald-200"
    },
    {
      icon: Shield,
      title: "Sécurité bancaire",
      description: "Chiffrement de niveau bancaire, authentification 2FA et sauvegardes automatiques sécurisées",
      color: "bg-slate-100 text-slate-600",
      accent: "border-slate-200"
    },
    {
      icon: Zap,
      title: "Performance optimale",
      description: "Interface ultra-rapide optimisée pour les connexions africaines avec mode hors-ligne",
      color: "bg-violet-100 text-violet-600",
      accent: "border-violet-200"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-sm font-semibold mb-8">
            🚀 Fonctionnalités révolutionnaires
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8">
            Tout ce dont votre entreprise a besoin
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
              en un seul endroit
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Une suite d'outils puissants et intégrés pour digitaliser et optimiser 
            tous les aspects de votre gestion d'entreprise africaine
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group bg-white ${feature.accent} border-2`}>
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <CardTitle className="text-xl text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA at the bottom */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Découvrez toutes ces fonctionnalités gratuitement
            </h3>
            <p className="text-slate-600 mb-6">
              Aucune carte de crédit requise • Configuration en 5 minutes • Support inclus
            </p>
            <a href="/dashboard" className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105">
              Essayer maintenant
              <Zap className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
