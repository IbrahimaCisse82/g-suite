
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
  CheckCircle, 
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Settings,
  Calendar,
  Users
} from 'lucide-react';
import { toast } from 'sonner';

interface CompanyAccount {
  id: string;
  company_name: string;
  admin_name: string;
  admin_email: string;
  module: string;
  status: 'active' | 'inactive' | 'suspended' | 'expired';
  validity_start_date: string;
  validity_end_date: string;
  last_activity: string;
  suspension_reason?: string;
}

// Données réelles - aucun compte pour le moment
const mockCompanyAccounts: CompanyAccount[] = [];

// Demandes en cours - aucune pour le moment
const mockPendingRequests: any[] = [];

export const CompanyAccountsManager = () => {
  const [accounts, setAccounts] = useState<CompanyAccount[]>(mockCompanyAccounts);
  const [pendingRequests] = useState<any[]>(mockPendingRequests);
  const [filter, setFilter] = useState<string>('all');
  const [selectedAccount, setSelectedAccount] = useState<CompanyAccount | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Actif</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800"><XCircle className="w-3 h-3 mr-1" />Inactif</Badge>;
      case 'suspended':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Suspendu</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="w-3 h-3 mr-1" />Expiré</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getValidityStatus = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) {
      return { status: 'expired', text: 'Expiré', color: 'text-red-600' };
    } else if (daysLeft <= 30) {
      return { status: 'warning', text: `${daysLeft} jours restants`, color: 'text-orange-600' };
    } else {
      return { status: 'valid', text: `${daysLeft} jours restants`, color: 'text-green-600' };
    }
  };

  const filteredAccounts = accounts.filter(account => {
    if (filter === 'all') return true;
    return account.status === filter;
  });

  const stats = {
    total: accounts.length,
    active: accounts.filter(a => a.status === 'active').length,
    inactive: accounts.filter(a => a.status === 'inactive').length,
    suspended: accounts.filter(a => a.status === 'suspended').length,
    expired: accounts.filter(a => a.status === 'expired').length,
    pending: pendingRequests.length
  };

  const handleViewDetails = (account: CompanyAccount) => {
    setSelectedAccount(account);
    setIsDetailsDialogOpen(true);
  };

  const handleStatusChange = (accountId: string, newStatus: string) => {
    setAccounts(accounts.map(account => 
      account.id === accountId 
        ? { ...account, status: newStatus as any }
        : account
    ));
    toast.success('Statut du compte mis à jour');
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-sm text-gray-600">Total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-sm text-gray-600">Actifs</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
            <p className="text-sm text-gray-600">Inactifs</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.suspended}</div>
            <p className="text-sm text-gray-600">Suspendus</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
            <p className="text-sm text-gray-600">Expirés</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <p className="text-sm text-gray-600">En attente</p>
          </CardContent>
        </Card>
      </div>

      {/* Demandes en cours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Demandes en Cours</span>
            <Badge variant="outline">{pendingRequests.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingRequests.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <p className="text-gray-500">Aucune demande en cours</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Ici, les demandes en cours s'afficheront quand il y en aura */}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Liste des comptes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>Comptes Entreprises</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les comptes</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="inactive">Inactifs</SelectItem>
                  <SelectItem value="suspended">Suspendus</SelectItem>
                  <SelectItem value="expired">Expirés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredAccounts.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {filter === 'all' ? 'Aucun compte entreprise enregistré' : `Aucun compte ${filter}`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Entreprise</th>
                    <th className="text-left p-4">Administrateur</th>
                    <th className="text-left p-4">Module</th>
                    <th className="text-left p-4">Statut</th>
                    <th className="text-left p-4">Validité</th>
                    <th className="text-left p-4">Dernière activité</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account) => {
                    const validity = getValidityStatus(account.validity_end_date);
                    return (
                      <tr key={account.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{account.company_name}</td>
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{account.admin_name}</div>
                            <div className="text-sm text-gray-600">{account.admin_email}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{account.module}</Badge>
                        </td>
                        <td className="p-4">{getStatusBadge(account.status)}</td>
                        <td className="p-4">
                          <div>
                            <div className="text-sm font-medium">
                              {new Date(account.validity_end_date).toLocaleDateString('fr-FR')}
                            </div>
                            <div className={`text-xs ${validity.color}`}>
                              {validity.text}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {new Date(account.last_activity).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewDetails(account)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Voir
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="w-4 h-4 mr-1" />
                              Gérer
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog de détails */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du Compte Entreprise</DialogTitle>
          </DialogHeader>
          {selectedAccount && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Entreprise</Label>
                  <p className="text-lg font-semibold">{selectedAccount.company_name}</p>
                </div>
                <div>
                  <Label className="font-medium">Statut</Label>
                  <div className="mt-1">{getStatusBadge(selectedAccount.status)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Administrateur</Label>
                  <p>{selectedAccount.admin_name}</p>
                  <p className="text-sm text-gray-600">{selectedAccount.admin_email}</p>
                </div>
                <div>
                  <Label className="font-medium">Module</Label>
                  <p>{selectedAccount.module}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium">Période de validité</Label>
                  <p>{new Date(selectedAccount.validity_start_date).toLocaleDateString('fr-FR')} - {new Date(selectedAccount.validity_end_date).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <Label className="font-medium">Dernière activité</Label>
                  <p>{new Date(selectedAccount.last_activity).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
              
              {selectedAccount.suspension_reason && (
                <div>
                  <Label className="font-medium">Raison de suspension</Label>
                  <p className="text-sm text-gray-600">{selectedAccount.suspension_reason}</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                  Fermer
                </Button>
                <Select
                  value={selectedAccount.status}
                  onValueChange={(value) => handleStatusChange(selectedAccount.id, value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                    <SelectItem value="suspended">Suspendu</SelectItem>
                    <SelectItem value="expired">Expiré</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
