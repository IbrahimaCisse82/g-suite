
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Calendar, 
  Clock,
  Building2,
  Check,
  X
} from 'lucide-react';

interface UserDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const roleLabels = {
  manager: 'Manager',
  comptable: 'Comptable',
  budget: 'Budget',
  logistique: 'Logistique',
  caissier: 'Caissier'
};

const roleColors = {
  manager: 'bg-purple-100 text-purple-800',
  comptable: 'bg-blue-100 text-blue-800',
  budget: 'bg-green-100 text-green-800',
  logistique: 'bg-orange-100 text-orange-800',
  caissier: 'bg-yellow-100 text-yellow-800'
};

const rolePermissions = {
  manager: [
    'Tableau de bord',
    'Comptabilité générale',
    'Clients & Fournisseurs',
    'Facturation',
    'Achats',
    'Produits',
    'Stock',
    'Trésorerie',
    'Rapports',
    'Analyse',
    'Formation',
    'Paramètres'
  ],
  comptable: [
    'Comptabilité générale',
    'Trésorerie',
    'Formation'
  ],
  budget: [
    'Clients & Fournisseurs',
    'Facturation',
    'Achats',
    'Budget',
    'Formation'
  ],
  logistique: [
    'Produits',
    'Stock',
    'Formation'
  ],
  caissier: [
    'Trésorerie',
    'Formation'
  ]
};

export const UserDetailsDialog = ({ isOpen, onClose, user }: UserDetailsDialogProps) => {
  if (!user) return null;

  const permissions = rolePermissions[user.role] || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {user.firstName[0]}{user.lastName[0]}
              </span>
            </div>
            Détails de l'utilisateur
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations générales */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Informations générales
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Nom complet</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Email</p>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  
                  {user.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Téléphone</p>
                        <p className="text-gray-900">{user.phone}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Rôle</p>
                      <Badge className={roleColors[user.role]}>
                        {roleLabels[user.role]}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600">Statut</p>
                    <div className="flex items-center gap-2 mt-1">
                      {user.isActive ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Actif
                          </Badge>
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4 text-red-600" />
                          <Badge variant="secondary">
                            Inactif
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Membre depuis</p>
                      <p className="text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  {user.lastLogin && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Dernière connexion</p>
                        <p className="text-gray-900">
                          {new Date(user.lastLogin).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permissions et accès */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Permissions et accès
              </h3>
              
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  En tant que <strong>{roleLabels[user.role]}</strong>, cet utilisateur a accès aux modules suivants :
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {permissions.map((permission, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-green-50">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activité récente */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Activité récente
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                  <p className="text-sm font-medium text-gray-900">Création du compte</p>
                  <p className="text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                {user.lastLogin && (
                  <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                    <p className="text-sm font-medium text-gray-900">Dernière connexion</p>
                    <p className="text-sm text-gray-600">
                      {new Date(user.lastLogin).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
