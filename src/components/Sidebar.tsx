
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  FileBarChart,
  Target,
  UsersIcon,
  FileCheck,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAccessControl } from "@/hooks/useAccessControl";
import { GSuiteLogo } from '@/components/ui/gsuite-logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

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

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar = ({ isCollapsed = false, onToggle }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { filterNavigationItems, isLoading } = useAccessControl();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-sidebar flex flex-col border-r border-sidebar-border p-6 transition-all duration-300`}>
        <div className="animate-pulse h-6 bg-gray-200 rounded mb-4" />
        <div className="animate-pulse h-4 bg-gray-100 mb-2 rounded" />
        <div className="animate-pulse h-4 bg-gray-100 mb-2 rounded" />
      </div>
    );
  }

  const filteredMenuItems = filterNavigationItems(menuItems);

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border min-h-screen transition-all duration-300`}>
      {/* Header avec toggle */}
      <div className="p-4 border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <GSuiteLogo size={32} />
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">G-Suite</h1>
                <p className="text-xs text-sidebar-foreground/70">Gestion d'entreprise</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="flex justify-center">
              <GSuiteLogo size={32} />
            </div>
          )}
          {onToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-sidebar-foreground/80 hover:text-sidebar-foreground p-1"
            >
              {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 text-sm font-medium w-full ${
                isActive 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      
      {/* Bouton de déconnexion */}
      <div className="p-4 border-t border-sidebar-border flex-shrink-0">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className={`w-full text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground flex items-center ${
            isCollapsed ? 'justify-center px-2' : 'justify-start space-x-2'
          }`}
          title={isCollapsed ? 'Déconnexion' : undefined}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span>Déconnexion</span>}
        </Button>
        
        {!isCollapsed && (
          <div className="text-xs text-sidebar-foreground/50 mt-2 text-center">
            © 2024 G-Suite v1.0
          </div>
        )}
      </div>
    </div>
  );
};
