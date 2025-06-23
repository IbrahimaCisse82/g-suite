
import React from 'react';
import { AdminBackofficeLayout } from '@/components/admin/AdminBackofficeLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Shield, Users, Settings, Key } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const AdminBackofficeRoles = () => {
  const roles: any[] = [];

  return (
    <AdminBackofficeLayout>
      <div className="p-8">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Rôles & Permissions</h1>
          </div>
          <p className="text-gray-600">Gérez les rôles et permissions des utilisateurs du système</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Rôles</p>
                  <p className="text-2xl font-bold text-blue-600">{roles.length}</p>
                </div>
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Permissions Actives</p>
                  <p className="text-2xl font-bold text-green-600">0</p>
                </div>
                <Key className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Utilisateurs Assignés</p>
                  <p className="text-2xl font-bold text-purple-600">0</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rôles Personnalisés</p>
                  <p className="text-2xl font-bold text-orange-600">0</p>
                </div>
                <Settings className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gestion des Rôles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Fonctionnalité en cours de développement</p>
              <p className="text-sm text-gray-400">La gestion des rôles et permissions sera bientôt disponible</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminBackofficeLayout>
  );
};

export default AdminBackofficeRoles;
