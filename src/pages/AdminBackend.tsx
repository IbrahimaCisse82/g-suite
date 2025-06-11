
import React from 'react';
import { AdminBackendNavigation } from '../components/admin/AdminBackendNavigation';
import { LicenseManagementDashboard } from '../components/admin/LicenseManagementDashboard';

export const AdminBackend = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      <AdminBackendNavigation />
      <div className="flex-1 overflow-auto">
        <LicenseManagementDashboard />
      </div>
    </div>
  );
};
