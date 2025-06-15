
import React from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { Play, Clock, Users, CheckCircle, BookOpen, Video } from 'lucide-react';

const Formation = () => {
  const courses = [
    {
      title: 'Prise en main de G-Suite',
      duration: '2h',
      level: 'Débutant',
      participants: 156,
      description: 'Apprenez les bases de G-Suite et configurez votre première entreprise.',
      modules: ['Installation', 'Configuration initiale', 'Interface utilisateur', 'Premier paramétrage']
    },
    {
      title: 'Gestion avancée des stocks',
      duration: '3h',
      level: 'Intermédiaire',
      participants: 89,
      description: 'Maîtrisez tous les aspects de la gestion des stocks avec G-Suite.',
      modules: ['Inventaire', 'Mouvements de stock', 'Alertes', 'Optimisation']
    },
    {
      title: 'Facturation et comptabilité',
      duration: '4h',
      level: 'Avancé',
      participants: 124,
      description: 'Exploitez pleinement les fonctionnalités comptables de G-Suite.',
      modules: ['Facturation avancée', 'Rapports financiers', 'Analyses', 'Intégrations']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Formation G-Suite
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Développez vos compétences avec nos formations complètes et devenez un expert G-Suite. 
            Formations en ligne, en présentiel et personnalisées disponibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              <Play className="w-5 h-5 mr-2" />
              Commencer maintenant
            </button>
            <button className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors">
              <Video className="w-5 h-5 mr-2" />
              Voir la démo
            </button>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Nos Formations
            </h2>
            <p className="text-xl text-slate-600">
              Choisissez la formation adaptée à votre niveau et vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                    {course.level}
                  </span>
                  <div className="flex items-center text-slate-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">{course.title}</h3>
                <p className="text-slate-600 mb-4">{course.description}</p>
                
                <div className="space-y-2 mb-6">
                  {course.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span className="text-slate-600">{module}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-slate-500 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {course.participants} participants
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    S'inscrire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Methods */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Méthodes d'Apprentissage
            </h2>
            <p className="text-xl text-slate-600">
              Apprenez selon votre rythme et vos préférences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <Video className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Formation en Ligne</h3>
              <p className="text-slate-600 mb-6">
                Accédez à nos modules de formation à tout moment, depuis n'importe où. 
                Progressez à votre rythme avec notre plateforme interactive.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Accès 24/7</li>
                <li>• Certificat de completion</li>
                <li>• Support technique inclus</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Formation en Présentiel</h3>
              <p className="text-slate-600 mb-6">
                Participez à nos sessions de formation dans nos locaux à Dakar ou 
                demandez une formation sur site dans vos bureaux.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Interaction directe</li>
                <li>• Exercices pratiques</li>
                <li>• Adaptation au contexte</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Formation Personnalisée</h3>
              <p className="text-slate-600 mb-6">
                Formations sur mesure adaptées aux besoins spécifiques de votre entreprise 
                et de votre secteur d'activité.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Contenu personnalisé</li>
                <li>• Horaires flexibles</li>
                <li>• Suivi post-formation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à Commencer Votre Formation ?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Rejoignez des centaines d'entrepreneurs qui ont transformé leur entreprise avec G-Suite
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Demander un devis
            </a>
            <a
              href="/help-center"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              En savoir plus
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Formation;
