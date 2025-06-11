
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Accounting } from "./pages/Accounting";
import Landing from "./pages/Landing";
import CompanyRegistration from "./pages/CompanyRegistration";
import QuoteRequest from "./pages/QuoteRequest";
import NotFound from "./pages/NotFound";
import { Contacts } from "./pages/Contacts";
import { Invoicing } from "./pages/Invoicing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<CompanyRegistration />} />
          <Route path="/quote" element={<QuoteRequest />} />
          <Route path="/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/accounting" element={
            <Layout>
              <Accounting />
            </Layout>
          } />
          <Route path="/contacts" element={
            <Layout>
              <Contacts />
            </Layout>
          } />
          <Route path="/invoicing" element={
            <Layout>
              <Invoicing />
            </Layout>
          } />
          <Route path="/purchases" element={
            <Layout>
              <div className="p-8">
                <h1 className="text-2xl font-bold">Module Achats</h1>
                <p className="text-gray-600 mt-2">En cours de développement...</p>
              </div>
            </Layout>
          } />
          <Route path="/treasury" element={
            <Layout>
              <div className="p-8">
                <h1 className="text-2xl font-bold">Module Trésorerie</h1>
                <p className="text-gray-600 mt-2">En cours de développement...</p>
              </div>
            </Layout>
          } />
          <Route path="/reports" element={
            <Layout>
              <div className="p-8">
                <h1 className="text-2xl font-bold">Module Rapports</h1>
                <p className="text-gray-600 mt-2">En cours de développement...</p>
              </div>
            </Layout>
          } />
          <Route path="/analytics" element={
            <Layout>
              <div className="p-8">
                <h1 className="text-2xl font-bold">Module Analyse</h1>
                <p className="text-gray-600 mt-2">En cours de développement...</p>
              </div>
            </Layout>
          } />
          <Route path="/settings" element={
            <Layout>
              <div className="p-8">
                <h1 className="text-2xl font-bold">Paramètres</h1>
                <p className="text-gray-600 mt-2">En cours de développement...</p>
              </div>
            </Layout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
