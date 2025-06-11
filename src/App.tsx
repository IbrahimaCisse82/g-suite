
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Accounting } from "./pages/Accounting";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/contacts" element={<div className="p-8"><h1 className="text-2xl font-bold">Module Clients & Fournisseurs</h1><p className="text-gray-600 mt-2">En cours de développement...</p></div>} />
            <Route path="/invoicing" element={<div className="p-8"><h1 className="text-2xl font-bold">Module Facturation</h1><p className="text-gray-600 mt-2">En cours de développement...</p></div>} />
            <Route path="/purchases" element={<div className="p-8"><h1 className="text-2xl font-bold">Module Achats</h1><p className="text-gray-600 mt-2">En cours de développement...</p></div>} />
            <Route path="/treasury" element={<div className="p-8"><h1 className="text-2xl font-bold">Module Trésorerie</h1><p className="text-gray-600 mt-2">En cours de développement...</p></div>} />
            <Route path="/reports" element={<div className="p-8"><h1 className="text-2xl font-bold">Module Rapports</h1><p className="text-gray-600 mt-2">En cours de développement...</p></div>} />
            <Route path="/analytics" element={<div className="p-8"><h1 className="text-2xl font-bold">Module Analyse</h1><p className="text-gray-600 mt-2">En cours de développement...</p></div>} />
            <Route path="/settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Paramètres</h1><p className="text-gray-600 mt-2">En cours de développement...</p></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
