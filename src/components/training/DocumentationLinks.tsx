
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Book, 
  HelpCircle, 
  Settings,
  Zap,
  Shield
} from 'lucide-react';

const documentationSections = [
  {
    icon: Book,
    title: 'Guide Utilisateur Complet',
    description: 'Documentation exhaustive de toutes les fonctionnalités de G-Suite.',
    type: 'PDF',
    size: '15 MB',
    color: 'bg-blue-100 text-blue-600',
    action: () => alert('Téléchargement du guide utilisateur...')
  },
  {
    icon: Zap,
    title: 'Guide de Démarrage Rapide',
    description: 'Les essentiels pour commencer à utiliser G-Suite en 30 minutes.',
    type: 'PDF',
    size: '3 MB',
    color: 'bg-green-100 text-green-600',
    action: () => alert('Téléchargement du guide de démarrage...')
  },
  {
    icon: Settings,
    title: 'Manuel de Configuration',
    description: 'Instructions détaillées pour paramétrer votre système.',
    type: 'PDF',
    size: '8 MB',
    color: 'bg-orange-100 text-orange-600',
    action: () => alert('Téléchargement du manuel de configuration...')
  },
  {
    icon: Shield,
    title: 'Guide de Sécurité',
    description: 'Bonnes pratiques pour sécuriser vos données et accès.',
    type: 'PDF',
    size: '5 MB',
    color: 'bg-red-100 text-red-600',
    action: () => alert('Téléchargement du guide de sécurité...')
  },
  {
    icon: HelpCircle,
    title: 'FAQ - Questions Fréquentes',
    description: 'Réponses aux questions les plus posées par nos utilisateurs.',
    type: 'Web',
    size: '-',
    color: 'bg-purple-100 text-purple-600',
    action: () => window.open('/training#support', '_self')
  },
  {
    icon: FileText,
    title: 'Notes de Version',
    description: 'Nouveautés et améliorations des dernières versions.',
    type: 'Web',
    size: '-',
    color: 'bg-teal-100 text-teal-600',
    action: () => alert('Consultation des notes de version...')
  }
];

const quickLinks = [
  { 
    title: 'Centre d\'aide en ligne', 
    icon: HelpCircle,
    action: () => window.open('/training#support', '_self')
  },
  { 
    title: 'Forum communautaire', 
    icon: ExternalLink,
    action: () => alert('Redirection vers le forum communautaire...')
  },
  { 
    title: 'Tutoriels interactifs', 
    icon: Book,
    action: () => window.open('/training#tutorials', '_self')
  },
  { 
    title: 'Raccourcis clavier', 
    icon: FileText,
    action: () => alert('Affichage des raccourcis clavier...')
  }
];

export const DocumentationLinks = () => {
  return (
    <section id="documentation">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Documentation</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Accédez à notre documentation complète, guides de référence et ressources téléchargeables.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Documentation principale */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documentationSections.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-12 h-12 rounded-lg ${doc.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-lg leading-tight">{doc.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {doc.type}
                          </span>
                          {doc.size !== '-' && (
                            <span className="text-xs text-muted-foreground">{doc.size}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm mb-4">{doc.description}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={doc.action}>
                        {doc.type === 'PDF' ? (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Consulter
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Liens rapides */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                <span>Liens Rapides</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={index}
                      onClick={link.action}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
                    >
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{link.title}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Besoin d'aide ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4">
                Notre équipe support est disponible pour vous accompagner.
              </p>
              <Button 
                className="w-full"
                onClick={() => window.open('/training#support', '_self')}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Contacter le support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
