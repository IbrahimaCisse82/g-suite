
import React from 'react';
import { Route } from 'react-router-dom';
import { SecureAdminLoginForm } from '@/components/admin/SecureAdminLoginForm';
import AdminBackoffice from '@/pages/AdminBackoffice';
import AdminBackofficeStats from '@/pages/AdminBackofficeStats';
import AdminBackofficeRoles from '@/pages/AdminBackofficeRoles';
import AdminBackofficeDatabase from '@/pages/AdminBackofficeDatabase';
import AdminBackofficeUsers from '@/pages/AdminBackofficeUsers';
import AdminBackofficeCompanies from '@/pages/AdminBackofficeCompanies';
import AdminBackofficeSettings from '@/pages/AdminBackofficeSettings';
import AdminBackofficeSolutionComptabilite from '@/pages/AdminBackofficeSolutionComptabilite';
import AdminBackofficeSolutionCommerciale from '@/pages/AdminBackofficeSolutionCommerciale';
import AdminBackofficeSolutionEntreprise from '@/pages/AdminBackofficeSolutionEntreprise';

export const AdminRoutes = () => (
  <>
    <Route path="/admin-backoffice/login" element={<SecureAdminLoginForm />} />
    <Route path="/admin-backoffice" element={<AdminBackoffice />} />
    <Route path="/admin-backoffice/stats" element={<AdminBackofficeStats />} />
    <Route path="/admin-backoffice/roles" element={<AdminBackofficeRoles />} />
    <Route path="/admin-backoffice/database" element={<AdminBackofficeDatabase />} />
    <Route path="/admin-backoffice/users" element={<AdminBackofficeUsers />} />
    <Route path="/admin-backoffice/companies" element={<AdminBackofficeCompanies />} />
    <Route path="/admin-backoffice/settings" element={<AdminBackofficeSettings />} />
    <Route path="/admin-backoffice/solution/comptabilite" element={<AdminBackofficeSolutionComptabilite />} />
    <Route path="/admin-backoffice/solution/commerciale" element={<AdminBackofficeSolutionCommerciale />} />
    <Route path="/admin-backoffice/solution/entreprise" element={<AdminBackofficeSolutionEntreprise />} />
  </>
);
