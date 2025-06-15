
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
import Settings from "./pages/Settings";
import ProfileSettings from "./pages/ProfileSettings";
import UsersSettings from "./pages/UsersSettings";
import LicensesSettings from "./pages/LicensesSettings";
import { SubscriptionSettings } from "./pages/SubscriptionSettings";
import { Products } from "./pages/Products";
import { Stock } from "./pages/Stock";
import { Reports } from "./pages/Reports";
import Contact from "./pages/Contact";
import TrainingSupport from "./pages/TrainingSupport";
import TrainingSupportStandalone from "./pages/TrainingSupportStandalone";
import ProductDocumentation from "./pages/ProductDocumentation";
import Formation from "./pages/Formation";

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
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/settings" element={<SettingsLayout />} >
            <Route index element={<Settings />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="users" element={<UsersSettings />} />
            <Route path="licenses" element={<LicensesSettings />} />
          </Route>

          <Route path="/subscriptions" element={<SubscriptionSettings />} />
          <Route path="/products" element={<Products />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/reports" element={<Reports />} />
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
