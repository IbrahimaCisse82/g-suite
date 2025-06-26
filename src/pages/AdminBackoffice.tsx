
import React from 'react';
import { AdminBackofficeLayout } from '@/components/admin/AdminBackofficeLayout';
import { BackofficeDashboard } from '@/components/admin/backoffice/BackofficeDashboard';
import { AdminProtectedRoute } from '@/components/admin/AdminProtectedRoute';

const AdminBackoffice = () => {
  return (
    <AdminProtectedRoute>
      <AdminBackofficeLayout>
        <BackofficeDashboard />
      </AdminBackofficeLayout>
    </AdminProtectedRoute>
  );
};

export default AdminBackoffice;
