
import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { Button } from '@/components/ui/button';
import { Handshake, FileText, Package, Warehouse, CheckCircle, ArrowRight, Users, ShoppingBag, TrendingUp, Smartphone, Heart, Star } from 'lucide-react';

const CommercialeSolution = () => {
  const features = [
    "Gestion commerciale adaptée aux TPE africaines",
    "Suivi client simple et efficace",
    "Facturation rapide sur smartphone",
    "Gestion de stock sans complexité",
    "Analyses commerciales visuelles et claires"
  ];

  const modules = [
    { icon: Users, title: 'Mes Clients', description: 'Carnet d\'adresses intelligent avec historique' },
    { icon: FileText, title: 'Factures Express', description: 'Factures professionnelles en 2 minutes' },
    { icon: Package, title: 'Mon Catalogue', description: 'Vos produits/services organisés et tarifés' },
    { icon: Warehouse, title: 'Mon Stock', description: 'Inventaire simple avec alertes de rupture' }
  ];

  const tpeChallenges = [
    {
      icon: "📱",
      title: "Mobile d'abord",
      description: "Gérez vos ventes même en déplacement depuis votre smartphone"
    },
    {
      icon: "⚡",
      title: "Ultra-rapide",
      description: "Facturez un client en moins de 2 minutes, même sans connexion"
    },
    {
      icon: "📊",
      title: "Analyses simples",
      description: "Comprenez vos ventes avec des graphiques colorés et clairs"
    },
    {
      icon: "💰",
      title: "Optimisez vos prix",
      description: "Suggestions automatiques de prix basées sur vos données"
    }
  ];

  const businessTypes = [
    "Boutiques et magasins",
    "Salons de coiffure/beauté", 
    "Restaurants et maquis",
    "Ateliers et services",
    "Commerce ambulant",
    "Vente en ligne"
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mr-4">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <Heart className="w-6 h-6 text-red-500" />
                <span className="ml-2 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Parfait pour TPE</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                G-Suite <span className="text-green-600">Commerce TPE</span>
              </h1>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                <strong>Boostez vos ventes et fidélisez vos clients</strong> avec des outils commerciaux 
                pensés spécialement pour les très petites entreprises africaines.
              </p>
              <div className="bg-white rounded-lg p-4 mb-6 border border-green-200">
                <p className="text-green-700 font-medium">
                  🎯 Parfait pour : {businessTypes.slice(0, 3).join(' • ')} et bien plus !
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/tpe/onboarding">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Booster mes ventes
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/company-registration?solution=commerciale">
                  <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    Demander ma licence
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Business Types Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quel que soit votre type de commerce TPE
              </h2>
              <p className="text-lg text-gray-600">G-Suite s'adapte à votre activité</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {businessTypes.map((type, index) => (
                <div key={index} className="flex items-center space-x-3 bg-green-50 p-4 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TPE Advantages Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Conçu pour vos défis de TPE</h2>
              <p className="text-lg text-gray-600">Des solutions concrètes aux problèmes quotidiens</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tpeChallenges.map((challenge, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                  <div className="text-4xl mb-4">{challenge.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{challenge.title}</h3>
                  <p className="text-gray-600">{challenge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Outils commerciaux essentiels</h2>
              <p className="text-lg text-gray-600">Tout ce qu'il faut pour développer votre clientèle</p>
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
        <section className="py-20 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Commerce intelligent pour TPE
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  De la prise de commande au suivi client, gérez toute votre activité commerciale 
                  avec des outils pensés pour les très petites entreprises.
                </p>
                
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-white border border-green-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Smartphone className="w-5 h-5 text-green-600 mr-2" />
                    <h4 className="font-bold text-green-900">Application Mobile Incluse</h4>
                  </div>
                  <p className="text-green-700 text-sm">
                    Vendez partout • Facturez instantanément • Gérez votre stock • 
                    Suivez vos performances, même hors ligne !
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
                  alt="TPE utilisant G-Suite Commerce" 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between bg-green-50 p-3 rounded">
                    <span className="text-sm font-medium">Ventes du jour</span>
                    <span className="text-green-600 font-bold">+25%</span>
                  </div>
                  <div className="flex items-center justify-between bg-blue-50 p-3 rounded">
                    <span className="text-sm font-medium">Clients fidèles</span>
                    <span className="text-blue-600 font-bold">147</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-16 bg-green-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Succès de nos TPE</h2>
                <p className="text-green-100">Des résultats concrets pour des entreprises comme la vôtre</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-white mb-4 italic">
                    "Mes ventes ont augmenté de 40% depuis que j'utilise G-Suite ! 
                    Je connais enfin mes meilleurs clients et produits."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Khadija Dramé</p>
                      <p className="text-green-200 text-sm">Boutique mode, Casablanca</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6 backdrop-blur">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-white mb-4 italic">
                    "Plus de cahiers, plus d'erreurs ! Tout est sur mon téléphone, 
                    mes clients adorent recevoir leurs factures par WhatsApp."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Jean-Baptiste Kouame</p>
                      <p className="text-green-200 text-sm">Atelier couture, Abidjan</p>
                    </div>
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
                Développez votre TPE dès maintenant
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Rejoignez les milliers de commerçants qui ont choisi G-Suite pour grandir
              </p>
              <div className="bg-green-50 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-green-900 mb-2">🚀 Pack de démarrage TPE</h3>
                <div className="text-green-700 text-sm space-y-1">
                  <p>✅ Configuration guidée personnalisée</p>
                  <p>✅ Formation commerciale gratuite</p>
                  <p>✅ Templates de factures professionnelles</p>
                  <p>✅ Support WhatsApp dédié</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/tpe/onboarding">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Commencer gratuitement
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Première vente en moins d'1 heure • Aucune compétence technique requise
              </p>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default CommercialeSolution;
