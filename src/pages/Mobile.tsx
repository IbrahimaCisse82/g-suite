
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { Smartphone, Download, Bell, Wifi, Shield, Zap } from 'lucide-react';

const Mobile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                G-Suite Mobile
              </h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Gérez votre entreprise où que vous soyez avec l'application mobile G-Suite. 
                Toute la puissance de la version web dans votre poche.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors opacity-50 cursor-not-allowed">
                  <Download className="mr-2 w-5 h-5" />
                  Bientôt sur App Store
                </button>
                <button className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors opacity-50 cursor-not-allowed">
                  <Download className="mr-2 w-5 h-5" />
                  Bientôt sur Google Play
                </button>
              </div>
              <p className="text-green-100 text-sm mt-4">
                🚀 Application en cours de développement - Sortie prévue Q2 2024
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-128 bg-slate-900 rounded-3xl p-2 shadow-2xl">
                  <div className="w-full h-full bg-green-50 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Smartphone className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <p className="text-green-800 font-medium">Aperçu de l'app mobile</p>
                      <p className="text-green-600 text-sm mt-2">Bientôt disponible</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Fonctionnalités à Venir
            </h2>
            <p className="text-xl text-slate-600">
              L'expérience G-Suite complète, optimisée pour mobile
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-slate-900">Interface Optimisée</h3>
              </div>
              <p className="text-slate-600">
                Interface utilisateur spécialement conçue pour les écrans mobiles 
                avec navigation intuitive et gestes tactiles.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-4">
                <Wifi className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-slate-900">Mode Hors Ligne</h3>
              </div>
              <p className="text-slate-600">
                Continuez à travailler même sans connexion internet. 
                Synchronisation automatique une fois reconnecté.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-4">
                <Bell className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-slate-900">Notifications Push</h3>
              </div>
              <p className="text-slate-600">
                Recevez des alertes en temps réel pour les factures en retard, 
                nouveaux messages et mises à jour importantes.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-slate-900">Sécurité Renforcée</h3>
              </div>
              <p className="text-slate-600">
                Authentification biométrique (empreinte, Face ID) et 
                chiffrement des données stockées localement.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-4">
                <Smartphone className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-slate-900">Scanner Intégré</h3>
              </div>
              <p className="text-slate-600">
                Scannez vos reçus et factures directement avec l'appareil photo 
                pour les ajouter automatiquement à votre comptabilité.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-4">
                <Download className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-slate-900">Synchronisation</h3>
              </div>
              <p className="text-slate-600">
                Synchronisation en temps réel avec la version web. 
                Vos données sont toujours à jour sur tous vos appareils.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Feuille de Route Mobile
            </h2>
            <p className="text-xl text-slate-600">
              Suivez l'avancement du développement de notre application mobile
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900">Phase 1 - Développement Core</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">En cours</span>
                  </div>
                  <p className="text-slate-600 mb-2">Développement des fonctionnalités principales : dashboard, factures, clients, produits</p>
                  <p className="text-sm text-slate-500">Q1 2024</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900">Phase 2 - Fonctionnalités Avancées</h3>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Planifié</span>
                  </div>
                  <p className="text-slate-600 mb-2">Mode hors ligne, synchronisation, notifications push, scanner de documents</p>
                  <p className="text-sm text-slate-500">Q2 2024</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900">Phase 3 - Lancement Public</h3>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">À venir</span>
                  </div>
                  <p className="text-slate-600 mb-2">Tests beta, optimisations, publication sur App Store et Google Play</p>
                  <p className="text-sm text-slate-500">Q3 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Program */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Rejoignez le Programme Beta
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Soyez parmi les premiers à tester l'application mobile G-Suite et 
            aidez-nous à l'améliorer avant sa sortie officielle.
          </p>
          <div className="bg-green-50 rounded-xl p-8 max-w-lg mx-auto">
            <h3 className="text-lg font-bold text-green-800 mb-4">Avantages du programme beta</h3>
            <ul className="text-left space-y-2 text-green-700">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Accès anticipé aux nouvelles fonctionnalités</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Influence directe sur le développement</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Support prioritaire</span>
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              S'inscrire au programme beta
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mobile;
