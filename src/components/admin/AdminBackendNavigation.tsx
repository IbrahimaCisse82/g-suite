
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Settings,
  BarChart3,
  LogOut,
  Building2,
  CreditCard,
  Globe2,
  FileBarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAuthentication } from '@/hooks/useAdminAuthentication';
import { GSuiteLogo } from '@/components/ui/gsuite-logo';

const adminMenuItems = [
  { icon: Globe2, label: 'Tableau de bord', path: '/admin' },
  { icon: CreditCard, label: 'Gestion des licences', path: '/admin' },
  { icon: Settings, label: 'Configuration', path: '/admin-setup' },
];

export const AdminBackendNavigation = () => {
  const location = useLocation();
  const { logout } = useAdminAuthentication();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col border-r border-slate-700">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <GSuiteLogo size={40} />
          <div>
            <h1 className="text-xl font-bold text-white">Admin G-Suite</h1>
            <p className="text-sm text-slate-300">Gestion des licences</p>
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
        <div className="text-xs text-slate-400 mt-2 text-center">
          <div>© 2024 G-Suite Admin</div>
          <div className="flex items-center justify-center mt-1">
            <Building2 className="w-3 h-3 mr-1" />
            Gestion des licences v1.0
          </div>
        </div>
      </div>
    </div>
  );
};
