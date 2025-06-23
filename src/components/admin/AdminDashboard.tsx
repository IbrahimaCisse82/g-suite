
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, CreditCard, Users, CheckCircle, XCircle, Clock } from 'lucide-react';

export const AdminDashboard = () => {
  // Données réelles - aucune demande d'accès pour le moment
  const accessRequests: any[] = [];
  const pendingRequests = accessRequests.filter(req => req.status === 'pending');
  const approvedRequests = accessRequests.filter(req => req.status === 'approved');

  const handleApprove = (requestId: string) => {
    console.log('Approving request:', requestId);
    // Ici vous pouvez ajouter la logique pour approuver la demande
  };

  const handleReject = (requestId: string) => {
    console.log('Rejecting request:', requestId);
    // Ici vous pouvez ajouter la logique pour rejeter la demande
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Panneau d'Administration G-Suite
        </h1>
        <p className="text-gray-600">
          Gérez les demandes d'accès aux licences et validez les comptes entreprises
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Demandes en attente</p>
                <p className="text-2xl font-bold text-orange-600">0</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Demandes approuvées</p>
                <p className="text-2xl font-bold text-green-600">0</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Entreprises</p>
                <p className="text-2xl font-bold text-blue-600">0</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Utilisateurs</p>
                <p className="text-2xl font-bold text-purple-600">0</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demandes d'accès en attente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-600" />
            Demandes d'accès en attente de validation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-500 text-center py-8">
              Aucune demande d'accès en attente
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Demandes approuvées récentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Demandes approuvées récemment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-gray-500 text-center py-8">
              Aucune demande approuvée récemment
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
