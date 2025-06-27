
import React, { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutDashboard, Menu, X } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

/**
 * Layout parent pour la section /settings et ses sous-pages
 * N'utilise pas Layout pour éviter la duplication du sidebar
 */
export default function SettingsLayout() {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isMainSettings = location.pathname === '/settings';

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={toggleSidebar}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header simplifié */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center max-w-5xl mx-auto">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
              <p className="text-sm text-gray-600">Configuration de votre application</p>
            </div>
          </div>
        </header>

        {/* Bouton retour au Dashboard (sauf si on est sur la page principale des paramètres) */}
        {!isMainSettings && (
          <div className="px-6 py-3 border-b border-gray-200 bg-white">
            <Link to="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <LayoutDashboard className="w-4 h-4" />
                <span>Retour au Dashboard</span>
              </Button>
            </Link>
          </div>
        )}

        {/* Contenu des pages */}
        <main className="flex-1 overflow-auto">
          <div className="min-h-full bg-gradient-to-br from-green-50 to-blue-50">
            <div className="max-w-5xl mx-auto py-8 flex flex-col gap-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
