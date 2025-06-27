
import React from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

/**
 * Layout parent pour la section /settings et ses sous-pages
 * N'utilise pas Layout pour éviter la duplication du sidebar
 */
export default function SettingsLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header avec bouton de déconnexion */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">G-Suite Application</h1>
            <p className="text-sm text-gray-600">Paramètres</p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </Button>
        </div>
      </header>

      {/* Contenu des pages */}
      <div className="max-w-5xl mx-auto py-8 flex flex-col gap-8">
        <Outlet />
      </div>
    </div>
  );
}
