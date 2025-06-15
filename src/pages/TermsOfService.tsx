
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { FileText, AlertTriangle, CreditCard, Shield, Users, Ban } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <FileText className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Conditions Générales d'Utilisation</h1>
            <p className="text-xl text-slate-600">
              Les conditions qui régissent l'utilisation de G-Suite et définissent nos engagements mutuels.
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Acceptation */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 text-green-600 mr-3" />
                Acceptation des Conditions
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  En accédant et en utilisant G-Suite (le "Service"), fourni par GrowHub Sénégal SARL 
                  (la "Société", "nous", "notre"), vous acceptez d'être lié par ces Conditions Générales 
                  d'Utilisation ("CGU").
                </p>
                <p>
                  Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser le Service. 
                  Ces CGU constituent un accord légalement contraignant entre vous et GrowHub Sénégal SARL.
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 font-medium">
                    ⚠️ En utilisant G-Suite, vous confirmez avoir lu, compris et accepté ces conditions.
                  </p>
                </div>
              </div>
            </section>

            {/* Description du service */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 text-green-600 mr-3" />
                Description du Service
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  G-Suite est une suite logicielle de gestion d'entreprise en mode SaaS (Software as a Service) 
                  qui comprend notamment :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Gestion de la facturation et de la comptabilité</li>
                  <li>Gestion des stocks et inventaires</li>
                  <li>Gestion de la relation client (CRM)</li>
                  <li>Tableau de bord et reporting</li>
                  <li>Gestion des achats et fournisseurs</li>
                  <li>Module de trésorerie</li>
                </ul>
                <p>
                  Le Service est accessible via une interface web et, ultérieurement, via des applications mobiles. 
                  Les fonctionnalités spécifiques peuvent varier selon votre plan d'abonnement.
                </p>
              </div>
            </section>

            {/* Inscription et compte */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Users className="w-6 h-6 text-green-600 mr-3" />
                Inscription et Gestion de Compte
              </h2>
              <div className="space-y-4 text-slate-700">
                <h3 className="text-lg font-semibold text-slate-900">Création de compte</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Vous devez fournir des informations exactes et complètes lors de l'inscription</li>
                  <li>Vous êtes responsable de maintenir la confidentialité de vos identifiants</li>
                  <li>Un seul compte par entreprise est autorisé, sauf autorisation expresse</li>
                  <li>Vous devez être âgé d'au moins 18 ans pour créer un compte</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-slate-900">Responsabilités</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Vous êtes responsable de toutes les activités sous votre compte</li>
                  <li>Vous devez nous notifier immédiatement de tout usage non autorisé</li>
                  <li>Vous devez maintenir vos informations de compte à jour</li>
                </ul>
              </div>
            </section>

            {/* Abonnements et paiements */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <CreditCard className="w-6 h-6 text-green-600 mr-3" />
                Abonnements et Paiements
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Plans d'abonnement</h3>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800">
                      <strong>Essai gratuit :</strong> 30 jours d'accès complet sans engagement
                    </p>
                  </div>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-3 text-slate-700">
                    <li><strong>Plan Starter :</strong> 15 000 FCFA/mois - Fonctionnalités de base</li>
                    <li><strong>Plan Professional :</strong> 25 000 FCFA/mois - Fonctionnalités avancées</li>
                    <li><strong>Plan Enterprise :</strong> 45 000 FCFA/mois - Solution complète</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Modalités de paiement</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
                    <li>Les paiements sont traités mensuellement ou annuellement selon votre choix</li>
                    <li>Les prix sont exprimés en FCFA, taxes comprises</li>
                    <li>Le paiement doit être effectué à l'avance pour la période souscrite</li>
                    <li>Les moyens de paiement acceptés : virement bancaire, Orange Money, Wave</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Renouvellement et résiliation</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
                    <li>L'abonnement se renouvelle automatiquement sauf résiliation</li>
                    <li>Vous pouvez résilier à tout moment avec un préavis de 30 jours</li>
                    <li>Aucun remboursement n'est accordé pour les périodes non utilisées</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Utilisation acceptable */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Ban className="w-6 h-6 text-green-600 mr-3" />
                Utilisation Acceptable
              </h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Utilisations autorisées</h3>
                  <ul className="list-disc list-inside space-y-1 text-green-700 text-sm">
                    <li>Gestion légitime de votre activité commerciale</li>
                    <li>Stockage de données métier conformes à la loi</li>
                    <li>Utilisation des fonctionnalités selon leur destination</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">Utilisations interdites</h3>
                  <ul className="list-disc list-inside space-y-1 text-red-700 text-sm">
                    <li>Activités illégales ou contraires aux bonnes mœurs</li>
                    <li>Violation des droits de propriété intellectuelle</li>
                    <li>Stockage de contenu malveillant ou dangereux</li>
                    <li>Tentatives de piratage ou d'accès non autorisé</li>
                    <li>Spam ou communications non sollicitées</li>
                    <li>Revente ou sous-location du Service sans autorisation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Propriété Intellectuelle</h2>
              <div className="space-y-4 text-slate-700">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Nos droits</h3>
                  <p>
                    G-Suite, incluant son code source, sa documentation, ses logos et ses marques, 
                    est la propriété exclusive de GrowHub Sénégal SARL. Tous droits réservés.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Vos droits</h3>
                  <p>
                    Vous conservez tous les droits sur vos données métier. Nous vous accordons une licence 
                    limitée d'utilisation du Service pendant la durée de votre abonnement.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Restrictions</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Vous ne pouvez pas copier, modifier ou redistribuer le Service</li>
                    <li>Vous ne pouvez pas effectuer d'ingénierie inverse</li>
                    <li>Vous ne pouvez pas utiliser nos marques sans autorisation écrite</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Limitations de responsabilité */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 text-green-600 mr-3" />
                Limitations de Responsabilité
              </h2>
              <div className="space-y-4 text-slate-700">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 font-medium">
                    ⚠️ Le Service est fourni "en l'état" sans garantie d'aucune sorte.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Exclusions de garantie</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Nous ne garantissons pas que le Service sera exempt d'erreurs</li>
                    <li>Nous ne garantissons pas une disponibilité de 100%</li>
                    <li>Nous ne sommes pas responsables de vos décisions métier basées sur nos données</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Limitation des dommages</h3>
                  <p>
                    Notre responsabilité totale envers vous ne peut excéder le montant payé 
                    pour le Service au cours des 12 derniers mois.
                  </p>
                </div>
              </div>
            </section>

            {/* Force majeure et résiliation */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Force Majeure et Résiliation</h2>
              <div className="space-y-4 text-slate-700">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Force majeure</h3>
                  <p>
                    Nous ne serons pas responsables des retards ou défaillances causés par des 
                    circonstances indépendantes de notre volonté (catastrophes naturelles, guerres, 
                    pannes d'infrastructure, etc.).
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Résiliation par vous</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Vous pouvez résilier à tout moment avec un préavis de 30 jours</li>
                    <li>Vos données restent accessibles pendant 30 jours après résiliation</li>
                    <li>Vous pouvez exporter vos données avant la résiliation</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Résiliation par nous</h3>
                  <p>
                    Nous pouvons résilier votre compte en cas de violation des CGU, 
                    de non-paiement ou d'usage abusif du Service.
                  </p>
                </div>
              </div>
            </section>

            {/* Droit applicable */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Droit Applicable et Juridiction</h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  Ces CGU sont régies par le droit sénégalais. Tout litige sera de la compétence 
                  exclusive des tribunaux de Dakar, Sénégal.
                </p>
                <p>
                  En cas de nullité d'une clause, les autres dispositions restent en vigueur.
                </p>
              </div>
            </section>

            {/* Modifications et contact */}
            <section className="bg-green-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Modifications et Contact</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Modifications des CGU</h3>
                  <p className="text-slate-700">
                    Nous nous réservons le droit de modifier ces CGU à tout moment. 
                    Les modifications importantes vous seront notifiées par email.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Contact</h3>
                  <div className="space-y-1 text-slate-700">
                    <div>Email : <a href="mailto:support@g-suite.com" className="text-green-600 hover:text-green-700">support@g-suite.com</a></div>
                    <div>Téléphone : +221 78 475 28 58</div>
                    <div>Adresse : GrowHub Sénégal SARL, Dakar, Sénégal</div>
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

export default TermsOfService;
