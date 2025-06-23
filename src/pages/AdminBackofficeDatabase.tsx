
import React from 'react';
import { AdminBackofficeLayout } from '@/components/admin/AdminBackofficeLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Database, Server, HardDrive, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDatabaseStats } from '@/hooks/useDatabaseStats';
import { Skeleton } from '@/components/ui/skeleton';

const AdminBackofficeDatabase = () => {
  const { stats, isLoading } = useDatabaseStats();

  if (isLoading) {
    return (
      <AdminBackofficeLayout>
        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Database className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">Base de données</h1>
            </div>
            <p className="text-gray-600">Surveillance et gestion de la base de données système</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AdminBackofficeLayout>
    );
  }

  return (
    <AdminBackofficeLayout>
      <div className="p-8">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <Database className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Base de données</h1>
          </div>
          <p className="text-gray-600">Surveillance et gestion de la base de données système</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Statut</p>
                  <p className={`text-2xl font-bold ${stats.status === 'En ligne' ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.status}
                  </p>
                </div>
                <Server className={`w-8 h-8 ${stats.status === 'En ligne' ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Utilisation</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.usage}%</p>
                </div>
                <HardDrive className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Connexions</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.connectionCount}</p>
                </div>
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Dernière sauvegarde</p>
                  <p className={`text-2xl font-bold ${stats.lastBackup === 'OK' ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.lastBackup}
                  </p>
                </div>
                <Database className={`w-8 h-8 ${stats.lastBackup === 'OK' ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gestion de la base de données</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Outils de gestion de base de données</p>
              <p className="text-sm text-gray-400 mb-4">Surveillez et gérez votre base de données en temps réel</p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline">
                  Voir les logs
                </Button>
                <Button variant="outline">
                  Statistiques détaillées
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminBackofficeLayout>
  );
};

export default AdminBackofficeDatabase;
