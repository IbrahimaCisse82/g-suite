
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Key,
  Building2,
  FileBarChart,
  ShoppingBag,
  Globe2
} from 'lucide-react';
import { toast } from 'sonner';

interface PendingRequest {
  id: string;
  companyName: string;
  requestedModule: 'comptabilite' | 'commerciale' | 'entreprise';
  requestType: 'new' | 'renewal' | 'upgrade';
  requestDate: string;
  adminName: string;
  adminEmail: string;
  message?: string;
}

const mockPendingRequests: PendingRequest[] = [
  {
    id: '1',
    companyName: 'SARL Nouvelle Entreprise',
    requestedModule: 'entreprise',
    requestType: 'new',
    requestDate: '2024-06-18',
    adminName: 'Pierre Ndour',
    adminEmail: 'pierre@nouvelle-entreprise.sn',
    message: 'Nous souhaitons activer le module entreprise complet'
  },
  {
    id: '2',
    companyName: 'SA Commerce Général',
    requestedModule: 'commerciale',
    requestType: 'renewal',
    requestDate: '2024-06-17',
    adminName: 'Marie Martin',
    adminEmail: 'marie@commerce.sn',
    message: 'Renouvellement de notre licence commerciale'
  },
  {
    id: '3',
    companyName: 'Cabinet Expert Compta',
    requestedModule: 'comptabilite',
    requestType: 'upgrade',
    requestDate: '2024-06-16',
    adminName: 'Ibrahima Sow',
    adminEmail: 'ibrahima@expert-compta.sn',
    message: 'Upgrade vers comptabilité avancée'
  }
];

export const BackofficeDashboard = () => {
  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'entreprise':
        return Globe2;
      case 'commerciale':
        return ShoppingBag;
      case 'comptabilite':
        return FileBarChart;
      default:
        return Key;
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

  const getRequestTypeBadge = (type: string) => {
    switch (type) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800">Nouvelle</Badge>;
      case 'renewal':
        return <Badge className="bg-orange-100 text-orange-800">Renouvellement</Badge>;
      case 'upgrade':
        return <Badge className="bg-purple-100 text-purple-800">Upgrade</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const handleApproveRequest = (request: PendingRequest) => {
    toast.success(`Demande de ${request.companyName} approuvée. Notification envoyée à ${request.adminName}.`);
  };

  const handleRejectRequest = (request: PendingRequest) => {
    toast.success(`Demande de ${request.companyName} rejetée.`);
  };

  return (
    <div className="space-y-6">
      {/* En-tête du Dashboard */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Dashboard Admin Backoffice
        </h1>
        <p className="text-gray-600">
          Gérez les demandes de licences et supervisez l'activité du système
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Demandes en attente</p>
                <p className="text-2xl font-bold text-orange-600">{mockPendingRequests.length}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Traitées aujourd'hui</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Licences expirées</p>
                <p className="text-2xl font-bold text-red-600">5</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Entreprises actives</p>
                <p className="text-2xl font-bold text-blue-600">142</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demandes en cours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>Demandes de Licence en Cours</span>
            <Badge variant="outline" className="ml-2">
              {mockPendingRequests.length} en attente
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPendingRequests.map((request) => {
              const ModuleIcon = getModuleIcon(request.requestedModule);
              
              return (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3">
                        <ModuleIcon className={`w-5 h-5 ${
                          request.requestedModule === 'entreprise' ? 'text-purple-600' :
                          request.requestedModule === 'commerciale' ? 'text-green-600' :
                          'text-blue-600'
                        }`} />
                        <h4 className="font-semibold text-gray-900">{request.companyName}</h4>
                        {getRequestTypeBadge(request.requestType)}
                        <Badge className={getModuleBadge(request.requestedModule)}>
                          {request.requestedModule.charAt(0).toUpperCase() + request.requestedModule.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Admin:</span>
                          <span className="ml-2 font-medium text-gray-900">{request.adminName}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Email:</span>
                          <span className="ml-2 text-gray-700">{request.adminEmail}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        Demandé le {new Date(request.requestDate).toLocaleDateString('fr-FR')}
                      </p>
                      
                      {request.message && (
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-sm italic text-gray-700">
                            "{request.message}"
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button
                        onClick={() => handleApproveRequest(request)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approuver
                      </Button>
                      <Button
                        onClick={() => handleRejectRequest(request)}
                        size="sm"
                        variant="destructive"
                      >
                        Rejeter
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
