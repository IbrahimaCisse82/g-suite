
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Users } from 'lucide-react';

interface SubscriptionPlanCardProps {
  plan: {
    id: string;
    name: string;
    price: number;
    duration_months: number;
    max_users: number;
    plan_type: string;
    features?: Record<string, any>;
  };
  onSelect: (planId: string) => void;
  isSelected?: boolean;
  currentPlan?: boolean;
}

export const SubscriptionPlanCard = ({ 
  plan, 
  onSelect, 
  isSelected = false,
  currentPlan = false 
}: SubscriptionPlanCardProps) => {
  const getSolutionTypeLabel = (planType: string, name: string) => {
    if (name.toLowerCase().includes('entreprise')) return 'Entreprise';
    if (name.toLowerCase().includes('comptab')) return 'Comptabilité';
    if (name.toLowerCase().includes('commercial')) return 'Commerciale';
    return planType;
  };

  const getSolutionColor = (name: string) => {
    if (name.toLowerCase().includes('entreprise')) return 'bg-purple-100 text-purple-800';
    if (name.toLowerCase().includes('comptab')) return 'bg-blue-100 text-blue-800';
    if (name.toLowerCase().includes('commercial')) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className={`relative ${isSelected ? 'border-green-500 ring-2 ring-green-200' : ''} ${currentPlan ? 'border-blue-500' : ''}`}>
      {currentPlan && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-blue-500 text-white">Plan Actuel</Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{plan.name}</CardTitle>
          <Badge className={getSolutionColor(plan.name)}>
            {getSolutionTypeLabel(plan.plan_type, plan.name)}
          </Badge>
        </div>
        
        <div className="text-2xl font-bold text-green-600">
          {plan.price.toLocaleString()} XOF
          <span className="text-sm font-normal text-muted-foreground">
            /{plan.duration_months} mois
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>Jusqu'à {plan.max_users} utilisateurs</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 mb-4">
          {plan.features && Object.entries(plan.features as Record<string, any>).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-sm">{key}: {String(value)}</span>
            </div>
          ))}
          
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="text-sm">Support technique inclus</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="text-sm">Mises à jour automatiques</span>
          </div>
        </div>
        
        {!currentPlan && (
          <Button 
            onClick={() => onSelect(plan.id)}
            className="w-full"
            variant={isSelected ? "default" : "outline"}
          >
            {isSelected ? 'Plan sélectionné' : 'Choisir ce plan'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
