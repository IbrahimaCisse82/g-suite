
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Users, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UserLimitIndicatorProps {
  currentUsers: number;
  maxUsers: number;
  planName: string;
}

export const UserLimitIndicator = ({ 
  currentUsers, 
  maxUsers, 
  planName 
}: UserLimitIndicatorProps) => {
  const usagePercentage = (currentUsers / maxUsers) * 100;
  const isNearLimit = usagePercentage >= 80;
  const isAtLimit = currentUsers >= maxUsers;

  const getBadgeVariant = () => {
    if (isAtLimit) return 'destructive';
    if (isNearLimit) return 'secondary';
    return 'outline';
  };

  const getBadgeColor = () => {
    if (isAtLimit) return 'bg-red-100 text-red-800 border-red-300';
    if (isNearLimit) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-green-100 text-green-800 border-green-300';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">Utilisateurs</span>
        </div>
        
        <Badge className={getBadgeColor()}>
          {currentUsers} / {maxUsers}
        </Badge>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            isAtLimit ? 'bg-red-500' : 
            isNearLimit ? 'bg-yellow-500' : 
            'bg-green-500'
          }`}
          style={{ width: `${Math.min(usagePercentage, 100)}%` }}
        />
      </div>
      
      {isAtLimit && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Vous avez atteint la limite maximale d'utilisateurs pour votre plan {planName}. 
            Contactez votre administrateur pour mettre à jour votre abonnement.
          </AlertDescription>
        </Alert>
      )}
      
      {isNearLimit && !isAtLimit && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            Vous approchez de la limite d'utilisateurs de votre plan {planName}. 
            Considérez une mise à jour de votre abonnement.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
