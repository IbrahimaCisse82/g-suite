
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePaidAccountRequests } from '@/hooks/useSubscriptions';
import { Check, X, Clock, Users, CreditCard, TrendingUp } from 'lucide-react';
import { AdminNavigation } from './AdminNavigation';

export const AdminDashboard = () => {
  const { data: requests = [], isLoading } = usePaidAccountRequests();

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const approvedRequests = requests.filter(req => req.status === 'approved');
  const rejectedRequests = requests.filter(req => req.status === 'rejected');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300"><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-300"><Check className="w-3 h-3 mr-1" />Approuvée</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-300"><X className="w-3 h-3 mr-1" />Rejetée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-slate-50">
        <AdminNavigation />
        <div className="flex-1 p-8">
          <div className="text-slate-900">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminNavigation />
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Tableau de bord Administrateur</h1>
          <p className="text-slate-600">
            Gérez les demandes d'abonnements et supervisez la plateforme GrowHub
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-900">Demandes en attente</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{pendingRequests.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-900">Demandes approuvées</CardTitle>
              <Check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{approvedRequests.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-900">Demandes rejetées</CardTitle>
              <X className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{rejectedRequests.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-900">Total demandes</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{requests.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Requests */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Demandes récentes d'abonnements</CardTitle>
          </CardHeader>
          <CardContent>
            {requests.length === 0 ? (
              <p className="text-slate-600">Aucune demande d'abonnement pour le moment.</p>
            ) : (
              <div className="space-y-4">
                {requests.slice(0, 10).map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-white">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium text-slate-900">{request.profiles?.first_name} {request.profiles?.last_name}</p>
                          <p className="text-sm text-slate-600">
                            Plan: {request.subscription_plans?.name} - {request.subscription_plans?.price?.toLocaleString()} XOF
                          </p>
                          <p className="text-xs text-slate-500">
                            Demandé le {new Date(request.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      {request.request_message && (
                        <p className="text-sm mt-2 italic text-slate-700">"{request.request_message}"</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(request.status || 'pending')}
                      {request.status === 'pending' && (
                        <div className="space-x-2">
                          <Button size="sm" variant="outline" className="text-green-600 border-green-300 hover:bg-green-50">
                            <Check className="w-4 h-4 mr-1" />
                            Approuver
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                            <X className="w-4 h-4 mr-1" />
                            Rejeter
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
