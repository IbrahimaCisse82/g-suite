
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Eye } from 'lucide-react';

const videoTutorials = [
  {
    id: 1,
    title: 'Prise en main de G-Suite',
    description: 'Découvrez l\'interface et les fonctionnalités principales de G-Suite en 10 minutes.',
    duration: '10:30',
    views: '1.2k',
    level: 'Débutant',
    thumbnail: 'photo-1488590528505-98d2b5aba04b'
  },
  {
    id: 2,
    title: 'Créer votre première facture',
    description: 'Guide complet pour émettre une facture de A à Z avec personnalisation.',
    duration: '15:45',
    views: '856',
    level: 'Débutant',
    thumbnail: 'photo-1461749280684-dccba630e2f6'
  },
  {
    id: 3,
    title: 'Configuration du plan comptable',
    description: 'Paramétrez votre plan comptable selon les normes de votre pays.',
    duration: '22:15',
    views: '634',
    level: 'Intermédiaire',
    thumbnail: 'photo-1486312338219-ce68d2c6f44d'
  },
  {
    id: 4,
    title: 'Gestion avancée des stocks',
    description: 'Maîtrisez les mouvements de stock, inventaires et valorisation.',
    duration: '28:20',
    views: '423',
    level: 'Avancé',
    thumbnail: 'photo-1581091226825-a6a2a5aee158'
  },
  {
    id: 5,
    title: 'Rapports financiers personnalisés',
    description: 'Créez des tableaux de bord et rapports adaptés à vos besoins.',
    duration: '18:50',
    views: '567',
    level: 'Avancé',
    thumbnail: 'photo-1498050108023-c5249f4df085'
  },
  {
    id: 6,
    title: 'Intégration bancaire et rapprochement',
    description: 'Automatisez vos rapprochements bancaires et import de relevés.',
    duration: '25:30',
    views: '398',
    level: 'Intermédiaire',
    thumbnail: 'photo-1519389950473-47ba0277781c'
  }
];

export const VideoTutorials = () => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="videos">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Tutoriels Vidéo</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Apprenez visuellement avec nos tutoriels vidéo détaillés. 
          Chaque vidéo vous guide pas à pas dans l'utilisation des fonctionnalités.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoTutorials.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={`https://images.unsplash.com/${video.thumbnail}?w=400&h=225&fit=crop`}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button size="lg" className="rounded-full">
                  <Play className="w-6 h-6" />
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg leading-tight">{video.title}</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getLevelColor(video.level)}>
                  {video.level}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye className="w-4 h-4 mr-1" />
                  {video.views}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm mb-4">{video.description}</p>
              <Button className="w-full" variant="outline">
                <Play className="w-4 h-4 mr-2" />
                Regarder la vidéo
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
