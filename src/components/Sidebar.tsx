
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border min-h-screen transition-all duration-500 ease-in-out`}>
      {/* Header avec toggle */}
      <div className="p-4 border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="transform transition-transform duration-300 hover:scale-110">
                <GSuiteLogo size={32} />
              </div>
              <div className="transition-opacity duration-300">
                <h1 className="text-lg font-bold text-sidebar-foreground">G-Suite</h1>
                <p className="text-xs text-sidebar-foreground/70">Gestion d'entreprise</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="flex justify-center animate-fade-in">
              <div className="transform transition-transform duration-300 hover:scale-110">
                <GSuiteLogo size={32} />
              </div>
            </div>
          )}
          {onToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-sidebar-foreground/80 hover:text-sidebar-foreground p-1 transform transition-all duration-300 hover:scale-110 hover:bg-sidebar-accent rounded-lg"
            >
              <div className="transform transition-transform duration-300">
                {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </div>
            </Button>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredMenuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isHovered = hoveredItem === item.path;
          
          return (
            <div
              key={item.path}
              className="transform transition-all duration-200"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <Link
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium w-full relative overflow-hidden group ${
                  isActive 
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105' 
                    : 'text-sidebar-foreground/80 hover:bg-gradient-to-r hover:from-sidebar-accent hover:to-sidebar-accent/80 hover:text-sidebar-foreground hover:shadow-md hover:scale-102'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                {/* Effet de background animé */}
                <div className={`absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-600/20 opacity-0 transition-opacity duration-300 ${isHovered && !isActive ? 'opacity-100' : ''}`} />
                
                {/* Barre indicatrice à gauche pour l'élément actif */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full animate-scale-in" />
                )}
                
                <div className={`transform transition-all duration-300 ${isHovered ? 'scale-110' : ''} relative z-10`}>
                  <Icon className="w-5 h-5 flex-shrink-0" />
                </div>
                
                {!isCollapsed && (
                  <span className={`truncate transition-all duration-300 relative z-10 ${isHovered ? 'translate-x-1' : ''}`}>
                    {item.label}
                  </span>
                )}
                
                {/* Effet de shine au hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-1000 ${isHovered ? 'translate-x-full' : ''}`} />
              </Link>
            </div>
          );
        })}
      </nav>
      
      {/* Bouton de déconnexion */}
      <div className="p-4 border-t border-sidebar-border flex-shrink-0">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          onMouseEnter={() => setHoveredItem('logout')}
          onMouseLeave={() => setHoveredItem(null)}
          className={`w-full text-sidebar-foreground/80 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-600/10 hover:text-red-400 transition-all duration-300 hover:shadow-md hover:scale-105 rounded-xl group ${
            isCollapsed ? 'justify-center px-2' : 'justify-start space-x-2'
          }`}
          title={isCollapsed ? 'Déconnexion' : undefined}
        >
          <div className={`transform transition-all duration-300 ${hoveredItem === 'logout' ? 'scale-110 rotate-12' : ''}`}>
            <LogOut className="w-4 h-4" />
          </div>
          {!isCollapsed && (
            <span className={`transition-all duration-300 ${hoveredItem === 'logout' ? 'translate-x-1' : ''}`}>
              Déconnexion
            </span>
          )}
        </Button>
        
        {!isCollapsed && (
          <div className="text-xs text-sidebar-foreground/50 mt-2 text-center transition-opacity duration-300 opacity-70 hover:opacity-100">
            © 2024 G-Suite v1.0
          </div>
        )}
      </div>
    </div>
  );
};
