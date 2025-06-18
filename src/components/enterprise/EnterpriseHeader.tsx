
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
  Warehouse,
  GraduationCap,
  LogOut,
  Globe2,
  FileBarChart,
  DollarSign,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { GSuiteLogo } from '@/components/ui/gsuite-logo';

const menuItems = [
  { icon: Globe2, label: 'Tableau de bord', path: '/dashboard' },
  { 
    icon: FileBarChart, 
    label: 'Comptabilité', 
    path: '/accounting',
    subItems: [
      { label: 'Plan comptable', path: '/chart-of-accounts' },
      { label: 'États financiers', path: '/financial-statements' },
      { label: 'Écritures comptables', path: '/journal-entries' }
    ]
  },
  { icon: Users, label: 'Contacts', path: '/contacts' },
  { icon: FileText, label: 'Facturation', path: '/invoicing' },
  { icon: ShoppingCart, label: 'Achats', path: '/purchases' },
  { icon: Package, label: 'Produits', path: '/products' },
  { icon: Warehouse, label: 'Stock', path: '/stock' },
  { icon: CreditCard, label: 'Trésorerie', path: '/treasury' },
  { icon: PieChart, label: 'Rapports', path: '/reports' },
  { icon: TrendingUp, label: 'Analyse', path: '/analytics' },
  { icon: DollarSign, label: 'Budget', path: '/budget' },
];

export const EnterpriseHeader = () => {
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

  const isSettingsBase = location.pathname.startsWith('/settings');
  const isAccountingBase = location.pathname.startsWith('/accounting') || location.pathname.startsWith('/chart-of-accounts');

  return (
    <Sidebar className="transition-all duration-300 ease-in-out">
      <SidebarHeader className="border-b border-sidebar-border/50">
        <div className="flex items-center space-x-3 p-2 transition-all duration-200 hover:bg-sidebar-accent/50 rounded-lg">
          <div className="transition-transform duration-200 hover:scale-105">
            <GSuiteLogo size={40} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground transition-colors duration-200">G-Suite</h1>
            <p className="text-sm text-sidebar-foreground/70 transition-colors duration-200">Gestion d'entreprise digitale</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isParentActive = item.path === '/accounting' && isAccountingBase;
                
                return (
                  <SidebarMenuItem key={item.path} className="transition-all duration-200">
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive || isParentActive}
                      className="transition-all duration-200 hover:scale-[1.02] hover:shadow-sm"
                    >
                      <Link to={item.path} className="group">
                        <Icon className="w-5 h-5 transition-all duration-200 group-hover:scale-110" />
                        <span className="font-medium transition-all duration-200">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                    {hasSubItems && (
                      <SidebarMenuSub className="animate-accordion-down">
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.path}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={location.pathname === subItem.path}
                              className="transition-all duration-200 hover:translate-x-1"
                            >
                              <Link to={subItem.path} className="group">
                                <BookOpen className="w-4 h-4 transition-all duration-200 group-hover:scale-110" />
                                <span className="transition-all duration-200">{subItem.label}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                );
              })}
              
              {/* Settings menu with sub-items */}
              <SidebarMenuItem className="transition-all duration-200">
                <SidebarMenuButton
                  isActive={isSettingsBase}
                  asChild={false}
                  aria-expanded={isSettingsBase}
                  className="transition-all duration-200 hover:scale-[1.02] hover:shadow-sm"
                >
                  <span className="flex items-center gap-2 group">
                    <Settings className="w-5 h-5 transition-all duration-200 group-hover:rotate-45" />
                    <span className="font-medium transition-all duration-200">Paramètres</span>
                  </span>
                </SidebarMenuButton>
                {isSettingsBase && (
                  <SidebarMenuSub className="animate-accordion-down">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={location.pathname === "/settings/profile"}
                        className="transition-all duration-200 hover:translate-x-1"
                      >
                        <Link to="/settings/profile">Profil de l'entreprise</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={location.pathname === "/settings/users"}
                        className="transition-all duration-200 hover:translate-x-1"
                      >
                        <Link to="/settings/users">Utilisateurs</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={location.pathname === "/settings/licenses"}
                        className="transition-all duration-200 hover:translate-x-1"
                      >
                        <Link to="/settings/licenses">Clés de licence</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border/50 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200 hover:scale-[1.02]"
              >
                <LogOut className="w-4 h-4 transition-all duration-200" />
                <span>Déconnexion</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="text-xs text-sidebar-foreground/50 text-center p-2 transition-colors duration-200">
          © 2024 G-Suite Entreprise v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
