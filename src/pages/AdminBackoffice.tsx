
import React from 'react';
import { AdminBackofficeNavigation } from '@/components/admin/AdminBackofficeNavigation';
import { BackofficeUserManagement } from '@/components/admin/BackofficeUserManagement';

const AdminBackoffice = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminBackofficeNavigation />
      <div className="flex-1 overflow-auto">
        <BackofficeUserManagement />
      </div>
    </div>
  );
};

export default AdminBackoffice;
