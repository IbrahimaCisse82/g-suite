
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Settings,
  Calculator,
  PieChart,
  CreditCard,
  Building,
  Package,
  Warehouse
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', path: '/dashboard' },
  { icon: Calculator, label: 'Comptabilité générale', path: '/accounting' },
  { icon: Users, label: 'Clients & Fournisseurs', path: '/contacts' },
  { icon: FileText, label: 'Facturation', path: '/invoicing' },
  { icon: ShoppingCart, label: 'Achats', path: '/purchases' },
  { icon: Package, label: 'Produits', path: '/products' },
  { icon: Warehouse, label: 'Stock', path: '/stock' },
  { icon: CreditCard, label: 'Trésorerie', path: '/treasury' },
  { icon: PieChart, label: 'Rapports', path: '/reports' },
  { icon: TrendingUp, label: 'Analyse', path: '/analytics' },
  { icon: Settings, label: 'Paramètres', path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <Building className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold">G-Compta</h1>
            <p className="text-sm text-slate-400">Gestion d'entreprise</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg' 
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
        <div className="text-xs text-slate-400">
          © 2024 G-Compta v1.0
        </div>
      </div>
    </div>
  );
};
