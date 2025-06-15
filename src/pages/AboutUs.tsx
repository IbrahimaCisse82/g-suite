
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import { Building, Users, Target, Award, Globe, Heart } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            À propos de G-Suite
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Une solution de gestion d'entreprise conçue par des Africains, pour les entreprises africaines. 
            Développée par GrowHub Sénégal, G-Suite révolutionne la façon dont les entreprises gèrent leurs activités.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Target className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-slate-900">Notre Mission</h2>
              </div>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Démocratiser l'accès aux outils de gestion d'entreprise modernes en Afrique. 
                Nous croyons que chaque entreprise, quelle que soit sa taille, mérite d'avoir 
                accès aux mêmes technologies de pointe que les grandes corporations.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                G-Suite est né de la volonté de répondre aux défis spécifiques du continent 
                africain tout en offrant une expérience utilisateur de classe mondiale.
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Nos Valeurs</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Heart className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Excellence et simplicité dans chaque fonctionnalité</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Innovation adaptée au contexte africain</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Support client exceptionnel et proximité</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Award className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">Transparence et confiance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GrowHub Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Building className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-slate-900">GrowHub Sénégal</h2>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              GrowHub Sénégal est une entreprise technologique sénégalaise spécialisée dans le 
              développement de solutions numériques pour les entreprises africaines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Expertise Locale</h3>
              <p className="text-slate-600">
                Une compréhension profonde des défis et opportunités du marché africain, 
                acquise grâce à notre présence locale et notre expérience terrain.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Innovation Continue</h3>
              <p className="text-slate-600">
                Nous investissons constamment dans la recherche et développement pour 
                offrir des solutions toujours plus performantes et adaptées.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Impact Social</h3>
              <p className="text-slate-600">
                Au-delà de la technologie, nous contribuons au développement économique 
                du continent en autonomisant les entrepreneurs africains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">G-Suite en Chiffres</h2>
            <p className="text-xl text-slate-600">L'impact de notre solution sur le terrain</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-slate-600">Entreprises clientes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">15</div>
              <div className="text-slate-600">Pays africains</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-slate-600">Disponibilité</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-slate-600">Support technique</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à rejoindre l'aventure ?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Découvrez comment G-Suite peut transformer votre entreprise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Nous contacter
            </a>
            <a
              href="/"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              Découvrir G-Suite
            </a>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default AboutUs;
