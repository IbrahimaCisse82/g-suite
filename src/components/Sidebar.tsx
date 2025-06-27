
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
  Globe2,
  ShoppingBag,
  FileBarChart,
  Target,
  UsersIcon,
  FileCheck
} from 'lucide-react';
import { useAccessControl } from "@/hooks/useAccessControl";
import { GSuiteLogo } from '@/components/ui/gsuite-logo';

const menuItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', path: '/dashboard', feature: "dashboard" },
  { icon: FileBarChart, label: 'Comptabilité', path: '/accounting', feature: "accounting" },
  { icon: Users, label: 'Contacts', path: '/contacts', feature: "contacts" },
  { icon: FileCheck, label: 'Devis', path: '/quotes', feature: "quotes" },
  { icon: FileText, label: 'Facturation', path: '/invoicing', feature: "invoicing" },
  { icon: ShoppingCart, label: 'Achats', path: '/purchases', feature: "purchases" },
  { icon: Package, label: 'Produits', path: '/products', feature: "products" },
  { icon: Warehouse, label: 'Stock', path: '/stock', feature: "stock" },
  { icon: CreditCard, label: 'Trésorerie', path: '/treasury', feature: "treasury" },
  { icon: Target, label: 'Budget', path: '/budget', feature: "budget" },
  { icon: UsersIcon, label: 'Employés', path: '/employees', feature: "employees" },
  { icon: PieChart, label: 'Rapports', path: '/reports', feature: "reports" },
  { icon: TrendingUp, label: 'Analytics', path: '/analytics', feature: "analytics" },
  { icon: GraduationCap, label: 'Formation', path: '/training-support', feature: "training" },
  { icon: Settings, label: 'Paramètres', path: '/settings', feature: "settings" },
];

export const Sidebar = () => {
  const location = useLocation();
  const { filterNavigationItems, isLoading } = useAccessControl();

  console.log('Sidebar rendering, location:', location.pathname); // Debug log

  if (isLoading) {
    return (
      <div className="w-64 bg-sidebar flex flex-col border-r border-sidebar-border p-6">
        <div className="animate-pulse h-6 bg-gray-200 rounded mb-4" />
        <div className="animate-pulse h-4 bg-gray-100 mb-2 rounded" />
        <div className="animate-pulse h-4 bg-gray-100 mb-2 rounded" />
      </div>
    );
  }

  const filteredMenuItems = filterNavigationItems(menuItems);
  console.log('Filtered menu items:', filteredMenuItems.length); // Debug log

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border min-h-screen">
      <div className="p-6 border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center space-x-3">
          <GSuiteLogo size={40} />
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">G-Suite</h1>
            <p className="text-sm text-sidebar-foreground/70">Gestion d'entreprise digitale</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium w-full ${
                isActive 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border flex-shrink-0">
        <div className="text-xs text-sidebar-foreground/50">
          © 2024 G-Suite v1.0
        </div>
      </div>
    </div>
  );
};
