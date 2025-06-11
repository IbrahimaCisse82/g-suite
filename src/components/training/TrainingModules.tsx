
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  Users, 
  FileText, 
  ShoppingCart, 
  Package, 
  Warehouse,
  CreditCard,
  PieChart,
  BookOpen,
  ExternalLink
} from 'lucide-react';

const trainingModules = [
  {
    icon: Calculator,
    title: 'Comptabilité Générale',
    description: 'Apprenez à gérer votre plan comptable, saisir les écritures et générer vos états financiers.',
    level: 'Intermédiaire',
    duration: '2h',
    topics: ['Plan comptable', 'Saisie d\'écritures', 'Balance', 'Bilan'],
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Users,
    title: 'Gestion des Contacts',
    description: 'Maîtrisez la création et la gestion de vos clients et fournisseurs.',
    level: 'Débutant',
    duration: '45min',
    topics: ['Ajout de contacts', 'Classification', 'Suivi des relations'],
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: FileText,
    title: 'Facturation',
    description: 'Créez, personnalisez et envoyez vos factures professionnelles.',
    level: 'Débutant',
    duration: '1h',
    topics: ['Création de factures', 'Devis', 'Suivi des paiements'],
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: ShoppingCart,
    title: 'Gestion des Achats',
    description: 'Optimisez votre processus d\'achat et de gestion des fournisseurs.',
    level: 'Intermédiaire',
    duration: '1h30',
    topics: ['Bons de commande', 'Réception', 'Contrôle factures'],
    color: 'bg-orange-100 text-orange-600'
  },
  {
    icon: Package,
    title: 'Catalogue Produits',
    description: 'Structurez votre catalogue avec catégories, prix et descriptions.',
    level: 'Débutant',
    duration: '1h',
    topics: ['Catégories', 'Fiches produits', 'Tarification'],
    color: 'bg-teal-100 text-teal-600'
  },
  {
    icon: Warehouse,
    title: 'Gestion de Stock',
    description: 'Suivez vos stocks, mouvements et optimisez vos approvisionnements.',
    level: 'Avancé',
    duration: '2h30',
    topics: ['Inventaire', 'Mouvements', 'Alertes stock', 'Valorisation'],
    color: 'bg-red-100 text-red-600'
  },
  {
    icon: CreditCard,
    title: 'Trésorerie',
    description: 'Gérez vos flux de trésorerie et suivez votre situation financière.',
    level: 'Intermédiaire',
    duration: '1h45',
    topics: ['Encaissements', 'Décaissements', 'Rapprochement bancaire'],
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    icon: PieChart,
    title: 'Rapports et Analyses',
    description: 'Générez des rapports personnalisés pour piloter votre activité.',
    level: 'Avancé',
    duration: '2h',
    topics: ['Tableaux de bord', 'Rapports financiers', 'Analyses'],
    color: 'bg-yellow-100 text-yellow-600'
  }
];

export const TrainingModules = () => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="modules">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Modules de Formation</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Découvrez nos modules de formation organisés par fonctionnalité. 
          Chaque module contient des guides détaillés et des exercices pratiques.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainingModules.map((module, index) => {
          const Icon = module.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className={getLevelColor(module.level)}>
                          {module.level}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{module.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{module.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Sujets couverts :</h4>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic, topicIndex) => (
                      <Badge key={topicIndex} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Accéder au module
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
