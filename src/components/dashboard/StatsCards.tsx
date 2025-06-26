
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, FileText, Package, Users } from 'lucide-react';

const mockStats = [
  {
    title: 'Chiffre d\'affaires',
    value: '0 XOF',
    change: '0%',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Factures en attente',
    value: '0',
    change: '0',
    icon: FileText,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    title: 'Produits en stock',
    value: '0',
    change: '0',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Clients actifs',
    value: '0',
    change: '0',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {mockStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-0 shadow-lg card-hover bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">{stat.title}</CardTitle>
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <p className="text-sm text-slate-600">
                <span className="text-slate-500 font-medium">
                  {stat.change}
                </span>
                {' '}par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
