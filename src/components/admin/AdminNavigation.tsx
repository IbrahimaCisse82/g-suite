
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

const adminMenuItems = [
  { icon: BarChart3, label: 'Tableau de bord', path: '/admin' },
  { icon: Users, label: 'Demandes d\'abonnements', path: '/admin' },
  { icon: CreditCard, label: 'Gestion des plans', path: '/admin' },
  { icon: Settings, label: 'Configuration', path: '/admin-setup' },
];

export const AdminNavigation = () => {
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Déconnexion réussie');
      window.location.href = '/admin-login';
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col border-r border-slate-700">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-green-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Admin GrowHub</h1>
            <p className="text-sm text-slate-300">Panneau d'administration</p>
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
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <Button 
          onClick={handleLogout}
          variant="ghost" 
          className="w-full text-white hover:bg-slate-800 hover:text-white"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </Button>
        <div className="text-xs text-slate-400 mt-2">
          © 2024 GrowHub Admin v1.0
        </div>
      </div>
    </div>
  );
};
