
import React from 'react';
import { Video, Users, BookOpen } from 'lucide-react';

export const FormationMethods = () => {
  return (
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
  );
};
