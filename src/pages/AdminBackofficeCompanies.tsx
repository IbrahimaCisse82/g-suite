import React from 'react';
import { AdminBackofficeLayout } from '@/components/admin/AdminBackofficeLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Building2, FileBarChart, ShoppingBag, Globe2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdminProtectedRoute } from '@/components/admin/AdminProtectedRoute';

const AdminBackofficeCompanies = () => {
  const companies = [
    {
      id: '1',
      name: 'SARL Tech Solutions',
      admin: 'Jean Dupont',
      module: 'entreprise',
      licenseExpiry: '2025-12-31',
      status: 'active'
    },
    {
      id: '2',
      name: 'SA Commerce Général',
      admin: 'Marie Martin',
      module: 'commerciale',
      licenseExpiry: '2025-06-30',
      status: 'active'
    },
    {
      id: '3',
      name: 'Cabinet Comptable Expert',
      admin: 'Amadou Diallo',
      module: 'comptabilite',
      licenseExpiry: '2024-12-31',
      status: 'expired'
    },
  ];

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'entreprise': return Globe2;
      case 'commerciale': return ShoppingBag;
      case 'comptabilite': return FileBarChart;
      default: return Building2;
    }
  };

  const getModuleBadge = (module: string) => {
    const colors = {
      entreprise: 'bg-purple-100 text-purple-800',
      commerciale: 'bg-green-100 text-green-800',
      comptabilite: 'bg-blue-100 text-blue-800'
    };
    return colors[module as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <AdminProtectedRoute>
      <AdminBackofficeLayout>
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Entreprises</h1>
            <p className="text-gray-600">Gérez toutes les entreprises et leurs licences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Entreprises</p>
                    <p className="text-2xl font-bold text-blue-600">{companies.length}</p>
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
                    <p className="text-2xl font-bold text-green-600">{companies.filter(c => c.status === 'active').length}</p>
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
                    <p className="text-2xl font-bold text-red-600">{companies.filter(c => c.status === 'expired').length}</p>
                  </div>
                  <Globe2 className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Nouvelles ce mois</p>
                    <p className="text-2xl font-bold text-purple-600">5</p>
                  </div>
                  <ShoppingBag className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liste des Entreprises</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Entreprise</th>
                      <th className="text-left p-4">Administrateur</th>
                      <th className="text-left p-4">Module</th>
                      <th className="text-left p-4">Expiration Licence</th>
                      <th className="text-left p-4">Statut</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((company) => {
                      const ModuleIcon = getModuleIcon(company.module);
                      return (
                        <tr key={company.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium">{company.name}</td>
                          <td className="p-4 text-gray-600">{company.admin}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <ModuleIcon className="w-4 h-4" />
                              <Badge className={getModuleBadge(company.module)}>
                                {company.module.charAt(0).toUpperCase() + company.module.slice(1)}
                              </Badge>
                            </div>
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
                      );
                    })}
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

export default AdminBackofficeCompanies;
