
import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { Button } from '@/components/ui/button';
import { Briefcase, Calculator, Users, FileText, ShoppingCart, Package, Warehouse, CreditCard, PieChart, TrendingUp, Settings, CheckCircle, ArrowRight, Store, Heart } from 'lucide-react';

const EntrepriseSolution = () => {
  const features = [
    "Solution complète adaptée aux TPE africaines",
    "Interface ultra-simplifiée en français",
    "Gestion multi-devises (FCFA inclus)",
    "Accompagnement personnalisé pour débutants",
    "Prix accessible aux petites structures"
  ];

  const modules = [
    { icon: Calculator, title: 'Comptabilité TPE', description: 'Comptabilité simplifiée adaptée aux petites structures' },
    { icon: Users, title: 'Mes Contacts', description: 'Carnet d\'adresses clients et fournisseurs' },
    { icon: FileText, title: 'Facturation Express', description: 'Factures rapides et professionnelles' },
    { icon: ShoppingCart, title: 'Mes Achats', description: 'Suivi simplifié des achats et dépenses' },
    { icon: Package, title: 'Mon Catalogue', description: 'Gestion simple de vos produits/services' },
    { icon: Warehouse, title: 'Mon Stock', description: 'Inventaire facile et alertes automatiques' },
    { icon: CreditCard, title: 'Ma Trésorerie', description: 'Suivi de vos entrées et sorties d\'argent' },
    { icon: PieChart, title: 'Mes Rapports', description: 'Tableaux de bord visuels et compréhensibles' }
  ];

  const tpeAdvantages = [
    "Interface pensée pour les non-comptables",
    "Formation gratuite incluse",
    "Support téléphonique en français",
    "Démarrage en moins de 30 minutes",
    "Sauvegarde automatique cloud",
    "Compatible smartphone et tablette"
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 mr-4">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <Heart className="w-6 h-6 text-red-500" />
                <span className="ml-2 text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">Spécial TPE</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                G-Suite <span className="text-purple-600">TPE Intégrale</span>
              </h1>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                La solution de gestion <strong>spécialement conçue pour les Très Petites Entreprises africaines</strong>. 
                Gérez votre business en toute simplicité, même sans formation comptable !
              </p>
              <div className="bg-white rounded-lg p-4 mb-6 border border-purple-200">
                <p className="text-purple-700 font-medium">
                  🎯 Idéal pour : Boutiques, Salons, Restaurants, Artisans, Consultants, Commerce de détail
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/tpe/onboarding">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Démarrer mon TPE
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/company-registration?solution=entreprise">
                  <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                    Demander ma licence
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TPE Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi G-Suite est parfait pour votre TPE ?</h2>
              <p className="text-lg text-gray-600">Nous comprenons les défis uniques des très petites entreprises</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {tpeAdvantages.map((advantage, index) => (
                <div key={index} className="flex items-center space-x-3 bg-purple-50 p-4 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{advantage}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tous les outils pour votre TPE</h2>
              <p className="text-lg text-gray-600">Une solution complète mais simple à utiliser</p>
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
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Conçu spécialement pour les TPE africaines
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  G-Suite TPE comprend les réalités des très petites entreprises en Afrique : 
                  simplicité, accessibilité et support en français.
                </p>
                
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="font-bold text-purple-900 mb-2">🚀 Démarrage Express TPE</h4>
                  <p className="text-purple-700 text-sm">
                    Configuration guidée en 3 étapes • Interface intuitive • Formation incluse • Support dédié
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop" 
                  alt="TPE africaine utilisant G-Suite" 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 italic">
                    "Enfin un logiciel pensé pour nous, les petites entreprises !"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-purple-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">
                <p className="text-xl text-white mb-6 italic">
                  "Avant G-Suite, je perdais du temps avec des cahiers et Excel. 
                  Maintenant, en 5 minutes, j'ai toutes mes informations : 
                  mes ventes, mes stocks, mes clients. C'est révolutionnaire pour mon salon !"
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Store className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">Aminata Diallo</p>
                    <p className="text-purple-200 text-sm">Salon de coiffure, Dakar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Rejoignez les milliers de TPE qui nous font confiance
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Essai gratuit • Configuration guidée • Support en français • Formation incluse
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/tpe/onboarding">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Commencer gratuitement
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Configuration en 30 minutes • Aucune carte bancaire requise
              </p>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default EntrepriseSolution;
