import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import Landing from "./pages/Landing";
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
import { Settings } from "./pages/Settings";
import CompanyRegistration from "./pages/CompanyRegistration";
import QuoteRequest from "./pages/QuoteRequest";
import NotFound from "./pages/NotFound";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminSetup } from "./pages/AdminSetup";
import { AdminPanel } from "./pages/AdminPanel";
import { SubscriptionSettings } from "./pages/SubscriptionSettings";
import CompanyAdminSetup from "./pages/CompanyAdminSetup";
import AdminSetupSuccess from "./pages/AdminSetupSuccess";
import TrainingSupport from "./pages/TrainingSupport";
import TrainingSupportStandalone from "./pages/TrainingSupportStandalone";
import ProductDocumentation from "./pages/ProductDocumentation";
import TrialActivation from "./pages/TrialActivation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/index" element={<Index />} />
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
          <Route path="/settings" element={<Settings />} />
          <Route path="/company-registration" element={<CompanyRegistration />} />
          <Route path="/quote-request" element={<QuoteRequest />} />
          <Route path="/subscription-settings" element={<SubscriptionSettings />} />
          
          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-setup" element={<AdminSetup />} />
          <Route path="/admin" element={<AdminPanel />} />
          
          {/* Company Admin Setup Routes */}
          <Route path="/company-admin-setup" element={<CompanyAdminSetup />} />
          <Route path="/admin-setup-success" element={<AdminSetupSuccess />} />
          
          {/* Trial activation route */}
          <Route path="/activate-trial/:token" element={<TrialActivation />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
