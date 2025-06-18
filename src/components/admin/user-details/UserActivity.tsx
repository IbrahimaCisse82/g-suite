
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface UserActivityProps {
  user: any;
}

export const UserActivity = ({ user }: UserActivityProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Activité récente
        </h3>
        
        <div className="space-y-3">
          <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
            <p className="text-sm font-medium text-gray-900">Création du compte</p>
            <p className="text-sm text-gray-600">
              {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          {user.lastLogin && (
            <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
              <p className="text-sm font-medium text-gray-900">Dernière connexion</p>
              <p className="text-sm text-gray-600">
                {new Date(user.lastLogin).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
