
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Building2, Users, Key, AlertTriangle } from 'lucide-react';

export const BackofficeStats = () => {
  const stats = [
    {
      title: 'Entreprises Total',
      value: '156',
      change: '+12 ce mois',
      icon: Building2,
      color: 'text-blue-600'
    },
    {
      title: 'Licences Actives',
      value: '142',
      change: '+8 ce mois',
      icon: Key,
      color: 'text-green-600'
    },
    {
      title: 'Utilisateurs Total',
      value: '1,247',
      change: '+34 ce mois',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Licences Expirées',
      value: '14',
      change: 'À renouveler',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
