
import React, { useState } from 'react';
import { UserFormDialog } from './UserFormDialog';
import { UserDetailsDialog } from './UserDetailsDialog';
import { BackofficeHeader } from './backoffice/BackofficeHeader';
import { BackofficeStatistics } from './backoffice/BackofficeStatistics';
import { BackofficeSearchFilters } from './backoffice/BackofficeSearchFilters';
import { BackofficeUsersTable } from './backoffice/BackofficeUsersTable';
import { useBackofficeUsers } from './backoffice/useBackofficeUsers';

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

export const BackofficeUserManagement = () => {
  const {
    filteredUsers,
    searchTerm,
    setSearchTerm,
    statistics,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    handleToggleUserStatus
  } = useBackofficeUsers();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const onAddUser = (userData: Omit<User, 'id' | 'createdAt' | 'companyId' | 'companyName'>) => {
    handleAddUser(userData);
    setIsAddUserOpen(false);
  };

  const onEditUser = (userData: Omit<User, 'id' | 'createdAt' | 'companyId' | 'companyName'>) => {
    if (selectedUser) {
      handleEditUser(userData, selectedUser.id);
      setIsEditUserOpen(false);
      setSelectedUser(null);
    }
  };

  const onViewUser = (user: User) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };

  const onEditUserClick = (user: User) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <BackofficeHeader onAddUser={() => setIsAddUserOpen(true)} />
      
      <BackofficeStatistics {...statistics} />
      
      <BackofficeSearchFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <BackofficeUsersTable
        users={filteredUsers}
        onViewUser={onViewUser}
        onEditUser={onEditUserClick}
        onToggleUserStatus={handleToggleUserStatus}
        onDeleteUser={handleDeleteUser}
      />

      {/* Dialogs */}
      <UserFormDialog
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onSubmit={onAddUser}
        title="Ajouter un utilisateur"
      />

      <UserFormDialog
        isOpen={isEditUserOpen}
        onClose={() => {
          setIsEditUserOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={onEditUser}
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
