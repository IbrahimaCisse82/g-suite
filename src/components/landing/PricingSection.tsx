
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            💰 Tarification transparente
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Des prix adaptés à votre croissance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Commencez gratuitement et évoluez selon vos besoins. 
            Aucun engagement, annulation possible à tout moment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Essai gratuit */}
          <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-gray-900">Essai gratuit</CardTitle>
              <div className="text-4xl font-bold text-gray-900 mt-4">
                0 FCFA
                <span className="text-lg font-normal text-gray-600">/14 jours</span>
              </div>
              <p className="text-gray-600">Parfait pour découvrir</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Toutes les fonctionnalités</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Jusqu'à 100 transactions</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Support par email</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Formation en ligne</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Aucun engagement</span>
                </li>
              </ul>
              <Link to="/register" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Starter */}
          <Card className="border-2 border-green-200 shadow-xl relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Recommandé
              </div>
            </div>
            <CardHeader className="text-center pb-4 pt-8">
              <CardTitle className="text-2xl text-gray-900">Starter</CardTitle>
              <div className="text-4xl font-bold text-gray-900 mt-4">
                15 000 FCFA
                <span className="text-lg font-normal text-gray-600">/mois</span>
              </div>
              <p className="text-gray-600">Idéal pour les petites entreprises</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Toutes les fonctionnalités</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Transactions illimitées</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Support prioritaire</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Formation personnalisée</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Sauvegarde automatique</span>
                </li>
              </ul>
              <Link to="/register" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                  Choisir Starter
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Enterprise */}
          <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-gray-900">Enterprise</CardTitle>
              <div className="text-4xl font-bold text-gray-900 mt-4">
                Sur devis
                <span className="text-lg font-normal text-gray-600">/mois</span>
              </div>
              <p className="text-gray-600">Pour les grandes entreprises</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Toutes les fonctionnalités</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Multi-sociétés</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Support 24/7</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Intégrations sur mesure</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Accompagnement dédié</span>
                </li>
              </ul>
              <Link to="/quote" className="block">
                <Button variant="outline" className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 py-3">
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Tous les plans incluent : Mises à jour gratuites • Support technique • Formation • Sauvegarde sécurisée
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
