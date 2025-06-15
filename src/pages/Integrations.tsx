
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { Zap, Database, Cloud, Smartphone, Globe, ArrowRight } from 'lucide-react';

const Integrations = () => {
  const integrations = [
    {
      category: 'Services bancaires',
      icon: Database,
      items: [
        { name: 'Orange Money', status: 'Disponible', logo: '🟠' },
        { name: 'Wave', status: 'Disponible', logo: '💙' },
        { name: 'Free Money', status: 'Bientôt', logo: '🔵' },
        { name: 'Banques locales', status: 'En développement', logo: '🏦' }
      ]
    },
    {
      category: 'Solutions Cloud',
      icon: Cloud,
      items: [
        { name: 'Google Drive', status: 'Disponible', logo: '📁' },
        { name: 'Dropbox', status: 'Disponible', logo: '📦' },
        { name: 'OneDrive', status: 'Bientôt', logo: '☁️' },
        { name: 'iCloud', status: 'Planifié', logo: '☁️' }
      ]
    },
    {
      category: 'Communication',
      icon: Smartphone,
      items: [
        { name: 'WhatsApp Business', status: 'Disponible', logo: '💬' },
        { name: 'SMS Gateway', status: 'Disponible', logo: '📱' },
        { name: 'Email Marketing', status: 'Bientôt', logo: '📧' },
        { name: 'Slack', status: 'Planifié', logo: '💬' }
      ]
    },
    {
      category: 'E-commerce',
      icon: Globe,
      items: [
        { name: 'Shopify', status: 'En développement', logo: '🛒' },
        { name: 'WooCommerce', status: 'Planifié', logo: '🛍️' },
        { name: 'Marketplace locales', status: 'Bientôt', logo: '🏪' },
        { name: 'APIs de paiement', status: 'Disponible', logo: '💳' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible':
        return 'bg-green-100 text-green-800';
      case 'Bientôt':
        return 'bg-yellow-100 text-yellow-800';
      case 'En développement':
        return 'bg-blue-100 text-blue-800';
      case 'Planifié':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Zap className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Intégrations G-Suite
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Connectez G-Suite avec vos outils favoris et services locaux. 
            Une écosystème complet pour maximiser votre productivité.
          </p>
        </div>
      </section>

      {/* Integrations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Écosystème d'Intégrations
            </h2>
            <p className="text-xl text-slate-600">
              Plus de 50 intégrations pour connecter tous vos outils de travail
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {integrations.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center space-x-3 mb-6">
                  <category.icon className="w-8 h-8 text-green-600" />
                  <h3 className="text-2xl font-bold text-slate-900">{category.category}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{item.logo}</span>
                        <span className="font-medium text-slate-800">{item.name}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                API Ouverte et Flexible
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                G-Suite propose une API REST complète qui permet aux développeurs 
                d'intégrer facilement nos fonctionnalités dans leurs applications existantes.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-slate-700">Documentation complète avec exemples</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-slate-700">SDKs disponibles en Python, PHP, JavaScript</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-slate-700">Webhooks pour les notifications temps réel</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-slate-700">Authentification OAuth 2.0</span>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="/product-documentation"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Consulter la documentation API
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="bg-slate-900 rounded-xl p-6 text-green-400 font-mono text-sm overflow-x-auto">
              <div className="mb-4 text-slate-400">// Exemple d'utilisation de l'API G-Suite</div>
              <div className="space-y-2">
                <div><span className="text-blue-400">import</span> GSuiteAPI <span className="text-blue-400">from</span> <span className="text-yellow-300">'gsuite-sdk'</span></div>
                <div></div>
                <div><span className="text-blue-400">const</span> api = <span className="text-blue-400">new</span> GSuiteAPI(<span className="text-yellow-300">'your-api-key'</span>)</div>
                <div></div>
                <div><span className="text-purple-400">// Créer une facture</span></div>
                <div><span className="text-blue-400">const</span> invoice = <span className="text-blue-400">await</span> api.invoices.create(&#123;</div>
                <div className="ml-4">client: <span className="text-yellow-300">'client-id'</span>,</div>
                <div className="ml-4">amount: <span className="text-orange-400">1500</span>,</div>
                <div className="ml-4">currency: <span className="text-yellow-300">'XOF'</span></div>
                <div>&#125;)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request Integration */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Besoin d'une Intégration Spécifique ?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Vous ne trouvez pas l'intégration dont vous avez besoin ? 
            Contactez-nous et nous l'ajouterons à notre roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Demander une intégration
            </a>
            <a
              href="/product-documentation"
              className="inline-flex items-center px-8 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
            >
              Guide développeur
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Integrations;
