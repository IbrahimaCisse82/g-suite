
import { useState } from 'react';

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

export const useBackofficeUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

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
  };

  const handleEditUser = (userData: Omit<User, 'id' | 'createdAt' | 'companyId' | 'companyName'>, userId: string) => {
    const userToEdit = users.find(user => user.id === userId);
    if (userToEdit) {
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...userToEdit, ...userData }
          : user
      ));
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

  const statistics = {
    totalUsers: users.length,
    activeUsers: users.filter(user => user.isActive).length,
    inactiveUsers: users.filter(user => !user.isActive).length,
    companiesCount: new Set(users.map(user => user.companyId)).size
  };

  return {
    users,
    filteredUsers,
    searchTerm,
    setSearchTerm,
    statistics,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    handleToggleUserStatus
  };
};
