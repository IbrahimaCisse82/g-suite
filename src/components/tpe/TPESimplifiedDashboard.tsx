
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  Plus,
  Eye,
  Clock,
  Euro
} from 'lucide-react';

interface QuickAction {
  icon: React.ElementType;
  label: string;
  description: string;
  path: string;
  variant: 'primary' | 'secondary';
}

const quickActions: QuickAction[] = [
  {
    icon: Plus,
    label: 'Nouvelle facture',
    description: 'Créer une facture rapidement',
    path: '/invoicing',
    variant: 'primary'
  },
  {
    icon: Users,
    label: 'Ajouter un client',
    description: 'Enregistrer un nouveau contact',
    path: '/contacts',
    variant: 'secondary'
  },
  {
    icon: Eye,
    label: 'Voir mes ventes',
    description: 'Consulter le tableau de bord',
    path: '/reports',
    variant: 'secondary'
  }
];

export const TPESimplifiedDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Quick Stats - Simplified */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Recettes ce mois</p>
                <p className="text-2xl font-bold text-green-900">3 450€</p>
              </div>
              <Euro className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Factures en attente</p>
                <p className="text-2xl font-bold text-blue-900">5</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">Clients actifs</p>
                <p className="text-2xl font-bold text-purple-900">23</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Actions rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant={action.variant === 'primary' ? 'default' : 'outline'}
                  className="justify-start h-auto p-4"
                  onClick={() => {/* Navigation logic */}}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">{action.label}</div>
                    <div className="text-sm opacity-70">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Reminders */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-800">
            <AlertCircle className="w-5 h-5 mr-2" />
            À ne pas oublier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <div className="font-medium text-sm">Déclaration TVA</div>
                <div className="text-xs text-muted-foreground">Échéance le 20/12/2024</div>
              </div>
              <Badge variant="outline" className="text-orange-600 border-orange-300">
                Dans 5 jours
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <div className="font-medium text-sm">Relance Client ABC</div>
                <div className="text-xs text-muted-foreground">Facture en retard de 15 jours</div>
              </div>
              <Button size="sm" variant="outline">
                Relancer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity - Simplified */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-4 h-4 text-blue-600" />
              <div className="flex-1">
                <div className="text-sm font-medium">Facture F-2024-015 créée</div>
                <div className="text-xs text-muted-foreground">Client: Entreprise XYZ • 1 250€</div>
              </div>
              <div className="text-xs text-muted-foreground">Il y a 2h</div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Users className="w-4 h-4 text-green-600" />
              <div className="flex-1">
                <div className="text-sm font-medium">Nouveau client ajouté</div>
                <div className="text-xs text-muted-foreground">Restaurant Le Gourmet</div>
              </div>
              <div className="text-xs text-muted-foreground">Hier</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
