
import React from 'react';
import { Clock, Users, CheckCircle } from 'lucide-react';

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

export const FormationCourses = () => {
  return (
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
  );
};
