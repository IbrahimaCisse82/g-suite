
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ReportsAlertsSection = () => {
  const alerts = [
    {
      id: 'overdue-invoices',
      title: 'Factures en retard',
      description: '5 factures en attente de paiement',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      titleColor: 'text-yellow-800',
      descColor: 'text-yellow-600'
    },
    {
      id: 'vat-declaration',
      title: 'Déclaration TVA',
      description: 'À déposer avant le 20/06',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      titleColor: 'text-blue-800',
      descColor: 'text-blue-600'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className={`p-3 ${alert.bgColor} border ${alert.borderColor} rounded-lg`}>
            <p className={`text-sm font-medium ${alert.titleColor}`}>{alert.title}</p>
            <p className={`text-xs ${alert.descColor}`}>{alert.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
