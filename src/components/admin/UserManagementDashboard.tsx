
import React from 'react';
import { UserFormDialog } from './UserFormDialog';
import { UserDetailsDialog } from './UserDetailsDialog';
import { useUserManagement } from './user-management/useUserManagement';
import { UserManagementHeader } from './user-management/UserManagementHeader';
import { UserManagementStats } from './user-management/UserManagementStats';
import { UserManagementSearch } from './user-management/UserManagementSearch';
import { UserManagementTable } from './user-management/UserManagementTable';

export const UserManagementDashboard = () => {
  const {
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
  } = useUserManagement();

  const managersCount = users.filter(u => u.role === 'manager').length;

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };

  const handleEditUserClick = (user: any) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <UserManagementHeader onAddUser={() => setIsAddUserOpen(true)} />

      <UserManagementStats
        totalUsers={users.length}
        activeUsers={activeUsersCount}
        inactiveUsers={inactiveUsersCount}
        managersCount={managersCount}
      />

      <UserManagementSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <UserManagementTable
        users={filteredUsers}
        roleLabels={roleLabels}
        onViewUser={handleViewUser}
        onEditUser={handleEditUserClick}
        onToggleStatus={handleToggleUserStatus}
        onDeleteUser={handleDeleteUser}
      />

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
