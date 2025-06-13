
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
  LogOut
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
} from '@/components/ui/sidebar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const menuItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', path: '/dashboard' },
  { icon: Calculator, label: 'Comptabilité', path: '/accounting' },
  { icon: Users, label: 'Contacts', path: '/contacts' },
  { icon: FileText, label: 'Facturation', path: '/invoicing' },
  { icon: ShoppingCart, label: 'Achats', path: '/purchases' },
  { icon: Package, label: 'Produits', path: '/products' },
  { icon: Warehouse, label: 'Stock', path: '/stock' },
  { icon: CreditCard, label: 'Trésorerie', path: '/treasury' },
  { icon: PieChart, label: 'Rapports', path: '/reports' },
  { icon: TrendingUp, label: 'Analyse', path: '/analytics' },
  { icon: GraduationCap, label: 'Formation', path: '/training' },
  { icon: Settings, label: 'Paramètres', path: '/settings' },
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

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-3 p-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <Building className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">G-Suite</h1>
            <p className="text-sm text-sidebar-foreground/70">Gestion d'entreprise</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.path}>
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="text-xs text-sidebar-foreground/50 text-center p-2">
          © 2024 G-Suite Entreprise v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
