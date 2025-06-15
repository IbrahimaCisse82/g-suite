
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { Shield, Eye, Lock, Users, Database, AlertTriangle } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Politique de Confidentialité</h1>
            <p className="text-xl text-slate-600">
              Votre vie privée est importante pour nous. Cette politique explique comment nous collectons, 
              utilisons et protégeons vos données personnelles.
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Eye className="w-6 h-6 text-green-600 mr-3" />
                Introduction
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  GrowHub Sénégal SARL, éditeur de G-Suite, s'engage à protéger la confidentialité et la sécurité 
                  de vos données personnelles. Cette politique de confidentialité décrit nos pratiques concernant 
                  la collecte, l'utilisation, le stockage et la protection de vos informations personnelles.
                </p>
                <p>
                  En utilisant G-Suite, vous acceptez les pratiques décrites dans cette politique. 
                  Si vous n'acceptez pas cette politique, veuillez ne pas utiliser nos services.
                </p>
              </div>
            </section>

            {/* Données collectées */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Database className="w-6 h-6 text-green-600 mr-3" />
                Données que Nous Collectons
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Informations d'identification</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li>Nom, prénom, adresse email</li>
                    <li>Numéro de téléphone</li>
                    <li>Informations sur votre entreprise (nom, adresse, secteur d'activité)</li>
                    <li>Données de connexion (adresse IP, type de navigateur, système d'exploitation)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Données d'utilisation</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li>Informations sur votre utilisation de G-Suite</li>
                    <li>Préférences et paramètres de compte</li>
                    <li>Données de performance et d'analyse</li>
                    <li>Communications avec notre support client</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Données métier</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                    <li>Informations sur vos clients et fournisseurs</li>
                    <li>Données de facturation et comptables</li>
                    <li>Inventaire et données produits</li>
                    <li>Documents et fichiers que vous téléchargez</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Utilisation des données */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Users className="w-6 h-6 text-green-600 mr-3" />
                Comment Nous Utilisons Vos Données
              </h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Fourniture du service</h3>
                  <p className="text-green-700">
                    Nous utilisons vos données pour fournir, maintenir et améliorer les fonctionnalités de G-Suite.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Support client</h3>
                  <p className="text-blue-700">
                    Vos informations nous aident à vous fournir un support technique et commercial efficace.
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">Communications</h3>
                  <p className="text-yellow-700">
                    Nous vous envoyons des notifications importantes sur votre compte et des mises à jour sur nos services.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Amélioration du service</h3>
                  <p className="text-purple-700">
                    L'analyse des données d'usage nous aide à développer de nouvelles fonctionnalités et améliorer l'expérience utilisateur.
                  </p>
                </div>
              </div>
            </section>

            {/* Partage des données */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 text-green-600 mr-3" />
                Partage de Vos Données
              </h2>
              <div className="space-y-4 text-slate-700">
                <p className="bg-red-50 p-4 rounded-lg text-red-800 font-medium">
                  <strong>Nous ne vendons jamais vos données personnelles à des tiers.</strong>
                </p>
                
                <p>Nous pouvons partager vos données uniquement dans les cas suivants :</p>
                
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Avec votre consentement explicite</strong></li>
                  <li><strong>Prestataires de services :</strong> Avec nos partenaires techniques pour la fourniture du service (hébergement, paiement, etc.)</li>
                  <li><strong>Obligations légales :</strong> Si requis par la loi ou une autorité compétente</li>
                  <li><strong>Protection des droits :</strong> Pour protéger nos droits, notre propriété ou notre sécurité</li>
                </ul>
                
                <p>
                  Tous nos prestataires sont contractuellement tenus de protéger vos données et ne peuvent 
                  les utiliser que pour les services qu'ils nous fournissent.
                </p>
              </div>
            </section>

            {/* Sécurité */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Lock className="w-6 h-6 text-green-600 mr-3" />
                Sécurité de Vos Données
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Mesures techniques</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>Chiffrement SSL/TLS pour toutes les communications</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>Chiffrement des données au repos (AES-256)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>Authentification à deux facteurs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>Surveillance continue des accès</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Mesures organisationnelles</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>Accès limité aux données sur base du besoin</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>Formation du personnel à la sécurité</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>Audits de sécurité réguliers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>Sauvegardes quotidiennes sécurisées</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Vos droits */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Vos Droits</h2>
              <div className="space-y-4">
                <p className="text-slate-700">
                  Conformément au RGPD et à la législation sénégalaise, vous disposez des droits suivants :
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Droit d'accès</h3>
                    <p className="text-green-700 text-sm">Consulter les données que nous détenons sur vous</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Droit de rectification</h3>
                    <p className="text-blue-700 text-sm">Corriger les données inexactes ou incomplètes</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-2">Droit à l'effacement</h3>
                    <p className="text-yellow-700 text-sm">Demander la suppression de vos données</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Droit à la portabilité</h3>
                    <p className="text-purple-700 text-sm">Récupérer vos données dans un format utilisable</p>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-slate-700">
                    <strong>Pour exercer vos droits :</strong> Contactez-nous à 
                    <a href="mailto:privacy@g-suite.com" className="text-green-600 hover:text-green-700 ml-1">
                      privacy@g-suite.com
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Utilisation des Cookies</h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  G-Suite utilise des cookies pour améliorer votre expérience et analyser l'utilisation du service :
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site (connexion, sécurité)
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <strong>Cookies analytiques :</strong> Pour comprendre l'utilisation du site et l'améliorer
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                    <div>
                      <strong>Cookies de préférences :</strong> Pour mémoriser vos paramètres et préférences
                    </div>
                  </div>
                </div>
                
                <p>
                  Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur. 
                  Consultez notre <a href="/cookies-policy" className="text-green-600 hover:text-green-700">Politique de Cookies</a> 
                  pour plus de détails.
                </p>
              </div>
            </section>

            {/* Contact et modifications */}
            <section className="bg-green-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact et Modifications</h2>
              <div className="space-y-4">
                <div>
                  <strong className="text-slate-900">Pour toute question sur cette politique :</strong>
                  <div className="mt-2 space-y-2 text-slate-700">
                    <div>Email : <a href="mailto:privacy@g-suite.com" className="text-green-600 hover:text-green-700">privacy@g-suite.com</a></div>
                    <div>Téléphone : +221 78 475 28 58</div>
                    <div>Adresse : GrowHub Sénégal SARL, Dakar, Sénégal</div>
                  </div>
                </div>
                
                <div className="border-t border-green-200 pt-4">
                  <p className="text-slate-700">
                    <strong>Modifications :</strong> Cette politique peut être modifiée pour refléter les changements 
                    dans nos pratiques ou la réglementation. Nous vous informerons de tout changement important 
                    par email ou notification dans l'application.
                  </p>
                </div>
                
                <div className="text-center text-green-800 font-medium">
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

export default PrivacyPolicy;
