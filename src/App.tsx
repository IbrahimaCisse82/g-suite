
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
import { Purchases } from "./pages/Purchases";
import { Treasury } from "./pages/Treasury";
import { Reports } from "./pages/Reports";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";
import { Products } from "./pages/Products";
import { Stock } from "./pages/Stock";

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
              <Purchases />
            </Layout>
          } />
          <Route path="/products" element={
            <Layout>
              <Products />
            </Layout>
          } />
          <Route path="/stock" element={
            <Layout>
              <Stock />
            </Layout>
          } />
          <Route path="/treasury" element={
            <Layout>
              <Treasury />
            </Layout>
          } />
          <Route path="/reports" element={
            <Layout>
              <Reports />
            </Layout>
          } />
          <Route path="/analytics" element={
            <Layout>
              <Analytics />
            </Layout>
          } />
          <Route path="/settings" element={
            <Layout>
              <Settings />
            </Layout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
