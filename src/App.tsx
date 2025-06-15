
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MobileWrapper } from "@/components/MobileWrapper";
import Landing from "./pages/Landing";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import { Contacts } from "./pages/Contacts";
import Invoicing from "./pages/Invoicing";
import { Products } from "./pages/Products";
import { Stock } from "./pages/Stock";
import { Purchases } from "./pages/Purchases";
import { Treasury } from "./pages/Treasury";
import { Accounting } from "./pages/Accounting";
import { Reports } from "./pages/Reports";
import { Analytics } from "./pages/Analytics";
import Settings from "./pages/Settings";
import CompanyRegistration from "./pages/CompanyRegistration";
import QuoteRequest from "./pages/QuoteRequest";
import NotFound from "./pages/NotFound";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminSetup } from "./pages/AdminSetup";
import { AdminBackend } from "./pages/AdminBackend";
import { SubscriptionSettings } from "./pages/SubscriptionSettings";
import CompanyAdminSetup from "./pages/CompanyAdminSetup";
import AdminSetupSuccess from "./pages/AdminSetupSuccess";
import TrainingSupport from "./pages/TrainingSupport";
import TrainingSupportStandalone from "./pages/TrainingSupportStandalone";
import ProductDocumentation from "./pages/ProductDocumentation";
import TrialActivation from "./pages/TrialActivation";
import UserLogin from "./pages/UserLogin";
import ComptabiliteSolution from "./pages/solutions/ComptabiliteSolution";
import CommercialeSolution from "./pages/solutions/CommercialeSolution";
import EntrepriseSolution from "./pages/solutions/EntrepriseSolution";
import SettingsLayout from "./pages/SettingsLayout";
import ProfileSettingsPage from "./pages/settings/ProfileSettings";
import UserManagementSettingsPage from "./pages/settings/UserManagementSettings";
import LicenseKeySettingsPage from "./pages/settings/LicenseKeySettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MobileWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/index" element={<Index />} />
            
            {/* Solutions Routes */}
            <Route path="/solutions/comptabilite" element={<ComptabiliteSolution />} />
            <Route path="/solutions/commerciale" element={<CommercialeSolution />} />
            <Route path="/solutions/entreprise" element={<EntrepriseSolution />} />
            
            {/* Enterprise Application Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/invoicing" element={<Invoicing />} />
            <Route path="/products" element={<Products />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/treasury" element={<Treasury />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/training" element={<TrainingSupport />} />
            <Route path="/formation" element={<TrainingSupportStandalone />} />
            <Route path="/product-documentation" element={<ProductDocumentation />} />
            
            <Route path="/subscription-settings" element={<SubscriptionSettings />} />
            
            {/* Company Registration and User Login */}
            <Route path="/company-registration" element={<CompanyRegistration />} />
            <Route path="/quote-request" element={<QuoteRequest />} />
            <Route path="/user-login" element={<UserLogin />} />
            
            {/* Admin Backend Routes (License Management Only) */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-setup" element={<AdminSetup />} />
            <Route path="/admin" element={<AdminBackend />} />
            
            {/* Company Admin Setup Routes */}
            <Route path="/company-admin-setup" element={<CompanyAdminSetup />} />
            <Route path="/admin-setup-success" element={<AdminSetupSuccess />} />
            
            {/* Trial activation route */}
            <Route path="/activate-trial/:token" element={<TrialActivation />} />
            
            {/* Section Paramètres */}
            <Route path="/settings" element={<SettingsLayout />}>
              <Route index element={<Settings />} /> {/* /settings résumé */}
              <Route path="profile" element={<ProfileSettingsPage />} />
              <Route path="users" element={<UserManagementSettingsPage />} />
              <Route path="licenses" element={<LicenseKeySettingsPage />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MobileWrapper>
      <Toaster />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
