
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { Search, BookOpen, MessageCircle, Video, FileText, Users } from 'lucide-react';

const HelpCenter = () => {
  const categories = [
    {
      title: 'Premiers pas',
      icon: BookOpen,
      articles: [
        'Comment créer votre compte G-Suite',
        'Configuration initiale de votre entreprise',
        'Tour d\'horizon de l\'interface',
        'Inviter vos premiers utilisateurs'
      ]
    },
    {
      title: 'Facturation',
      icon: FileText,
      articles: [
        'Créer votre première facture',
        'Personnaliser vos modèles',
        'Gestion des paiements',
        'Relances automatiques'
      ]
    },
    {
      title: 'Gestion des stocks',
      icon: Users,
      articles: [
        'Ajouter vos produits',
        'Suivi des niveaux de stock',
        'Alertes de rupture',
        'Mouvements de stock'
      ]
    },
    {
      title: 'Rapports et analyses',
      icon: Video,
      articles: [
        'Comprendre votre tableau de bord',
        'Générer des rapports',
        'Analyses financières',
        'Exportation des données'
      ]
    }
  ];

  const faqs = [
    {
      question: 'Comment puis-je modifier mes informations d\'entreprise ?',
      answer: 'Rendez-vous dans Paramètres > Profil de l\'entreprise pour modifier toutes vos informations.'
    },
    {
      question: 'Puis-je personnaliser mes factures avec mon logo ?',
      answer: 'Oui, vous pouvez télécharger votre logo dans les paramètres et il apparaîtra automatiquement sur toutes vos factures.'
    },
    {
      question: 'Comment inviter de nouveaux utilisateurs ?',
      answer: 'Dans Paramètres > Utilisateurs, cliquez sur "Inviter un utilisateur" et saisissez l\'email de la personne.'
    },
    {
      question: 'Mes données sont-elles sauvegardées ?',
      answer: 'Oui, nous effectuons des sauvegardes quotidiennes de toutes vos données avec une rétention de 30 jours.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Centre d'Aide G-Suite
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions et apprenez à utiliser G-Suite efficacement
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher dans l'aide..."
              className="w-full pl-12 pr-4 py-4 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Parcourir par Catégorie
            </h2>
            <p className="text-xl text-slate-600">
              Explorez nos guides organisés par thème
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <category.icon className="w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <a href="#" className="text-slate-600 hover:text-green-600 transition-colors text-sm">
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <a href="#" className="text-green-600 font-medium text-sm hover:text-green-700">
                    Voir tous les articles →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-slate-600">
              Les réponses aux questions les plus courantes
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-green-50 rounded-2xl p-8 text-center">
            <MessageCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Besoin d'Aide Supplémentaire ?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Notre équipe support est là pour vous aider. Contactez-nous pour un accompagnement personnalisé.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Chat en Direct</h3>
                <p className="text-slate-600 text-sm mb-4">Disponible 9h-18h (GMT)</p>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Démarrer le chat
                </button>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <FileText className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Ticket de Support</h3>
                <p className="text-slate-600 text-sm mb-4">Réponse sous 24h</p>
                <a
                  href="/contact"
                  className="block w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  Créer un ticket
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <Video className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Formation Vidéo</h3>
                <p className="text-slate-600 text-sm mb-4">Sessions personnalisées</p>
                <a
                  href="/formation"
                  className="block w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  Programmer une session
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
