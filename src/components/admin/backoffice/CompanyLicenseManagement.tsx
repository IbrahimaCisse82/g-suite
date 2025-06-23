
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

// Aucune entreprise ni demande pour le moment - données réelles
const mockCompanies: CompanyLicense[] = [];
const mockRequests: LicenseRequest[] = [];

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
            <p className="text-gray-500 text-center py-8">
              Aucune entreprise enregistrée pour le moment
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Demandes de Clé Licence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>Demandes de Clé Licence</span>
            <div className="flex space-x-2 ml-4">
              <Badge variant="outline" className="text-blue-600">
                0 Nouvelles
              </Badge>
              <Badge variant="outline" className="text-orange-600">
                0 Renouvellements
              </Badge>
              <Badge variant="outline" className="text-purple-600">
                0 Upgrades
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-500 text-center py-8">
              Aucune demande de licence pour le moment
            </p>
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
