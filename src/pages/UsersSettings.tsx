
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Plus, Mail, Phone, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserFormDialog } from "@/components/admin/UserFormDialog";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'manager' | 'comptable' | 'commercial' | 'logistique' | 'caissier';
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  role: 'manager' | 'comptable' | 'commercial' | 'logistique' | 'caissier';
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
}

const UsersSettings = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  
  // Utilisateurs avec profils complets
  const [users, setUsers] = useState<User[]>([
    { 
      id: 1, 
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@exemple.com", 
      phone: "+33 1 23 45 67 89",
      role: "manager",
      isActive: true,
      lastLogin: "2024-01-15 10:30",
      createdAt: "2024-01-01"
    },
    { 
      id: 2, 
      firstName: "Marie",
      lastName: "Martin",
      email: "marie.martin@exemple.com", 
      phone: "+33 1 98 76 54 32",
      role: "comptable",
      isActive: true,
      lastLogin: "2024-01-14 16:45",
      createdAt: "2024-01-05"
    },
    { 
      id: 3, 
      firstName: "Pierre",
      lastName: "Dubois",
      email: "pierre.dubois@exemple.com", 
      phone: "+33 1 55 44 33 22",
      role: "commercial",
      isActive: false,
      lastLogin: "2024-01-10 08:15",
      createdAt: "2023-12-15"
    }
  ]);

  const roleLabels = {
    manager: 'Manager',
    comptable: 'Comptable',
    commercial: 'Commercial',
    logistique: 'Logistique',
    caissier: 'Caissier'
  };

  const roleColors = {
    manager: 'bg-purple-100 text-purple-800',
    comptable: 'bg-blue-100 text-blue-800',
    commercial: 'bg-green-100 text-green-800',
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
      'Budget',
      'Formation',
      'Paramètres'
    ],
    comptable: [
      'Comptabilité générale',
      'Trésorerie',
      'Budget',
      'Formation'
    ],
    commercial: [
      'Clients & Fournisseurs',
      'Facturation',
      'Achats',
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

  const handleAddUser = (userData: UserFormData) => {
    const newUser: User = {
      id: Math.max(...users.map(u => u.id)) + 1,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone || '',
      role: userData.role,
      isActive: userData.isActive,
      lastLogin: '',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setUsers([...users, newUser]);
    setIsAddUserOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-6">
      {/* En-tête */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                Gestion des utilisateurs
              </CardTitle>
              <p className="text-gray-600 mt-2">Gérez les utilisateurs et leurs droits d'accès</p>
            </div>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setIsAddUserOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Inviter un utilisateur
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total utilisateurs</p>
                <p className="text-3xl font-bold text-gray-900">{users.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
                <p className="text-3xl font-bold text-green-600">
                  {users.filter(u => u.isActive).length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Managers</p>
                <p className="text-3xl font-bold text-purple-600">
                  {users.filter(u => u.role === 'manager').length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des utilisateurs */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {users.map((user) => (
              <div key={user.id} className="border rounded-lg p-6 space-y-4">
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

                {/* Informations supplémentaires */}
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
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog pour ajouter un utilisateur */}
      <UserFormDialog
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onSubmit={handleAddUser}
        title="Inviter un utilisateur"
      />
    </div>
  );
};

export default UsersSettings;
