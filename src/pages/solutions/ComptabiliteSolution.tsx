
import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { Button } from '@/components/ui/button';
import { Calculator, FileText, PieChart, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

const ComptabiliteSolution = () => {
  const features = [
    'Comptabilité générale complète',
    'Plan comptable personnalisable',
    'Gestion des écritures comptables',
    'Rapports financiers automatisés',
    'Bilan et compte de résultat',
    'Suivi de trésorerie',
    'Déclarations fiscales simplifiées',
    'Export comptable expert-comptable'
  ];

  const modules = [
    {
      icon: Calculator,
      title: 'Comptabilité générale',
      description: 'Gestion complète de votre comptabilité avec plan comptable intégré'
    },
    {
      icon: FileText,
      title: 'Écritures comptables',
      description: 'Saisie simplifiée et automatisation des écritures récurrentes'
    },
    {
      icon: PieChart,
      title: 'Rapports financiers',
      description: 'Bilan, compte de résultat et tableaux de bord en temps réel'
    },
    {
      icon: TrendingUp,
      title: 'Analyse financière',
      description: 'Indicateurs de performance et suivi des ratios financiers'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Solution <span className="text-blue-600">Comptabilité</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Gérez votre comptabilité en toute simplicité avec notre solution complète et intuitive
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/user-login">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Essayer gratuitement
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/quote-request">
                  <Button variant="outline" size="lg">
                    Demander un devis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Modules inclus</h2>
              <p className="text-lg text-gray-600">Tous les outils nécessaires pour votre comptabilité</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
                    <p className="text-gray-600">{module.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Fonctionnalités complètes
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Notre solution comptabilité vous offre tous les outils nécessaires pour gérer votre comptabilité efficacement.
                </p>
                
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop" 
                  alt="Interface comptabilité" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">
                Prêt à simplifier votre comptabilité ?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Démarrez votre essai gratuit et découvrez la puissance de G-Suite Comptabilité
              </p>
              <Link to="/user-login">
                <Button size="lg" variant="secondary">
                  Commencer maintenant
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default ComptabiliteSolution;
