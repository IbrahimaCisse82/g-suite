
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { Shield, Lock, Eye, Server, Key, CheckCircle } from 'lucide-react';

const Security = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Sécurité et Confidentialité
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Votre confiance est notre priorité. G-Suite utilise les technologies de sécurité 
            les plus avancées pour protéger vos données d'entreprise.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Protection Multi-Niveaux
            </h2>
            <p className="text-xl text-slate-600">
              Une sécurité pensée à tous les niveaux de votre application
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-slate-900">Chiffrement SSL/TLS</h3>
              </div>
              <p className="text-slate-600">
                Toutes les communications entre votre navigateur et nos serveurs sont 
                chiffrées avec les derniers standards SSL/TLS 1.3.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-4">
                <Key className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-slate-900">Authentification 2FA</h3>
              </div>
              <p className="text-slate-600">
                Authentification à deux facteurs disponible pour renforcer la sécurité 
                de vos comptes utilisateurs.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-4">
                <Server className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-slate-900">Hébergement Sécurisé</h3>
              </div>
              <p className="text-slate-600">
                Infrastructure hébergée sur des serveurs sécurisés avec surveillance 
                24/7 et sauvegardes automatiques.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-slate-900">Audit et Monitoring</h3>
              </div>
              <p className="text-slate-600">
                Surveillance continue des accès et des activités avec des logs 
                détaillés pour détecter toute activité suspecte.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-slate-900">Protection DDoS</h3>
              </div>
              <p className="text-slate-600">
                Protection avancée contre les attaques DDoS et autres menaces 
                de sécurité réseau.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-slate-900">Conformité RGPD</h3>
              </div>
              <p className="text-slate-600">
                Respect total du Règlement Général sur la Protection des Données 
                et des lois locales sur la protection des données.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Protection de Vos Données
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">
                    <strong>Chiffrement au repos :</strong> Toutes vos données sont chiffrées 
                    dans nos bases de données avec des algorithmes AES-256.
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">
                    <strong>Sauvegardes quotidiennes :</strong> Vos données sont sauvegardées 
                    automatiquement chaque jour avec rétention sur 30 jours.
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">
                    <strong>Géolocalisation :</strong> Vos données restent sur le territoire 
                    africain pour respecter la souveraineté numérique.
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">
                    <strong>Accès contrôlé :</strong> Seuls les administrateurs autorisés 
                    peuvent accéder aux serveurs avec authentification renforcée.
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Nos Certifications</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600" />
                  <span className="font-medium text-slate-800">ISO 27001 (en cours)</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="font-medium text-slate-800">Conformité RGPD</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <Lock className="w-6 h-6 text-green-600" />
                  <span className="font-medium text-slate-800">SOC 2 Type II (en cours)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Center */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Centre de Confiance
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Transparence totale sur nos pratiques de sécurité et de confidentialité
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Contacter notre équipe sécurité
            </a>
            <a
              href="/product-documentation"
              className="inline-flex items-center px-8 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
            >
              Documentation sécurité
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Security;
