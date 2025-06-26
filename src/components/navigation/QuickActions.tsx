
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  FileText, 
  Users, 
  Package, 
  Calculator,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Nouvelle Facture',
      description: 'Créer une facture client',
      icon: FileText,
      action: () => navigate('/invoicing'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Nouveau Contact',
      description: 'Ajouter un client/fournisseur',
      icon: Users,
      action: () => navigate('/contacts'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Nouveau Produit',
      description: 'Ajouter un produit/service',
      icon: Package,
      action: () => navigate('/products'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Journal Comptable',
      description: 'Voir les écritures',
      icon: Calculator,
      action: () => navigate('/journal-comptable'),
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Tableau de Bord',
      description: 'Vue d\'ensemble',
      icon: TrendingUp,
      action: () => navigate('/dashboard'),
      color: 'bg-cyan-500 hover:bg-cyan-600'
    },
    {
      title: 'Aide TPE',
      description: 'Guides et assistance',
      icon: HelpCircle,
      action: () => navigate('/tpe-assistant'),
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className={`h-auto p-4 flex flex-col items-center space-y-2 ${action.color} text-white border-none`}
              onClick={action.action}
            >
              <action.icon className="w-6 h-6" />
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs opacity-90">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
