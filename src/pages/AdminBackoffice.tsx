
import React from 'react';
import { AdminBackofficeLayout } from '@/components/admin/AdminBackofficeLayout';
import { BackofficeDashboard } from '@/components/admin/backoffice/BackofficeDashboard';

const AdminBackoffice = () => {
  return (
    <AdminBackofficeLayout>
      <BackofficeDashboard />
    </AdminBackofficeLayout>
  );
};

export default AdminBackoffice;
