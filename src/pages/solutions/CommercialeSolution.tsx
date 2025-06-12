
import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { Button } from '@/components/ui/button';
import { Users, FileText, ShoppingCart, Package, CheckCircle, ArrowRight, Warehouse, CreditCard } from 'lucide-react';

const CommercialeSolution = () => {
  const features = [
    'Gestion clients et fournisseurs',
    'Facturation automatisée',
    'Gestion des stocks en temps réel',
    'Suivi des ventes et achats',
    'Devis et bons de commande',
    'Relances automatiques',
    'Catalogue produits complet',
    'Statistiques commerciales avancées'
  ];

  const modules = [
    {
      icon: Users,
      title: 'Clients & Fournisseurs',
      description: 'Base de données complète de vos contacts commerciaux'
    },
    {
      icon: FileText,
      title: 'Facturation',
      description: 'Création et envoi automatisé de devis et factures'
    },
    {
      icon: Package,
      title: 'Gestion produits',
      description: 'Catalogue produits avec prix, références et descriptions'
    },
    {
      icon: Warehouse,
      title: 'Gestion stocks',
      description: 'Suivi en temps réel des entrées et sorties de stock'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Solution <span className="text-green-600">Commerciale</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Optimisez votre activité commerciale avec notre solution complète de gestion des ventes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/user-login">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
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
              <p className="text-lg text-gray-600">Tout ce dont vous avez besoin pour gérer votre activité commerciale</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-green-600" />
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
                  Gestion commerciale complète
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  De la prospection à la facturation, gérez toute votre activité commerciale en un seul endroit.
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
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
                  alt="Interface commerciale" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-green-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">
                Boostez vos ventes dès aujourd'hui
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Découvrez comment G-Suite Commercial peut transformer votre activité
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

export default CommercialeSolution;
