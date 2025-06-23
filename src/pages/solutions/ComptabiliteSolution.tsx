
import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { Button } from '@/components/ui/button';
import { Receipt, FileText, PieChart, TrendingUp, CheckCircle, ArrowRight, Calculator, BookOpen, Shield, Users } from 'lucide-react';

const ComptabiliteSolution = () => {
  const features = [
    "Comptabilité ultra-simplifiée pour TPE",
    "Pas besoin d'être comptable pour l'utiliser",
    "Conformité fiscale OHADA automatique",
    "Formation gratuite avec expert-comptable",
    "Rapports visuels faciles à comprendre"
  ];

  const modules = [
    { icon: Calculator, title: 'Saisie Facile', description: 'Enregistrez vos ventes et achats en quelques clics' },
    { icon: FileText, title: 'Journaux Automatiques', description: 'Tous vos mouvements sont classés automatiquement' },
    { icon: PieChart, title: 'Bilans Instantanés', description: 'Visualisez la santé de votre TPE en temps réel' },
    { icon: TrendingUp, title: 'Tableaux de Bord', description: 'Suivez vos performances sans être expert' }
  ];

  const tpeNeeds = [
    {
      problem: "Je ne comprends rien à la comptabilité",
      solution: "Interface guidée étape par étape avec explications simples"
    },
    {
      problem: "Je n'ai pas le temps pour la paperasse",
      solution: "5 minutes par jour suffisent avec notre saisie rapide"
    },
    {
      problem: "J'ai peur de faire des erreurs",
      solution: "Contrôles automatiques et alertes de sécurité"
    },
    {
      problem: "C'est trop cher pour ma petite entreprise",
      solution: "Tarifs adaptés aux TPE, essai gratuit sans engagement"
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
              <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700">
                <Receipt className="w-8 h-8 text-white" />
              </div>
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                📊 Spécialement conçu pour les TPE
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                G-Suite <span className="text-blue-600">Comptabilité TPE</span>
              </h1>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                <strong>Enfin une comptabilité accessible aux très petites entreprises !</strong><br/>
                Gérez vos comptes sans être comptable, en toute simplicité et conformité OHADA.
              </p>
              <div className="bg-white rounded-lg p-4 mb-6 border border-blue-200">
                <p className="text-blue-700 font-medium">
                  ✅ Aucune formation comptable requise • Interface en français • Support inclus
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/tpe/onboarding">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Essayer gratuitement
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/company-registration?solution=comptable">
                  <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Demander ma licence
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Problems & Solutions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nous comprenons vos difficultés de TPE
              </h2>
              <p className="text-lg text-gray-600">Et nous avons la solution adaptée</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {tpeNeeds.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <div className="mb-4">
                    <h4 className="font-semibold text-red-600 mb-2">😰 Votre préoccupation :</h4>
                    <p className="text-gray-700 italic">"{item.problem}"</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">✅ Notre solution :</h4>
                    <p className="text-gray-700">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Une comptabilité TPE complète</h2>
              <p className="text-lg text-gray-600">Tous les outils nécessaires, sans la complexité</p>
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
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Comptabilité pensée pour les TPE
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Nous savons que vous n'êtes pas comptable, et c'est normal ! 
                  G-Suite Comptabilité TPE traduit la complexité comptable en actions simples.
                </p>
                
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                    <h4 className="font-bold text-blue-900">Formation Gratuite Incluse</h4>
                  </div>
                  <p className="text-blue-700 text-sm">
                    Sessions de formation personnalisées • Guides vidéo • Support téléphonique • 
                    Accompagnement par un expert-comptable
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop" 
                  alt="TPE gérant sa comptabilité facilement" 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between bg-green-50 p-3 rounded">
                    <span className="text-sm font-medium">Chiffre d'affaires</span>
                    <span className="text-green-600 font-bold">+15%</span>
                  </div>
                  <div className="flex items-center justify-between bg-blue-50 p-3 rounded">
                    <span className="text-sm font-medium">Conformité fiscale</span>
                    <span className="text-blue-600 font-bold">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Ce que disent les TPE</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur">
                  <p className="text-white mb-4 italic">
                    "Je pensais que la comptabilité était trop compliquée pour moi. 
                    Avec G-Suite, j'ai enfin compris mes chiffres !"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Moussa Traoré</p>
                      <p className="text-blue-200 text-sm">Atelier mécanique, Bamako</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6 backdrop-blur">
                  <p className="text-white mb-4 italic">
                    "Plus jamais de stress avec l'administration ! 
                    Mes documents sont toujours prêts et conformes."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Fatou Seck</p>
                      <p className="text-blue-200 text-sm">Boutique textile, Abidjan</p>
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
                Simplifiez votre comptabilité dès aujourd'hui
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Rejoignez les milliers de TPE qui ont dit adieu aux cahiers et aux complications
              </p>
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-blue-900 mb-2">🎁 Offre de lancement TPE</h3>
                <p className="text-blue-700">
                  Essai gratuit 30 jours • Formation personnalisée offerte • 
                  Support prioritaire • Migration de vos données gratuites
                </p>
              </div>
              <Link to="/tpe/onboarding">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Commencer maintenant
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Installation en 15 minutes • Aucune compétence technique requise
              </p>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default ComptabiliteSolution;
