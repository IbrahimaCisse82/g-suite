
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Check } from 'lucide-react';

interface UserPermissionsProps {
  user: any;
}

const roleLabels = {
  manager: 'Manager',
  comptable: 'Comptable',
  commercial: 'Commercial',
  logistique: 'Logistique',
  caissier: 'Caissier'
};

const rolePermissions = {
  manager: [
    'Tableau de bord',
    'Comptabilité générale',
    'Clients & Fournisseurs',
    'Facturation',
    'Achats',
    'Produits',
    'Stock',
    'Trésorerie',
    'Rapports',
    'Analyse',
    'Budget',
    'Formation',
    'Paramètres'
  ],
  comptable: [
    'Comptabilité générale',
    'Trésorerie',
    'Budget',
    'Formation'
  ],
  commercial: [
    'Clients & Fournisseurs',
    'Facturation',
    'Achats',
    'Formation'
  ],
  logistique: [
    'Produits',
    'Stock',
    'Formation'
  ],
  caissier: [
    'Trésorerie',
    'Formation'
  ]
};

export const UserPermissions = ({ user }: UserPermissionsProps) => {
  const permissions = rolePermissions[user.role] || [];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Permissions et accès
        </h3>
        
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            En tant que <strong>{roleLabels[user.role]}</strong>, cet utilisateur a accès aux modules suivants :
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {permissions.map((permission, index) => (
              <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-green-50">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">{permission}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
