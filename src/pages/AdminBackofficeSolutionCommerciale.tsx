import React from 'react';
import { AdminBackofficeLayout } from '@/components/admin/AdminBackofficeLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShoppingBag, Building2, User, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdminProtectedRoute } from '@/components/admin/AdminProtectedRoute';

const AdminBackofficeSolutionCommerciale = () => {
  const commercialeCompanies = [
    {
      id: '4',
      name: 'SA Commerce Général',
      admin: 'Marie Martin',
      email: 'marie@commercegeneral.sn',
      licenseExpiry: '2025-06-30',
      status: 'active',
      users: 12,
      createdAt: '2023-03-10'
    },
    {
      id: '5',
      name: 'Distribution Plus',
      admin: 'Jean Ndiaye',
      email: 'jean@distributionplus.sn',
      licenseExpiry: '2025-09-15',
      status: 'active',
      users: 7,
      createdAt: '2023-09-05'
    },
    {
      id: '6',
      name: 'Négoce International',
      admin: 'Aissatou Fall',
      email: 'aissatou@negoceintl.sn',
      licenseExpiry: '2025-04-20',
      status: 'active',
      users: 15,
      createdAt: '2023-12-01'
    }
  ];

  return (
    <AdminProtectedRoute>
      <AdminBackofficeLayout>
        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <ShoppingBag className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">Solution Commerciale</h1>
            </div>
            <p className="text-gray-600">Gestion des entreprises utilisant la solution commerciale</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Entreprises</p>
                    <p className="text-2xl font-bold text-green-600">{commercialeCompanies.length}</p>
                  </div>
                  <Building2 className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Licences Actives</p>
                    <p className="text-2xl font-bold text-green-600">
                      {commercialeCompanies.filter(c => c.status === 'active').length}
                    </p>
                  </div>
                  <ShoppingBag className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Licences Expirées</p>
                    <p className="text-2xl font-bold text-red-600">
                      {commercialeCompanies.filter(c => c.status === 'expired').length}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Utilisateurs</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {commercialeCompanies.reduce((sum, c) => sum + c.users, 0)}
                    </p>
                  </div>
                  <User className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Entreprises - Solution Commerciale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Entreprise</th>
                      <th className="text-left p-4">Administrateur</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Utilisateurs</th>
                      <th className="text-left p-4">Expiration Licence</th>
                      <th className="text-left p-4">Statut</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commercialeCompanies.map((company) => (
                      <tr key={company.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{company.name}</td>
                        <td className="p-4 text-gray-600">{company.admin}</td>
                        <td className="p-4 text-gray-600">{company.email}</td>
                        <td className="p-4">
                          <Badge variant="outline">{company.users} utilisateurs</Badge>
                        </td>
                        <td className="p-4">{new Date(company.licenseExpiry).toLocaleDateString('fr-FR')}</td>
                        <td className="p-4">
                          <Badge className={company.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {company.status === 'active' ? 'Active' : 'Expirée'}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Voir Détails</Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Renouveler
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminBackofficeLayout>
    </AdminProtectedRoute>
  );
};

export default AdminBackofficeSolutionCommerciale;
