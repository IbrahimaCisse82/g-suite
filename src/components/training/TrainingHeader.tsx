
import React from 'react';
import { GraduationCap, BookOpen, Video, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const TrainingHeader = () => {
  return (
    <div className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Support de Formation
            <br />
            <span className="text-green-200">G-Suite</span>
          </h1>
          
          <p className="text-xl text-green-100 leading-relaxed">
            Maîtrisez tous les aspects de G-Suite avec nos guides détaillés, 
            tutoriels vidéo et documentation complète.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-4 text-green-200" />
                <h3 className="font-semibold text-lg mb-2">Guides Pratiques</h3>
                <p className="text-green-100 text-sm">
                  Instructions étape par étape pour chaque fonctionnalité
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Video className="w-8 h-8 mx-auto mb-4 text-green-200" />
                <h3 className="font-semibold text-lg mb-2">Tutoriels Vidéo</h3>
                <p className="text-green-100 text-sm">
                  Démonstrations visuelles des processus clés
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <HelpCircle className="w-8 h-8 mx-auto mb-4 text-green-200" />
                <h3 className="font-semibold text-lg mb-2">Support Direct</h3>
                <p className="text-green-100 text-sm">
                  Assistance personnalisée de nos experts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
