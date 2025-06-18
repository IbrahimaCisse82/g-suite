
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Shield, 
  Mail,
  Phone,
  Building2,
  UserCheck,
  UserX,
  Filter,
  Download
} from 'lucide-react';
import { UserFormDialog } from './UserFormDialog';
import { UserDetailsDialog } from './UserDetailsDialog';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'manager' | 'comptable' | 'budget' | 'logistique' | 'caissier';
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  companyId: string;
  companyName: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@entreprise.com',
    firstName: 'Jean',
    lastName: 'Dupont',
    role: 'manager',
    phone: '+33 1 23 45 67 89',
    isActive: true,
    lastLogin: '2024-01-15 10:30',
    createdAt: '2024-01-01',
    companyId: 'comp-1',
    companyName: 'SARL Tech Solutions'
  },
  {
    id: '2',
    email: 'comptable@entreprise.com',
    firstName: 'Marie',
    lastName: 'Martin',
    role: 'comptable',
    phone: '+33 1 98 76 54 32',
    isActive: true,
    lastLogin: '2024-01-14 16:45',
    createdAt: '2024-01-05',
    companyId: 'comp-1',
    companyName: 'SARL Tech Solutions'
  },
  {
    id: '3',
    email: 'manager@commerce.sn',
    firstName: 'Amadou',
    lastName: 'Diallo',
    role: 'manager',
    phone: '+221 77 123 45 67',
    isActive: false,
    lastLogin: '2024-01-10 08:15',
    createdAt: '2023-12-15',
    companyId: 'comp-2',
    companyName: 'SA Commerce Général'
  }
];

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

export const BackofficeUserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roleLabels[user.role].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (userData: Omit<User, 'id' | 'createdAt' | 'companyId' | 'companyName'>) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0],
      companyId: 'comp-1',
      companyName: 'Nouvelle Entreprise'
    };
    setUsers([...users, newUser]);
    setIsAddUserOpen(false);
  };

  const handleEditUser = (userData: Omit<User, 'id' | 'createdAt' | 'companyId' | 'companyName'>) => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...selectedUser, ...userData }
          : user
      ));
      setIsEditUserOpen(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const activeUsersCount = users.filter(user => user.isActive).length;
  const inactiveUsersCount = users.length - activeUsersCount;
  const companiesCount = new Set(users.map(user => user.companyId)).size;

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
            Gestion des Utilisateurs
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Gérez tous les utilisateurs des comptes entreprises depuis ce backoffice
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
          <Button
            onClick={() => setIsAddUserOpen(true)}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter un utilisateur
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total utilisateurs</p>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Utilisateurs actifs</p>
                <p className="text-3xl font-bold">{activeUsersCount}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Utilisateurs inactifs</p>
                <p className="text-3xl font-bold">{inactiveUsersCount}</p>
              </div>
              <UserX className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Entreprises</p>
                <p className="text-3xl font-bold">{companiesCount}</p>
              </div>
              <Building2 className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par nom, email, entreprise ou rôle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Liste des utilisateurs ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Utilisateur</th>
                  <th className="text-left p-4 font-semibold">Entreprise</th>
                  <th className="text-left p-4 font-semibold">Contact</th>
                  <th className="text-left p-4 font-semibold">Rôle</th>
                  <th className="text-left p-4 font-semibold">Statut</th>
                  <th className="text-left p-4 font-semibold">Dernière connexion</th>
                  <th className="text-center p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{user.companyName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={roleColors[user.role]}>
                        {roleLabels[user.role]}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={user.isActive ? "default" : "secondary"}>
                        {user.isActive ? "Actif" : "Inactif"}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleString('fr-FR') : 'Jamais'}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsDetailsOpen(true);
                          }}
                        >
                          Voir
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsEditUserOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={user.isActive ? "text-red-600" : "text-green-600"}
                        >
                          {user.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucun utilisateur trouvé</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <UserFormDialog
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onSubmit={handleAddUser}
        title="Ajouter un utilisateur"
      />

      <UserFormDialog
        isOpen={isEditUserOpen}
        onClose={() => {
          setIsEditUserOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleEditUser}
        title="Modifier l'utilisateur"
        initialData={selectedUser}
      />

      <UserDetailsDialog
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    </div>
  );
};
