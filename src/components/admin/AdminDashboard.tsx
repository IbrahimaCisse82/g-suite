
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, CreditCard, Users, CheckCircle, XCircle, Clock } from 'lucide-react';

export const AdminDashboard = () => {
  // Données mockées pour les demandes d'accès
  const accessRequests = [
    {
      id: '1',
      company: 'SARL Tech Solutions',
      admin: 'Jean Dupont',
      email: 'jean@techsolutions.fr',
      license: 'Solution Comptabilité',
      status: 'pending',
      requestDate: '2024-01-15',
      users: 5
    },
    {
      id: '2',
      company: 'SA Commerce Général',
      admin: 'Marie Martin',
      email: 'marie@commercegeneral.sn',
      license: 'Solution Commerciale',
      status: 'pending',
      requestDate: '2024-01-16',
      users: 12
    },
    {
      id: '3',
      company: 'Cabinet Comptable Expert',
      admin: 'Amadou Diallo',
      email: 'amadou@comptableexpert.sn',
      license: 'Solution Entreprise',
      status: 'approved',
      requestDate: '2024-01-10',
      users: 25
    }
  ];

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
                <p className="text-2xl font-bold text-orange-600">{pendingRequests.length}</p>
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
                <p className="text-2xl font-bold text-green-600">{approvedRequests.length}</p>
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
                <p className="text-2xl font-bold text-blue-600">{accessRequests.length}</p>
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
                <p className="text-2xl font-bold text-purple-600">
                  {accessRequests.reduce((sum, req) => sum + req.users, 0)}
                </p>
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
            {pendingRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">{request.company}</h3>
                      <Badge className="bg-orange-100 text-orange-800">
                        En attente
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p><strong>Administrateur:</strong> {request.admin}</p>
                        <p><strong>Email:</strong> {request.email}</p>
                      </div>
                      <div>
                        <p><strong>Licence demandée:</strong> {request.license}</p>
                        <p><strong>Nombre d'utilisateurs:</strong> {request.users}</p>
                        <p><strong>Date de demande:</strong> {new Date(request.requestDate).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleApprove(request.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approuver
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(request.id)}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Rejeter
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {pendingRequests.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                Aucune demande d'accès en attente
              </p>
            )}
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
            {approvedRequests.map((request) => (
              <div key={request.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-semibold">{request.company}</p>
                  <p className="text-sm text-gray-600">{request.license} - {request.users} utilisateurs</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  Approuvée
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
