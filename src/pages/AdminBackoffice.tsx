
import React from 'react';
import { AdminBackofficeNavigation } from '@/components/admin/AdminBackofficeNavigation';
import { UserManagementDashboard } from '@/components/admin/UserManagementDashboard';

export const AdminBackoffice = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminBackofficeNavigation />
      <div className="flex-1 overflow-auto">
        <UserManagementDashboard />
      </div>
    </div>
  );
};
