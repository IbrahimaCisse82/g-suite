
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Key,
  Building2,
  FileBarChart,
  ShoppingBag,
  Globe2,
  Settings,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import { ModuleMaintenanceManager } from './ModuleMaintenanceManager';
import { CompanyAccountsManager } from './CompanyAccountsManager';
import { AdminSidecar } from '../AdminSidecar';
import { AdminNotificationButton } from '../AdminNotificationButton';

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

// Aucune demande pour le moment - données réelles
const mockPendingRequests: PendingRequest[] = [];

export const BackofficeDashboard = () => {
  const [isSidecarOpen, setIsSidecarOpen] = useState(false);

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
    <>
      <div className="space-y-6">
        {/* En-tête du Dashboard avec bouton notification */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Dashboard Admin Backoffice
              </h1>
              <p className="text-gray-600">
                Gérez les demandes de licences, la maintenance des modules et supervisez l'activité du système
              </p>
            </div>
            <AdminNotificationButton onClick={() => setIsSidecarOpen(true)} />
          </div>
        </div>

        {/* Statistiques rapides */}
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
                  <p className="text-sm text-gray-600">Traitées aujourd'hui</p>
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
                  <p className="text-sm text-gray-600">Licences expirées</p>
                  <p className="text-2xl font-bold text-red-600">0</p>
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
                  <p className="text-2xl font-bold text-blue-600">0</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs pour les différentes sections */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Key className="w-4 h-4" />
              <span>Vue d'ensemble</span>
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Maintenance</span>
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Comptes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Demandes en cours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="w-5 h-5" />
                  <span>Demandes de Licence en Cours</span>
                  <Badge variant="outline" className="ml-2">
                    0 en attente
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-500 text-center py-8">
                    Aucune demande de licence en cours
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <ModuleMaintenanceManager />
          </TabsContent>

          <TabsContent value="accounts">
            <CompanyAccountsManager />
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidecar de notifications - rendu en dehors du conteneur principal */}
      <AdminSidecar 
        isOpen={isSidecarOpen}
        onClose={() => setIsSidecarOpen(false)}
      />
    </>
  );
};
