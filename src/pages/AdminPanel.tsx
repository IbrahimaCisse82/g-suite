
import React from 'react';
import { Layout } from '../components/Layout';
import { AdminDashboard } from '../components/admin/AdminDashboard';

export const AdminPanel = () => {
  return (
    <Layout>
      <div className="p-8">
        <AdminDashboard />
      </div>
    </Layout>
  );
};
