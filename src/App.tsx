import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import AboutUs from "./pages/AboutUs";
import Security from "./pages/Security";
import Integrations from "./pages/Integrations";
import Mobile from "./pages/Mobile";
import HelpCenter from "./pages/HelpCenter";
import LegalNotices from "./pages/LegalNotices";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiesPolicy from "./pages/CookiesPolicy";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import SettingsLayout from "./pages/SettingsLayout";
import { Settings } from "./pages/Settings";
import ProfileSettings from "./pages/ProfileSettings";
import UsersSettings from "./pages/UsersSettings";
import LicensesSettings from "./pages/LicensesSettings";
import { SubscriptionSettings } from "./pages/SubscriptionSettings";
import { Products } from "./pages/Products";
import { Stock } from "./pages/Stock";
import { Reports } from "./pages/Reports";
import { Accounting } from "./pages/Accounting";
import Contact from "./pages/Contact";
import TrainingSupport from "./pages/TrainingSupport";
import TrainingSupportStandalone from "./pages/TrainingSupportStandalone";
import ProductDocumentation from "./pages/ProductDocumentation";
import Formation from "./pages/Formation";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { Contacts } from "./pages/Contacts";
import { Invoicing } from "./pages/Invoicing";
import { Purchases } from "./pages/Purchases";
import { Treasury } from "./pages/Treasury";
import { Analytics } from "./pages/Analytics";
import Budget from "./pages/Budget";
import { ChartOfAccounts } from "./pages/ChartOfAccounts";
import { FinancialStatements } from "./pages/FinancialStatements";
import { JournalEntries } from "./pages/JournalEntries";
import CompanyRegistration from "./pages/CompanyRegistration";
import { AdminUserManagement } from "./pages/AdminUserManagement";
import AdminBackoffice from "./pages/AdminBackoffice";
import AdminBackofficeUsers from "./pages/AdminBackofficeUsers";
import AdminBackofficeCompanies from "./pages/AdminBackofficeCompanies";
import AdminBackofficeStats from "./pages/AdminBackofficeStats";
import AdminBackofficeSettings from "./pages/AdminBackofficeSettings";
import ComptabiliteSolution from "./pages/solutions/ComptabiliteSolution";
import CommercialeSolution from "./pages/solutions/CommercialeSolution";
import EntrepriseSolution from "./pages/solutions/EntrepriseSolution";
import AdminBackofficeSolutionComptabilite from "./pages/AdminBackofficeSolutionComptabilite";
import AdminBackofficeSolutionCommerciale from "./pages/AdminBackofficeSolutionCommerciale";
import AdminBackofficeSolutionEntreprise from "./pages/AdminBackofficeSolutionEntreprise";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/security" element={<Security />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/legal-notices" element={<LegalNotices />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookies-policy" element={<CookiesPolicy />} />
          
          <Route path="/login" element={<UserLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/company-registration" element={<CompanyRegistration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/chart-of-accounts" element={<ChartOfAccounts />} />
          <Route path="/financial-statements" element={<FinancialStatements />} />
          <Route path="/journal-entries" element={<JournalEntries />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoicing" element={<Invoicing />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/products" element={<Products />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/treasury" element={<Treasury />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/budget" element={<Budget />} />

          <Route path="/settings" element={<SettingsLayout />} >
            <Route index element={<Settings />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="users" element={<UsersSettings />} />
            <Route path="licenses" element={<LicensesSettings />} />
          </Route>

          <Route path="/subscriptions" element={<SubscriptionSettings />} />
          <Route path="/admin-users" element={<AdminUserManagement />} />
          
          {/* Backoffice Routes */}
          <Route path="/admin-backoffice" element={<AdminBackoffice />} />
          <Route path="/admin-backoffice/users" element={<AdminBackofficeUsers />} />
          <Route path="/admin-backoffice/companies" element={<AdminBackofficeCompanies />} />
          <Route path="/admin-backoffice/stats" element={<AdminBackofficeStats />} />
          <Route path="/admin-backoffice/settings" element={<AdminBackofficeSettings />} />
          
          {/* Solutions Backoffice Routes */}
          <Route path="/admin-backoffice/solution/comptabilite" element={<AdminBackofficeSolutionComptabilite />} />
          <Route path="/admin-backoffice/solution/commerciale" element={<AdminBackofficeSolutionCommerciale />} />
          <Route path="/admin-backoffice/solution/entreprise" element={<AdminBackofficeSolutionEntreprise />} />
          
          {/* Solutions Routes */}
          <Route path="/solutions/comptabilite" element={<ComptabiliteSolution />} />
          <Route path="/solutions/commerciale" element={<CommercialeSolution />} />
          <Route path="/solutions/entreprise" element={<EntrepriseSolution />} />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/formation" element={<Formation />} />
          <Route path="/training" element={<TrainingSupport />} />
          <Route path="/training-standalone" element={<TrainingSupportStandalone />} />
          <Route path="/product-documentation" element={<ProductDocumentation />} />
          <Route path="/index" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
