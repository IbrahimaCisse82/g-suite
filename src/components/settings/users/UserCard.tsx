
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Shield, Check } from "lucide-react";
import { User } from "./types";
import { roleLabels, roleColors, rolePermissions } from "./constants";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-lg">
              {user.firstName[0]}{user.lastName[0]}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h3>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                {user.phone}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={roleColors[user.role]}>
            {roleLabels[user.role]}
          </Badge>
          <Badge variant={user.isActive ? "default" : "secondary"}>
            {user.isActive ? "Actif" : "Inactif"}
          </Badge>
          <Button size="sm" variant="outline">
            Gérer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Informations</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Créé le : {new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>
            <p>Dernière connexion : {user.lastLogin ? new Date(user.lastLogin).toLocaleString('fr-FR') : 'Jamais'}</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Droits d'accès
          </h4>
          <div className="grid grid-cols-2 gap-1">
            {rolePermissions[user.role]?.slice(0, 6).map((permission, index) => (
              <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                <Check className="w-3 h-3 text-green-600" />
                <span>{permission}</span>
              </div>
            ))}
            {rolePermissions[user.role]?.length > 6 && (
              <div className="text-xs text-gray-500 col-span-2">
                +{rolePermissions[user.role].length - 6} autres permissions
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
