
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Shield, Calendar, Clock, Check, X } from 'lucide-react';

interface UserBasicInfoProps {
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

export const UserBasicInfo = ({ user }: UserBasicInfoProps) => {
  return (
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
  );
};
