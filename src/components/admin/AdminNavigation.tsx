
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Settings, 
  Users, 
  CreditCard,
  BarChart3,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { GSuiteLogo } from '@/components/ui/gsuite-logo';
import { Globe2, FileBarChart, ShoppingBag } from 'lucide-react';

const adminMenuItems = [
  { icon: Globe2, label: 'Tableau de bord', path: '/admin' },
  { icon: Users, label: "Demandes d'abonnements", path: '/admin' },
  { icon: FileBarChart, label: "Gestion des plans", path: '/admin' },
  { icon: Settings, label: 'Configuration', path: '/admin-setup' },
];

export const AdminNavigation = () => {
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Déconnexion réussie');
      window.location.href = '/';
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <GSuiteLogo size={40} />
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">Admin G-Suite</h1>
            <p className="text-sm text-sidebar-foreground/70">Gestion des licences</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {adminMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <Button 
          onClick={handleLogout}
          variant="ghost" 
          className="w-full text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </Button>
        <div className="text-xs text-sidebar-foreground/50 mt-2">
          © 2024 GrowHub Admin v1.0
        </div>
      </div>
    </div>
  );
};
