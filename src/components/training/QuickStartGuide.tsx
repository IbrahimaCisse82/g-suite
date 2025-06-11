
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickStartSteps = [
  {
    id: 1,
    title: 'Configuration initiale',
    description: 'Paramétrez votre entreprise et vos informations de base',
    duration: '10 min',
    route: '/settings',
    completed: false
  },
  {
    id: 2,
    title: 'Ajout des contacts',
    description: 'Créez votre liste de clients et fournisseurs',
    duration: '15 min',
    route: '/contacts',
    completed: false
  },
  {
    id: 3,
    title: 'Création du premier produit',
    description: 'Ajoutez vos produits et services au catalogue',
    duration: '10 min',
    route: '/products',
    completed: false
  },
  {
    id: 4,
    title: 'Première facture',
    description: 'Émettez votre première facture client',
    duration: '20 min',
    route: '/invoicing',
    completed: false
  }
];

export const QuickStartGuide = () => {
  return (
    <section id="quick-start">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span>Guide de Démarrage Rapide</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Suivez ces étapes essentielles pour commencer à utiliser G-Suite efficacement.
          </p>
          
          <div className="space-y-4">
            {quickStartSteps.map((step) => (
              <div
                key={step.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">
                    {step.id}
                  </div>
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {step.duration}
                  </div>
                  <Link to={step.route}>
                    <Button variant="outline" size="sm">
                      <span>Commencer</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
