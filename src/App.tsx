import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient } from 'react-query';

// Import page components
import Index from '@/pages/Index';
import Landing from '@/pages/Landing';
import AboutUs from '@/pages/AboutUs';
import Contact from '@/pages/Contact';
import Formation from '@/pages/Formation';
import QuoteRequest from '@/pages/QuoteRequest';
import EntrepriseSolution from '@/pages/solutions/EntrepriseSolution';
import ComptabiliteSolution from '@/pages/solutions/ComptabiliteSolution';
import CommercialeSolution from '@/pages/solutions/CommercialeSolution';
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';
import CookiesPolicy from '@/pages/legal/CookiesPolicy';
import TermsOfService from '@/pages/legal/TermsOfService';
import LegalNotices from '@/pages/legal/LegalNotices';
import ProductDocumentation from '@/pages/help/ProductDocumentation';
import HelpCenter from '@/pages/help/HelpCenter';

// Import authentication components
import UserLogin from '@/pages/auth/UserLogin';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';
import CompanyRegistration from '@/pages/auth/CompanyRegistration';
import TrialActivation from '@/pages/auth/TrialActivation';

// Import admin components
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminPanel from '@/pages/admin/AdminPanel';
import AdminBackend from '@/pages/admin/AdminBackend';
import AdminUserManagement from '@/pages/admin/AdminUserManagement';
import AdminBackoffice from '@/pages/admin/AdminBackoffice';
import AdminBackofficeUsers from '@/pages/admin/backoffice/AdminBackofficeUsers';
import AdminBackofficeCompanies from '@/pages/admin/backoffice/AdminBackofficeCompanies';
import AdminBackofficeStats from '@/pages/admin/backoffice/AdminBackofficeStats';
import AdminBackofficeDatabase from '@/pages/admin/backoffice/AdminBackofficeDatabase';
import AdminBackofficeRoles from '@/pages/admin/backoffice/AdminBackofficeRoles';
import AdminBackofficeSettings from '@/pages/admin/backoffice/AdminBackofficeSettings';
import AdminBackofficeSolutionEntreprise from '@/pages/admin/backoffice/AdminBackofficeSolutionEntreprise';
import AdminBackofficeSolutionComptabilite from '@/pages/admin/backoffice/AdminBackofficeSolutionComptabilite';
import AdminBackofficeSolutionCommerciale from '@/pages/admin/backoffice/AdminBackofficeSolutionCommerciale';

// Import application components
import Dashboard from '@/pages/Dashboard';
import Accounting from '@/pages/Accounting';
import ChartOfAccounts from '@/pages/ChartOfAccounts';
import JournalEntries from '@/pages/JournalEntries';
import FinancialStatements from '@/pages/FinancialStatements';
import Contacts from '@/pages/Contacts';
import Invoicing from '@/pages/Invoicing';
import Purchases from '@/pages/Purchases';
import Products from '@/pages/Products';
import Stock from '@/pages/Stock';
import Treasury from '@/pages/Treasury';
import Reports from '@/pages/Reports';
import Analytics from '@/pages/Analytics';
import TrainingSupport from '@/pages/TrainingSupport';
import TrainingSupportStandalone from '@/pages/TrainingSupportStandalone';
import Integrations from '@/pages/Integrations';
import Security from '@/pages/Security';
import Mobile from '@/pages/Mobile';
import TPEModules from '@/pages/TPEModules';
import TPEOnboarding from '@/pages/TPEOnboarding';
import CompanyAdminSetup from '@/pages/CompanyAdminSetup';
import NotFound from '@/pages/NotFound';
import Budget from '@/pages/Budget';
import Employees from '@/pages/Employees';

// Import settings components
import SettingsLayout from '@/pages/settings/SettingsLayout';
import Settings from '@/pages/settings/Settings';
import ProfileSettings from '@/pages/settings/ProfileSettings';
import UsersSettings from '@/pages/settings/UsersSettings';
import SubscriptionSettings from '@/pages/settings/SubscriptionSettings';
import LicensesSettings from '@/pages/settings/LicensesSettings';
import LicenseKeySettings from '@/pages/settings/LicenseKeySettings';

function App() {
  return (
    <BrowserRouter>
      <QueryClient>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/formation" element={<Formation />} />
          <Route path="/quote-request" element={<QuoteRequest />} />
          <Route path="/solutions/entreprise" element={<EntrepriseSolution />} />
          <Route path="/solutions/comptabilite" element={<ComptabiliteSolution />} />
          <Route path="/solutions/commerciale" element={<CommercialeSolution />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookies-policy" element={<CookiesPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/legal-notices" element={<LegalNotices />} />
          <Route path="/product-documentation" element={<ProductDocumentation />} />
          <Route path="/help-center" element={<HelpCenter />} />

          {/* Authentication routes */}
          <Route path="/auth/login" element={<UserLogin />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/company-registration" element={<CompanyRegistration />} />
          <Route path="/trial-activation" element={<TrialActivation />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/panel" element={<AdminPanel />} />
          <Route path="/admin/backend" element={<AdminBackend />} />
          <Route path="/admin/user-management" element={<AdminUserManagement />} />
          <Route path="/admin/backoffice" element={<AdminBackoffice />} />
          <Route path="/admin/backoffice/users" element={<AdminBackofficeUsers />} />
          <Route path="/admin/backoffice/companies" element={<AdminBackofficeCompanies />} />
          <Route path="/admin/backoffice/stats" element={<AdminBackofficeStats />} />
          <Route path="/admin/backoffice/database" element={<AdminBackofficeDatabase />} />
          <Route path="/admin/backoffice/roles" element={<AdminBackofficeRoles />} />
          <Route path="/admin/backoffice/settings" element={<AdminBackofficeSettings />} />
          <Route path="/admin/backoffice/solution-entreprise" element={<AdminBackofficeSolutionEntreprise />} />
          <Route path="/admin/backoffice/solution-comptabilite" element={<AdminBackofficeSolutionComptabilite />} />
          <Route path="/admin/backoffice/solution-commerciale" element={<AdminBackofficeSolutionCommerciale />} />

          {/* Protected application routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/chart-of-accounts" element={<ChartOfAccounts />} />
          <Route path="/journal-entries" element={<JournalEntries />} />
          <Route path="/financial-statements" element={<FinancialStatements />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoicing" element={<Invoicing />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/products" element={<Products />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/treasury" element={<Treasury />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/training-support" element={<TrainingSupport />} />
          <Route path="/training-support-standalone" element={<TrainingSupportStandalone />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/security" element={<Security />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/tpe-modules" element={<TPEModules />} />
          <Route path="/tpe-onboarding" element={<TPEOnboarding />} />
          <Route path="/company-admin-setup" element={<CompanyAdminSetup />} />

          {/* Settings routes */}
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<Settings />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="users" element={<UsersSettings />} />
            <Route path="subscriptions" element={<SubscriptionSettings />} />
            <Route path="licenses" element={<LicensesSettings />} />
            <Route path="license-key" element={<LicenseKeySettings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </QueryClient>
    </BrowserRouter>
  );
}

export default App;
