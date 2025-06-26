
import React from 'react';
import { AdminBackofficeLayout } from '@/components/admin/AdminBackofficeLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { AdminProtectedRoute } from '@/components/admin/AdminProtectedRoute';

const AdminBackofficeStats = () => {
  return (
    <AdminProtectedRoute>
      <AdminBackofficeLayout>
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Statistiques</h1>
            <p className="text-gray-600">Analysez les performances et l'utilisation du système</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-6 h-6" />
                <span>Statistiques du système</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune donnée disponible</h3>
                <p className="text-gray-500">Les statistiques seront affichées ici une fois configurées</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminBackofficeLayout>
    </AdminProtectedRoute>
  );
};

export default AdminBackofficeStats;
