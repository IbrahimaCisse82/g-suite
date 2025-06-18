
import React from 'react';
import { AdminBackofficeLayout } from '@/components/admin/AdminBackofficeLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileBarChart, Building2, User, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const AdminBackofficeSolutionComptabilite = () => {
  const comptabiliteCompanies = [
    {
      id: '1',
      name: 'Cabinet Comptable Expert',
      admin: 'Amadou Diallo',
      email: 'amadou@comptableexpert.sn',
      licenseExpiry: '2024-12-31',
      status: 'expired',
      users: 5,
      createdAt: '2023-06-15'
    },
    {
      id: '2',
      name: 'Expertise Compta Plus',
      admin: 'Fatou Sall',
      email: 'fatou@comptaplus.sn',
      licenseExpiry: '2025-08-30',
      status: 'active',
      users: 8,
      createdAt: '2023-08-20'
    },
    {
      id: '3',
      name: 'Compta Services',
      admin: 'Omar Ba',
      email: 'omar@comptaservices.sn',
      licenseExpiry: '2025-11-15',
      status: 'active',
      users: 3,
      createdAt: '2024-01-10'
    }
  ];

  return (
    <AdminBackofficeLayout>
      <div className="p-8">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <FileBarChart className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Solution Comptabilité</h1>
          </div>
          <p className="text-gray-600">Gestion des entreprises utilisant la solution comptabilité</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Entreprises</p>
                  <p className="text-2xl font-bold text-blue-600">{comptabiliteCompanies.length}</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Licences Actives</p>
                  <p className="text-2xl font-bold text-green-600">
                    {comptabiliteCompanies.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <FileBarChart className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Licences Expirées</p>
                  <p className="text-2xl font-bold text-red-600">
                    {comptabiliteCompanies.filter(c => c.status === 'expired').length}
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
                    {comptabiliteCompanies.reduce((sum, c) => sum + c.users, 0)}
                  </p>
                </div>
                <User className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Entreprises - Solution Comptabilité</CardTitle>
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
                  {comptabiliteCompanies.map((company) => (
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
  );
};

export default AdminBackofficeSolutionComptabilite;
