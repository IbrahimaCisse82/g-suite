
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choisissez votre formule
          </h2>
          <p className="text-xl text-gray-600">
            Des solutions adaptées à la taille de votre entreprise
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Essai gratuit */}
          <Card className="border-2 border-blue-200 shadow-xl">
            <CardHeader className="text-center bg-blue-50">
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm inline-block mb-4">
                Recommandé
              </div>
              <CardTitle className="text-2xl text-blue-600">Essai gratuit</CardTitle>
              <div className="text-4xl font-bold text-gray-900 mt-4">
                0 FCFA
                <span className="text-lg font-normal text-gray-600">/5 jours</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Accès complet à toutes les fonctionnalités</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Support par email et chat</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Formation en ligne incluse</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Jusqu'à 50 transactions</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Aucun engagement</span>
                </li>
              </ul>
              <Link to="/register">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                  Commencer l'essai gratuit
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Solution sur mesure */}
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Solution sur mesure</CardTitle>
              <div className="text-4xl font-bold text-gray-900 mt-4">
                Sur devis
                <span className="text-lg font-normal text-gray-600">/mois</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Toutes les fonctionnalités</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Support prioritaire 24/7</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Formation personnalisée</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Transactions illimitées</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Intégrations sur mesure</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Accompagnement dédié</span>
                </li>
              </ul>
              <Link to="/quote">
                <Button variant="outline" className="w-full text-lg py-3 border-2">
                  Demander un devis
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
