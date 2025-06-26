
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

// Import page components
import Index from '@/pages/Index';
import Landing from '@/pages/Landing';
import AboutUs from '@/pages/AboutUs';
import Contact from '@/pages/Contact';
import Formation from '@/pages/Formation';
import QuoteRequest from '@/pages/QuoteRequest';

// Import authentication components
import UserLogin from '@/pages/UserLogin';
import ResetPassword from '@/pages/ResetPassword';
import TrialActivation from '@/pages/TrialActivation';

// Import core application components
import Dashboard from '@/pages/Dashboard';
import { Accounting } from '@/pages/Accounting';
import { Contacts } from '@/pages/Contacts';
import Quotes from '@/pages/Quotes';
import { Invoicing } from '@/pages/Invoicing';
import { Purchases } from '@/pages/Purchases';
import { Products } from '@/pages/Products';
import { Stock } from '@/pages/Stock';
import { Treasury } from '@/pages/Treasury';
import Budget from '@/pages/Budget';
import Employees from '@/pages/Employees';
import { Reports } from '@/pages/Reports';
import { Analytics } from '@/pages/Analytics';
import NotFound from '@/pages/NotFound';

// Import TPE-specific pages
import TPEAssistant from '@/pages/TPEAssistant';
import TPEGuides from '@/pages/TPEGuides';
import JournalComptablePage from '@/pages/JournalComptable';
import GrandLivrePage from '@/pages/GrandLivre';
import BalanceGeneralePage from '@/pages/BalanceGenerale';

// Import settings components
import SettingsLayout from '@/pages/SettingsLayout';
import { Settings } from '@/pages/Settings';
import ProfileSettings from '@/pages/ProfileSettings';
import UsersSettings from '@/pages/UsersSettings';
import { SubscriptionSettings } from '@/pages/SubscriptionSettings';
import LicensesSettings from '@/pages/LicensesSettings';

// Import solution pages
import ComptabiliteSolution from '@/pages/solutions/ComptabiliteSolution';
import CommercialeSolution from '@/pages/solutions/CommercialeSolution';
import EntrepriseSolution from '@/pages/solutions/EntrepriseSolution';

// Import static pages
import Security from '@/pages/Security';
import Integrations from '@/pages/Integrations';
import Mobile from '@/pages/Mobile';
import HelpCenter from '@/pages/HelpCenter';
import ProductDocumentation from '@/pages/ProductDocumentation';
import LegalNotices from '@/pages/LegalNotices';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import CookiesPolicy from '@/pages/CookiesPolicy';

// Import admin components
import { SecureAdminLoginForm } from '@/components/admin/SecureAdminLoginForm';

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as any).status;
          if (status >= 400 && status < 500) {
            return false;
          }
        }
        return failureCount < 3;
      },
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/accueil" element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/formation" element={<Formation />} />
            <Route path="/quote-request" element={<QuoteRequest />} />

            {/* Solution pages */}
            <Route path="/solutions/comptabilite" element={<ComptabiliteSolution />} />
            <Route path="/solutions/commerciale" element={<CommercialeSolution />} />
            <Route path="/solutions/entreprise" element={<EntrepriseSolution />} />

            {/* Static pages */}
            <Route path="/security" element={<Security />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/mobile" element={<Mobile />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/product-documentation" element={<ProductDocumentation />} />
            <Route path="/legal-notices" element={<LegalNotices />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />

            {/* Admin routes */}
            <Route path="/admin-backoffice/login" element={<SecureAdminLoginForm />} />

            {/* Authentication routes */}
            <Route path="/auth/login" element={<UserLogin />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/trial-activation/:token" element={<TrialActivation />} />

            {/* Core application routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/journal-comptable" element={<JournalComptablePage />} />
            <Route path="/grand-livre" element={<GrandLivrePage />} />
            <Route path="/balance-generale" element={<BalanceGeneralePage />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/invoicing" element={<Invoicing />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/products" element={<Products />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/treasury" element={<Treasury />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />

            {/* TPE-specific routes */}
            <Route path="/tpe-assistant" element={<TPEAssistant />} />
            <Route path="/tpe-guides" element={<TPEGuides />} />

            {/* Settings routes */}
            <Route path="/settings" element={<SettingsLayout />}>
              <Route index element={<Settings />} />
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="users" element={<UsersSettings />} />
              <Route path="subscriptions" element={<SubscriptionSettings />} />
              <Route path="licenses" element={<LicensesSettings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'white',
                color: '#374151',
                border: '1px solid #E5E7EB',
              },
            }}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
