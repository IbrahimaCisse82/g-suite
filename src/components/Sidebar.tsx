
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Settings,
  PieChart,
  CreditCard,
  Package,
  Warehouse,
  GraduationCap,
  Globe2,          // Pour Entreprise
  ShoppingBag,     // Pour Commerciale
  FileBarChart     // Pour Comptabilité
} from 'lucide-react';
import { useProfileAccess } from "@/hooks/useProfileAccess";
import GsuiteLogo from "/gsuite-logo.png";

const menuItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', path: '/dashboard', feature: "dashboard" },
  { icon: FileBarChart, label: 'Comptabilité générale', path: '/accounting', feature: "accounting" }, // Compta
  { icon: Users, label: 'Clients & Fournisseurs', path: '/contacts', feature: "contacts" },
  { icon: FileText, label: 'Facturation', path: '/invoicing', feature: "invoicing" },
  { icon: ShoppingCart, label: 'Achats', path: '/purchases', feature: "purchases" },
  { icon: Package, label: 'Produits', path: '/products', feature: "products" },
  { icon: Warehouse, label: 'Stock', path: '/stock', feature: "stock" },
  { icon: CreditCard, label: 'Trésorerie', path: '/treasury', feature: "treasury" },
  { icon: PieChart, label: 'Rapports', path: '/reports', feature: "reports" },
  { icon: TrendingUp, label: 'Analyse', path: '/analytics', feature: "analytics" },
  { icon: GraduationCap, label: 'Formation', path: '/training', feature: "training" },
  { icon: Settings, label: 'Paramètres', path: '/settings', feature: "settings" },
];

export const Sidebar = () => {
  const location = useLocation();
  const { allowedFeatures, loading } = useProfileAccess();

  if (loading) {
    return (
      <div className="w-64 bg-sidebar flex flex-col border-r border-sidebar-border p-6">
        <div className="animate-pulse h-6 bg-gray-200 rounded mb-4" />
        <div className="animate-pulse h-4 bg-gray-100 mb-2 rounded" />
        <div className="animate-pulse h-4 bg-gray-100 mb-2 rounded" />
      </div>
    );
  }

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <img src={GsuiteLogo} alt="G-Suite Logo" className="w-10 h-10 object-contain rounded-md shadow" />
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">G-Suite</h1>
            <p className="text-sm text-sidebar-foreground/70">Gestion d'entreprise digitale</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems
          .filter(item => allowedFeatures.includes(item.feature))
          .map((item) => {
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
        <div className="text-xs text-sidebar-foreground/50">
          © 2024 G-Suite v1.0
        </div>
      </div>
    </div>
  );
};
