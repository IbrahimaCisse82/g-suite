
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import UserLogin from "./pages/UserLogin";
import CompanyRegistration from "./pages/CompanyRegistration";
import Dashboard from "./pages/Dashboard";
import { Accounting } from "./pages/Accounting";
import { ChartOfAccounts } from "./pages/ChartOfAccounts";
import JournalEntries from "./pages/JournalEntries";
import FinancialStatements from "./pages/FinancialStatements";
import { Contacts } from "./pages/Contacts";
import { Invoicing } from "./pages/Invoicing";
import { Purchases } from "./pages/Purchases";
import { Products } from "./pages/Products";
import { Stock } from "./pages/Stock";
import { Treasury } from "./pages/Treasury";
import { Reports } from "./pages/Reports";
import { Analytics } from "./pages/Analytics";
import TrainingSupportStandalone from "./pages/TrainingSupportStandalone";
import TrainingSupport from "./pages/TrainingSupport";
import { Settings } from "./pages/Settings";
import SettingsLayout from "./pages/SettingsLayout";
import ProfileSettings from "./pages/ProfileSettings";
import UsersSettings from "./pages/UsersSettings";
import LicensesSettings from "./pages/LicensesSettings";
import Security from "./pages/Security";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import TrialActivation from "./pages/TrialActivation";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Mobile from "./pages/Mobile";
import HelpCenter from "./pages/HelpCenter";
import Formation from "./pages/Formation";
import Contact from "./pages/Contact";
import QuoteRequest from "./pages/QuoteRequest";
import ProductDocumentation from "./pages/ProductDocumentation";
import AboutUs from "./pages/AboutUs";
import LegalNotices from "./pages/LegalNotices";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiesPolicy from "./pages/CookiesPolicy";
import Budget from "./pages/Budget";
import Integrations from "./pages/Integrations";
import { SubscriptionSettings } from "./pages/SubscriptionSettings";
import EntrepriseSolution from "./pages/solutions/EntrepriseSolution";
import ComptabiliteSolution from "./pages/solutions/ComptabiliteSolution";
import CommercialeSolution from "./pages/solutions/CommercialeSolution";
import AdminBackoffice from "./pages/AdminBackoffice";
import AdminBackofficeUsers from "./pages/AdminBackofficeUsers";
import AdminBackofficeCompanies from "./pages/AdminBackofficeCompanies";
import AdminBackofficeStats from "./pages/AdminBackofficeStats";
import AdminBackofficeSettings from "./pages/AdminBackofficeSettings";
import AdminBackofficeRoles from "./pages/AdminBackofficeRoles";
import AdminBackofficeDatabase from "./pages/AdminBackofficeDatabase";
import AdminBackofficeSolutionEntreprise from "./pages/AdminBackofficeSolutionEntreprise";
import AdminBackofficeSolutionComptabilite from "./pages/AdminBackofficeSolutionComptabilite";
import AdminBackofficeSolutionCommerciale from "./pages/AdminBackofficeSolutionCommerciale";
import TPEOnboarding from "./pages/TPEOnboarding";
import TPEModules from "./pages/TPEModules";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Landing />} />
            <Route path="/index" element={<Index />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/register" element={<CompanyRegistration />} />
            <Route path="/company-registration" element={<CompanyRegistration />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/trial-activation" element={<TrialActivation />} />
            
            {/* Routes application principale */}
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
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/training" element={<TrainingSupport />} />
            <Route path="/training-standalone" element={<TrainingSupportStandalone />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/security" element={<Security />} />
            <Route path="/mobile" element={<Mobile />} />
            
            {/* Routes paramètres */}
            <Route path="/settings" element={<SettingsLayout />}>
              <Route index element={<Settings />} />
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="users" element={<UsersSettings />} />
              <Route path="licenses" element={<LicensesSettings />} />
              <Route path="subscriptions" element={<SubscriptionSettings />} />
            </Route>
            
            {/* Routes backoffice admin */}
            <Route path="/admin-backoffice/login" element={<AdminLogin />} />
            <Route path="/admin-backoffice" element={<AdminBackoffice />} />
            <Route path="/admin-backoffice/users" element={<AdminBackofficeUsers />} />
            <Route path="/admin-backoffice/companies" element={<AdminBackofficeCompanies />} />
            <Route path="/admin-backoffice/roles" element={<AdminBackofficeRoles />} />
            <Route path="/admin-backoffice/database" element={<AdminBackofficeDatabase />} />
            <Route path="/admin-backoffice/stats" element={<AdminBackofficeStats />} />
            <Route path="/admin-backoffice/settings" element={<AdminBackofficeSettings />} />
            <Route path="/admin-backoffice/solution/entreprise" element={<AdminBackofficeSolutionEntreprise />} />
            <Route path="/admin-backoffice/solution/comptabilite" element={<AdminBackofficeSolutionComptabilite />} />
            <Route path="/admin-backoffice/solution/commerciale" element={<AdminBackofficeSolutionCommerciale />} />
            
            {/* Routes solutions */}
            <Route path="/solutions/entreprise" element={<EntrepriseSolution />} />
            <Route path="/solutions/comptabilite" element={<ComptabiliteSolution />} />
            <Route path="/solutions/commerciale" element={<CommercialeSolution />} />
            
            {/* Routes TPE */}
            <Route path="/tpe/onboarding" element={<TPEOnboarding />} />
            <Route path="/tpe/modules" element={<TPEModules />} />
            
            {/* Routes informatives */}
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/formation" element={<Formation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<QuoteRequest />} />
            <Route path="/docs" element={<ProductDocumentation />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/legal" element={<LegalNotices />} />
            <Route path="/legal-notices" element={<LegalNotices />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiesPolicy />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />
            
            {/* Route 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
