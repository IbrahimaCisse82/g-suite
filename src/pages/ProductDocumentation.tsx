
import React from 'react';
import { Building, TrendingUp, Users, Shield, Zap, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ProductDocumentation = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: TrendingUp,
      title: "Croissance Accélérée",
      description: "Augmentez votre chiffre d'affaires de 35% en moyenne grâce à une gestion optimisée et des processus automatisés.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Clock,
      title: "Gain de Temps",
      description: "Économisez jusqu'à 15h par semaine sur les tâches administratives grâce à l'automatisation intelligente.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Shield,
      title: "Sécurité Garantie",
      description: "Vos données sont protégées avec un chiffrement de niveau bancaire et des sauvegardes automatiques.",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Users,
      title: "Collaboration Simplifiée",
      description: "Centralisez les informations et facilitez le travail en équipe avec des outils collaboratifs intuitifs.",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const features = [
    "Gestion complète des contacts clients et fournisseurs",
    "Facturation automatisée avec modèles personnalisables",
    "Suivi des stocks en temps réel",
    "Tableau de bord analytique avec KPI essentiels",
    "Gestion de trésorerie et prévisions financières",
    "Rapports détaillés et exports comptables",
    "Interface mobile responsive",
    "Support technique dédié en français"
  ];

  const targetBusinesses = [
    {
      type: "TPE (Très Petites Entreprises)",
      description: "1 à 10 employés",
      examples: ["Artisans", "Commerçants", "Consultants", "Auto-entrepreneurs"],
      advantages: [
        "Interface simple et intuitive",
        "Coût abordable adapté aux petits budgets",
        "Mise en place rapide en moins d'une journée",
        "Pas besoin de formation technique"
      ]
    },
    {
      type: "PME (Petites et Moyennes Entreprises)",
      description: "10 à 250 employés",
      examples: ["Entreprises de services", "Distributeurs", "Fabricants", "Agences"],
      advantages: [
        "Gestion multi-utilisateurs avec droits d'accès",
        "Modules avancés pour la croissance",
        "Intégrations avec outils existants",
        "Reporting avancé et analytics"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold">G-Suite</h1>
            </div>
            <p className="text-xl mb-8 text-green-100">
              La solution de gestion d'entreprise conçue spécialement pour les TPE et PME africaines
            </p>
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-green-50"
              onClick={() => navigate('/company-registration')}
            >
              Commencer gratuitement
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Avantages principaux */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pourquoi G-Suite transforme votre entreprise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les bénéfices concrets que G-Suite apporte aux entreprises comme la vôtre
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg ${benefit.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Fonctionnalités clés */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Fonctionnalités essentielles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour gérer votre entreprise efficacement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-accent/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Public cible */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Conçu pour votre entreprise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              G-Suite s'adapte parfaitement aux besoins spécifiques des TPE et PME
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {targetBusinesses.map((business, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">{business.type}</CardTitle>
                  <p className="text-muted-foreground">{business.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Exemples d'entreprises :</h4>
                    <div className="flex flex-wrap gap-2">
                      {business.examples.map((example, idx) => (
                        <span key={idx} className="bg-accent px-3 py-1 rounded-full text-sm">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Avantages spécifiques :</h4>
                    <ul className="space-y-2">
                      {business.advantages.map((advantage, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à transformer votre entreprise ?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines d'entreprises qui ont déjà choisi G-Suite pour optimiser leur gestion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/company-registration')}
            >
              <Zap className="w-5 h-5 mr-2" />
              Essai gratuit 30 jours
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/quote-request')}
            >
              Demander un devis
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDocumentation;
