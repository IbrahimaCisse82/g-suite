
import { useState } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'manager' | 'comptable' | 'commercial' | 'logistique' | 'caissier';
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  companyId: string;
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
    companyId: 'comp-1'
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
    companyId: 'comp-1'
  }
];

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const roleLabels = {
    manager: 'Manager',
    comptable: 'Comptable',
    commercial: 'Commercial',
    logistique: 'Logistique',
    caissier: 'Caissier'
  };

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roleLabels[user.role].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (userData: Omit<User, 'id' | 'createdAt' | 'companyId'>) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0],
      companyId: 'comp-1'
    };
    setUsers([...users, newUser]);
    setIsAddUserOpen(false);
  };

  const handleEditUser = (userData: Omit<User, 'id' | 'createdAt' | 'companyId'>) => {
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

  return {
    users,
    filteredUsers,
    searchTerm,
    setSearchTerm,
    selectedUser,
    setSelectedUser,
    isAddUserOpen,
    setIsAddUserOpen,
    isEditUserOpen,
    setIsEditUserOpen,
    isDetailsOpen,
    setIsDetailsOpen,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    handleToggleUserStatus,
    activeUsersCount,
    inactiveUsersCount,
    roleLabels
  };
};

export type { User };
