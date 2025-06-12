
import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { Button } from '@/components/ui/button';
import { Building, Calculator, Users, FileText, ShoppingCart, Package, Warehouse, CreditCard, PieChart, TrendingUp, Settings, CheckCircle, ArrowRight } from 'lucide-react';

const EntrepriseSolution = () => {
  const features = [
    'Comptabilité générale intégrée',
    'Gestion commerciale complète',
    'Facturation et devis automatisés',
    'Gestion des stocks avancée',
    'Suivi de trésorerie en temps réel',
    'Rapports et analyses détaillés',
    'Gestion multi-utilisateurs',
    'Sauvegarde automatique cloud',
    'Support technique prioritaire',
    'Formation et accompagnement',
    'Personnalisation avancée',
    'Intégrations tierces'
  ];

  const modules = [
    {
      icon: Calculator,
      title: 'Comptabilité',
      description: 'Comptabilité générale, écritures et rapports financiers'
    },
    {
      icon: Users,
      title: 'Contacts',
      description: 'Gestion complète clients, fournisseurs et prospects'
    },
    {
      icon: FileText,
      title: 'Facturation',
      description: 'Devis, factures, bons de commande automatisés'
    },
    {
      icon: ShoppingCart,
      title: 'Achats',
      description: 'Gestion des commandes et relations fournisseurs'
    },
    {
      icon: Package,
      title: 'Produits',
      description: 'Catalogue produits avec gestion des variantes'
    },
    {
      icon: Warehouse,
      title: 'Stock',
      description: 'Suivi en temps réel des mouvements de stock'
    },
    {
      icon: CreditCard,
      title: 'Trésorerie',
      description: 'Suivi des flux financiers et prévisions'
    },
    {
      icon: PieChart,
      title: 'Rapports',
      description: 'Tableaux de bord et analyses avancées'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Solution <span className="text-purple-600">Gestion d'Entreprise</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                La solution tout-en-un pour gérer votre entreprise : comptabilité, commercial, stocks et bien plus
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/user-login">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tous les modules inclus</h2>
              <p className="text-lg text-gray-600">Une solution complète pour tous les aspects de votre entreprise</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-purple-600" />
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
                  Solution entreprise complète
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  G-Suite Entreprise rassemble tous les outils dont vous avez besoin pour gérer efficacement votre entreprise, de la comptabilité à la gestion commerciale.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" 
                  alt="Interface gestion entreprise" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir G-Suite Entreprise ?</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Solution intégrée</h3>
                <p className="text-gray-600">Tous vos processus métier dans une seule plateforme unifiée</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Croissance facilitée</h3>
                <p className="text-gray-600">Évoluez sereinement avec des outils qui s'adaptent à votre croissance</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Personnalisable</h3>
                <p className="text-gray-600">Adaptez la solution à vos besoins spécifiques</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-purple-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">
                Transformez votre gestion d'entreprise
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Découvrez la puissance de G-Suite Entreprise et révolutionnez votre façon de travailler
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

export default EntrepriseSolution;
