
import React from 'react';
import { AdminBackofficeNavigation } from '@/components/admin/AdminBackofficeNavigation';
import { BackofficeDashboard } from '@/components/admin/backoffice/BackofficeDashboard';

const AdminBackoffice = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminBackofficeNavigation />
      <div className="flex-1 overflow-auto">
        <BackofficeDashboard />
      </div>
    </div>
  );
};

export default AdminBackoffice;
