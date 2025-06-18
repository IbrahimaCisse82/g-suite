
import React from 'react';
import { Layout } from '@/components/Layout';
import { UserManagementDashboard } from '@/components/admin/UserManagementDashboard';

export const AdminUserManagement = () => {
  return (
    <Layout>
      <UserManagementDashboard />
    </Layout>
  );
};
