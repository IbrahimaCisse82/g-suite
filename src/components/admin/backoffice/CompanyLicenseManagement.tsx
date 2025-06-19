import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, 
  User, 
  Calendar, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Key
} from 'lucide-react';
import { toast } from 'sonner';

interface CompanyLicense {
  id: string;
  companyName: string;
  adminName: string;
  adminEmail: string;
  activeModule: 'comptabilite' | 'commerciale' | 'entreprise';
  licenseExpiry: string;
  status: 'active' | 'expired' | 'suspended';
  createdAt: string;
}

interface LicenseRequest {
  id: string;
  companyName: string;
  requestedModule: string;
  requestType: 'new' | 'renewal' | 'upgrade';
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  isAutomatic?: boolean;
}

const mockCompanies: CompanyLicense[] = [
  {
    id: '1',
    companyName: 'SARL Tech Solutions',
    adminName: 'Jean Dupont',
    adminEmail: 'admin@techsolutions.com',
    activeModule: 'entreprise',
    licenseExpiry: '2024-12-31',
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    companyName: 'SA Commerce Général',
    adminName: 'Marie Martin',
    adminEmail: 'marie@commerce.sn',
    activeModule: 'commerciale',
    licenseExpiry: '2024-08-15',
    status: 'expired',
    createdAt: '2023-08-15'
  },
  {
    id: '3',
    companyName: 'Cabinet Comptable Expert',
    adminName: 'Amadou Diallo',
    adminEmail: 'amadou@expert-compta.sn',
    activeModule: 'comptabilite',
    licenseExpiry: '2025-03-20',
    status: 'active',
    createdAt: '2024-03-20'
  }
];

const mockRequests: LicenseRequest[] = [
  {
    id: '1',
    companyName: 'SARL Nouvelle Entreprise',
    requestedModule: 'entreprise',
    requestType: 'new',
    requestDate: '2024-06-18',
    status: 'pending',
    message: 'Nous souhaitons activer le module entreprise complet'
  },
  {
    id: '2',
    companyName: 'SA Commerce Général',
    requestedModule: 'commerciale',
    requestType: 'renewal',
    requestDate: '2024-06-17',
    status: 'pending',
    message: '[AUTOMATIQUE] Renouvellement automatique - Licence expire le 15/08/2024',
    isAutomatic: true
  },
  {
    id: '3',
    companyName: 'Cabinet Comptable Expert',
    requestedModule: 'entreprise',
    requestType: 'upgrade',
    requestDate: '2024-06-16',
    status: 'pending',
    message: '[UPGRADE] Demande d\'upgrade depuis Comptabilité vers Gestion d\'Entreprise pour accéder aux fonctionnalités avancées'
  }
];

