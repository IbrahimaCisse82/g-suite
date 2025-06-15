
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { Cookie, Settings, Eye, BarChart, Shield } from 'lucide-react';

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Cookie className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Politique de Cookies</h1>
            <p className="text-xl text-slate-600">
              Comment G-Suite utilise les cookies pour améliorer votre expérience et respecter votre vie privée.
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Qu'est-ce qu'un cookie */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Cookie className="w-6 h-6 text-green-600 mr-3" />
                Qu'est-ce qu'un Cookie ?
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, tablette, smartphone) 
                  lorsque vous visitez un site web. Les cookies permettent au site de mémoriser vos actions 
                  et préférences pendant une certaine période.
                </p>
                <p>
                  G-Suite utilise différents types de cookies pour assurer le bon fonctionnement du service, 
                  améliorer votre expérience utilisateur et analyser l'utilisation de notre plateforme.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-medium">
                    💡 Les cookies ne peuvent pas endommager votre appareil ni contenir de virus. 
                    Ils ne contiennent pas d'informations personnelles identifiables.
                  </p>
                </div>
              </div>
            </section>

            {/* Types de cookies */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Types de Cookies Utilisés</h2>
              <div className="space-y-6">
                <div className="border border-green-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                    <h3 className="text-xl font-bold text-slate-900">Cookies Essentiels</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Toujours actifs</span>
                  </div>
                  <p className="text-slate-700 mb-3">
                    Ces cookies sont indispensables au fonctionnement de G-Suite. Ils ne peuvent pas être désactivés.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 text-sm">
                    <li>Authentification et sécurité des sessions</li>
                    <li>Préférences de langue et de région</li>
                    <li>Panier et données de formulaire temporaires</li>
                    <li>Protection contre les attaques CSRF</li>
                  </ul>
                </div>

                <div className="border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <BarChart className="w-8 h-8 text-blue-600" />
                    <h3 className="text-xl font-bold text-slate-900">Cookies Analytiques</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Optionnels</span>
                  </div>
                  <p className="text-slate-700 mb-3">
                    Ces cookies nous aident à comprendre comment vous utilisez G-Suite pour améliorer nos services.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 text-sm">
                    <li>Statistiques de visite et d'utilisation</li>
                    <li>Pages les plus consultées</li>
                    <li>Temps passé sur chaque section</li>
                    <li>Identification des erreurs techniques</li>
                  </ul>
                </div>

                <div className="border border-purple-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Settings className="w-8 h-8 text-purple-600" />
                    <h3 className="text-xl font-bold text-slate-900">Cookies de Préférences</h3>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Optionnels</span>
                  </div>
                  <p className="text-slate-700 mb-3">
                    Ces cookies mémorisent vos préférences pour personnaliser votre expérience.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 text-sm">
                    <li>Préférences d'affichage du tableau de bord</li>
                    <li>Colonnes personnalisées dans les tableaux</li>
                    <li>Thème et paramètres d'interface</li>
                    <li>Filtres et tris sauvegardés</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Services tiers */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Eye className="w-6 h-6 text-green-600 mr-3" />
                Services Tiers et Cookies
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  G-Suite peut intégrer des services tiers qui utilisent leurs propres cookies. 
                  Voici les principaux services que nous utilisons :
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-900 mb-2">Google Analytics</h3>
                    <p className="text-sm text-slate-600 mb-2">
                      Analyse du trafic et du comportement des utilisateurs
                    </p>
                    <a href="https://policies.google.com/privacy" className="text-green-600 hover:text-green-700 text-sm">
                      Politique de confidentialité Google →
                    </a>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-900 mb-2">Supabase</h3>
                    <p className="text-sm text-slate-600 mb-2">
                      Infrastructure backend et base de données
                    </p>
                    <a href="https://supabase.com/privacy" className="text-green-600 hover:text-green-700 text-sm">
                      Politique de confidentialité Supabase →
                    </a>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">
                    <strong>Note :</strong> Ces services tiers ont leurs propres politiques de cookies. 
                    Nous vous encourageons à les consulter pour comprendre leurs pratiques.
                  </p>
                </div>
              </div>
            </section>

            {/* Gestion des cookies */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Gestion de Vos Préférences</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Dans G-Suite</h3>
                  <p className="text-slate-700 mb-4">
                    Vous pouvez gérer vos préférences de cookies directement dans l'application :
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">Centre de préférences cookies</span>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Gérer mes préférences
                      </button>
                    </div>
                    <p className="text-green-700 text-sm mt-2">
                      Accessible depuis Paramètres → Confidentialité → Cookies
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Dans votre navigateur</h3>
                  <p className="text-slate-700 mb-4">
                    Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies :
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-medium text-slate-900 mb-2">Google Chrome</h4>
                      <p className="text-sm text-slate-600">
                        Paramètres → Confidentialité et sécurité → Cookies et autres données de sites
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-medium text-slate-900 mb-2">Firefox</h4>
                      <p className="text-sm text-slate-600">
                        Préférences → Vie privée et sécurité → Cookies et données de sites
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-medium text-slate-900 mb-2">Safari</h4>
                      <p className="text-sm text-slate-600">
                        Préférences → Confidentialité → Bloquer tous les cookies
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-medium text-slate-900 mb-2">Edge</h4>
                      <p className="text-sm text-slate-600">
                        Paramètres → Confidentialité → Cookies et autorisations de site
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Impact du blocage */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Impact du Blocage des Cookies</h2>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2">⚠️ Cookies essentiels bloqués</h3>
                  <ul className="list-disc list-inside space-y-1 text-red-700 text-sm">
                    <li>Impossibilité de se connecter à votre compte</li>
                    <li>Perte des données de session</li>
                    <li>Fonctionnalités de sécurité désactivées</li>
                    <li>Interface non fonctionnelle</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-2">📊 Cookies analytiques bloqués</h3>
                  <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm">
                    <li>Nous ne pourrons pas améliorer l'expérience utilisateur</li>
                    <li>Difficultés à identifier et corriger les bugs</li>
                    <li>Fonctionnalités personnalisées limitées</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">⚙️ Cookies de préférences bloqués</h3>
                  <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                    <li>Perte de vos paramètres personnalisés</li>
                    <li>Réinitialisation des préférences d'affichage</li>
                    <li>Expérience moins personnalisée</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Conservation et mise à jour */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Conservation et Mise à Jour</h2>
              <div className="space-y-4 text-slate-700">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Durée de conservation</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">Session</div>
                      <div className="text-sm text-green-800">Cookies de session</div>
                      <div className="text-xs text-green-600 mt-1">Supprimés à la fermeture</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">30 jours</div>
                      <div className="text-sm text-blue-800">Cookies de préférences</div>
                      <div className="text-xs text-blue-600 mt-1">Renouvelés à chaque visite</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-2">2 ans</div>
                      <div className="text-sm text-purple-800">Cookies analytiques</div>
                      <div className="text-xs text-purple-600 mt-1">Conformément à Google Analytics</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Mises à jour</h3>
                  <p>
                    Cette politique de cookies peut être mise à jour pour refléter les changements 
                    dans nos pratiques ou la réglementation. Nous vous informerons de tout changement 
                    important par notification dans l'application.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-green-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Questions sur les Cookies ?</h2>
              <div className="space-y-4">
                <p className="text-slate-700">
                  Si vous avez des questions concernant notre utilisation des cookies ou souhaitez 
                  exercer vos droits, n'hésitez pas à nous contacter :
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Contact direct</h3>
                    <div className="space-y-1 text-slate-700">
                      <div>📧 <a href="mailto:privacy@g-suite.com" className="text-green-600 hover:text-green-700">privacy@g-suite.com</a></div>
                      <div>📞 +221 78 475 28 58</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Support technique</h3>
                    <div className="space-y-1 text-slate-700">
                      <div>📧 <a href="mailto:support@g-suite.com" className="text-green-600 hover:text-green-700">support@g-suite.com</a></div>
                      <div>💬 Chat en direct (9h-18h GMT)</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-green-800 font-medium pt-4 border-t border-green-200">
                  Dernière mise à jour : 15 juin 2024
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicy;
