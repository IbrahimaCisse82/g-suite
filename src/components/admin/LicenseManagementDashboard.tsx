
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePaidAccountRequests } from '@/hooks/useSubscriptions';
import { Check, X, Clock, Users, CreditCard, TrendingUp, Building2 } from 'lucide-react';

export const LicenseManagementDashboard = () => {
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

  const getLicenseTypeBadge = (planName: string) => {
    if (planName?.toLowerCase().includes('demo')) {
      return <Badge variant="outline" className="text-blue-600 border-blue-300">Demo</Badge>;
    } else if (planName?.toLowerCase().includes('professionnel')) {
      return <Badge variant="outline" className="text-purple-600 border-purple-300">Professionnel</Badge>;
    } else if (planName?.toLowerCase().includes('entreprise')) {
      return <Badge variant="outline" className="text-orange-600 border-orange-300">Entreprise</Badge>;
    }
    return <Badge variant="outline">{planName}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="text-slate-900">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestion des Licences G-Suite</h1>
        <p className="text-slate-600">
          Administration des licences Demo, Professionnel et Entreprise
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
            <p className="text-xs text-slate-500">Nécessitent une action</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-900">Licences actives</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{approvedRequests.length}</div>
            <p className="text-xs text-slate-500">Entreprises avec licence</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-900">Demandes rejetées</CardTitle>
            <X className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{rejectedRequests.length}</div>
            <p className="text-xs text-slate-500">Non approuvées</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-900">Total demandes</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{requests.length}</div>
            <p className="text-xs text-slate-500">Toutes catégories</p>
          </CardContent>
        </Card>
      </div>

      {/* License Requests Management */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900 flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            Gestion des Demandes de Licences
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-8">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">Aucune demande de licence pour le moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.slice(0, 10).map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-white">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-slate-900">
                            {request.profiles?.first_name} {request.profiles?.last_name}
                          </p>
                          {getLicenseTypeBadge(request.subscription_plans?.name || 'Plan non défini')}
                        </div>
                        <p className="text-sm text-slate-600">
                          Plan: {request.subscription_plans?.name || 'Plan non défini'} - {request.subscription_plans?.price ? `${request.subscription_plans.price.toLocaleString()} XOF` : 'Prix non défini'}
                        </p>
                        <p className="text-xs text-slate-500">
                          Demandé le {new Date(request.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    {request.request_message && (
                      <p className="text-sm mt-2 italic text-slate-700 bg-slate-50 p-2 rounded">
                        "{request.request_message}"
                      </p>
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
  );
};
