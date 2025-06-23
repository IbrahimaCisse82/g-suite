
import React from 'react';
import { AdminBackofficeLayout } from '@/components/admin/AdminBackofficeLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, UserPlus, UserCheck, UserX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const AdminBackofficeUsers = () => {
  const users: any[] = [];

  return (
    <AdminBackofficeLayout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Utilisateurs</h1>
          <p className="text-gray-600">Gérez tous les utilisateurs administrateurs des entreprises</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Utilisateurs</p>
                  <p className="text-2xl font-bold text-blue-600">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Utilisateurs Actifs</p>
                  <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Utilisateurs Inactifs</p>
                  <p className="text-2xl font-bold text-red-600">{users.filter(u => u.status === 'inactive').length}</p>
                </div>
                <UserX className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Nouveaux ce mois</p>
                  <p className="text-2xl font-bold text-purple-600">0</p>
                </div>
                <UserPlus className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des Utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun utilisateur enregistré</p>
                <p className="text-sm text-gray-400">Les utilisateurs apparaîtront ici une fois qu'ils auront créé leur compte</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Nom</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Entreprise</th>
                      <th className="text-left p-4">Rôle</th>
                      <th className="text-left p-4">Statut</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{user.name}</td>
                        <td className="p-4 text-gray-600">{user.email}</td>
                        <td className="p-4">{user.company}</td>
                        <td className="p-4">
                          <Badge variant="outline">{user.role}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {user.status === 'active' ? 'Actif' : 'Inactif'}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Modifier</Button>
                            <Button size="sm" variant={user.status === 'active' ? 'destructive' : 'default'}>
                              {user.status === 'active' ? 'Désactiver' : 'Activer'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminBackofficeLayout>
  );
};

export default AdminBackofficeUsers;