export const CompanyLicenseManagement = () => {
  const [companies, setCompanies] = useState<CompanyLicense[]>(mockCompanies);
  const [requests, setRequests] = useState<LicenseRequest[]>(mockRequests);
  const [selectedCompany, setSelectedCompany] = useState<CompanyLicense | null>(null);
  const [renewalDuration, setRenewalDuration] = useState('12');
  const [isRenewalDialogOpen, setIsRenewalDialogOpen] = useState(false);

  const getModuleBadge = (module: string) => {
    const colors = {
      entreprise: 'bg-purple-100 text-purple-800',
      commerciale: 'bg-green-100 text-green-800',
      comptabilite: 'bg-blue-100 text-blue-800'
    };
    return colors[module as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Actif</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />Expiré</Badge>;
      case 'suspended':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Suspendu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRequestTypeBadge = (type: string, isAutomatic?: boolean) => {
    switch (type) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800">Nouvelle</Badge>;
      case 'renewal':
        return (
          <Badge className={`${isAutomatic ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {isAutomatic ? 'Renouvellement Auto' : 'Renouvellement'}
          </Badge>
        );
      case 'upgrade':
        return <Badge className="bg-purple-100 text-purple-800">Upgrade</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getRequestPriorityColor = (type: string, isAutomatic?: boolean) => {
    if (type === 'renewal' && isAutomatic) {
      return 'border-l-4 border-l-orange-400';
    }
    if (type === 'upgrade') {
      return 'border-l-4 border-l-purple-400';
    }
    return 'border-l-4 border-l-blue-400';
  };

  const handleRenewalSubmit = () => {
    if (!selectedCompany) return;

    const newExpiryDate = new Date();
    newExpiryDate.setMonth(newExpiryDate.getMonth() + parseInt(renewalDuration));

    setCompanies(companies.map(company => 
      company.id === selectedCompany.id 
        ? { 
            ...company, 
            licenseExpiry: newExpiryDate.toISOString().split('T')[0],
            status: 'active' as const
          }
        : company
    ));

    toast.success(`Licence réactivée pour ${selectedCompany.companyName} jusqu'au ${newExpiryDate.toLocaleDateString('fr-FR')}`);
    setIsRenewalDialogOpen(false);
    setSelectedCompany(null);
    setRenewalDuration('12');
  };

  const handleApproveRequest = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    setRequests(requests.map(r => 
      r.id === requestId ? { ...r, status: 'approved' as const } : r
    ));

    toast.success(`Demande de ${request.companyName} approuvée. Notification envoyée à l'admin.`);
  };

  const handleRejectRequest = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    setRequests(requests.map(r => 
      r.id === requestId ? { ...r, status: 'rejected' as const } : r
    ));

    toast.success(`Demande de ${request.companyName} rejetée.`);
  };

  return (
    <div className="space-y-8">
      {/* Gestion des Entreprises */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <span>Gestion des Entreprises et Licences</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {companies.map((company) => (
              <div key={company.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-lg">{company.companyName}</h3>
                      {getStatusBadge(company.status)}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{company.adminName} ({company.adminEmail})</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getModuleBadge(company.activeModule)}>
                        <Key className="w-3 h-3 mr-1" />
                        {company.activeModule.charAt(0).toUpperCase() + company.activeModule.slice(1)}
                      </Badge>
                      <div className="flex items-center space-x-1 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Expire le {new Date(company.licenseExpiry).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedCompany(company);
                      setIsRenewalDialogOpen(true);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Réactiver
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Demandes de Clé Licence - Enhanced */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>Demandes de Clé Licence</span>
            <div className="flex space-x-2 ml-4">
              <Badge variant="outline" className="text-blue-600">
                {requests.filter(r => r.requestType === 'new' && r.status === 'pending').length} Nouvelles
              </Badge>
              <Badge variant="outline" className="text-orange-600">
                {requests.filter(r => r.requestType === 'renewal' && r.status === 'pending').length} Renouvellements
              </Badge>
              <Badge variant="outline" className="text-purple-600">
                {requests.filter(r => r.requestType === 'upgrade' && r.status === 'pending').length} Upgrades
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className={`border rounded-lg p-4 ${getRequestPriorityColor(request.requestType, request.isAutomatic)}`}>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium">{request.companyName}</h4>
                      {getRequestTypeBadge(request.requestType, request.isAutomatic)}
                      <Badge className={getModuleBadge(request.requestedModule)}>
                        {request.requestedModule}
                      </Badge>
                      {request.isAutomatic && (
                        <Badge variant="outline" className="text-xs bg-gray-100">
                          <Clock className="w-3 h-3 mr-1" />
                          Automatique
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Demandé le {new Date(request.requestDate).toLocaleDateString('fr-FR')}
                    </p>
                    {request.message && (
                      <div className={`text-sm p-2 rounded ${
                        request.isAutomatic 
                          ? 'bg-orange-50 border border-orange-200 text-orange-800' 
                          : 'bg-gray-50 italic'
                      }`}>
                        "{request.message}"
                      </div>
                    )}
                    
                    {/* Informations spécifiques selon le type */}
                    {request.requestType === 'renewal' && (
                      <div className="flex items-center space-x-2 text-sm">
                        <RefreshCw className="w-4 h-4 text-orange-500" />
                        <span className="text-orange-700">
                          {request.isAutomatic ? 'Détecté automatiquement' : 'Demandé manuellement'}
                        </span>
                      </div>
                    )}
                    
                    {request.requestType === 'upgrade' && (
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-purple-500" />
                        <span className="text-purple-700">Upgrade vers plan supérieur</span>
                      </div>
                    )}
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleApproveRequest(request.id)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approuver
                      </Button>
                      <Button
                        onClick={() => handleRejectRequest(request.id)}
                        size="sm"
                        variant="destructive"
                      >
                        Rejeter
                      </Button>
                    </div>
                  )}
                  
                  {request.status !== 'pending' && (
                    <Badge variant={request.status === 'approved' ? 'default' : 'destructive'}>
                      {request.status === 'approved' ? 'Approuvé' : 'Rejeté'}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Bouton pour déclencher manuellement la vérification des renouvellements */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-blue-900">Vérification automatique des renouvellements</h3>
                <p className="text-sm text-blue-700">
                  Le système vérifie automatiquement les licences qui expirent et génère des demandes de renouvellement.
                </p>
              </div>
              <Button
                onClick={() => {
                  // Ici vous pourrez déclencher manuellement la fonction de vérification
                  toast.success('Vérification des renouvellements déclenchée');
                }}
                variant="outline"
                className="text-blue-700 border-blue-300 hover:bg-blue-100"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Vérifier maintenant
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Réactivation */}
      <Dialog open={isRenewalDialogOpen} onOpenChange={setIsRenewalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Réactiver la licence</DialogTitle>
          </DialogHeader>
          {selectedCompany && (
            <div className="space-y-4">
              <div>
                <p className="font-medium">{selectedCompany.companyName}</p>
                <p className="text-sm text-gray-600">Admin: {selectedCompany.adminName}</p>
                <p className="text-sm text-gray-600">Module: {selectedCompany.activeModule}</p>
              </div>
              <div>
                <Label htmlFor="duration">Durée de validité (mois)</Label>
                <Select value={renewalDuration} onValueChange={setRenewalDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 mois</SelectItem>
                    <SelectItem value="3">3 mois</SelectItem>
                    <SelectItem value="6">6 mois</SelectItem>
                    <SelectItem value="12">12 mois (par défaut)</SelectItem>
                    <SelectItem value="24">24 mois</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsRenewalDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleRenewalSubmit}>
                  Réactiver la licence
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
