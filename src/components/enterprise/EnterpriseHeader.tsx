
import React from 'react';
import { useLocation } from 'react-router-dom';
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
  BookOpen,
  FileCheck,
  Target,
  UsersIcon
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
import { GSuiteLogo } from '@/components/ui/gsuite-logo';
import { OptimizedLink } from '@/components/common/OptimizedLink';

const menuItems = [
  { icon: Globe2, label: 'Tableau de bord', path: '/dashboard' },
  { icon: FileBarChart, label: 'Comptabilité', path: '/accounting' },
  { icon: BookOpen, label: 'Plan comptable', path: '/chart-of-accounts' },
  { icon: FileText, label: 'États financiers', path: '/financial-statements' },
  { icon: Calculator, label: 'Écritures comptables', path: '/journal-entries' },
  { icon: Users, label: 'Contacts', path: '/contacts' },
  { icon: FileCheck, label: 'Devis', path: '/quotes' },
  { icon: FileText, label: 'Facturation', path: '/invoicing' },
  { icon: ShoppingCart, label: 'Achats', path: '/purchases' },
  { icon: Package, label: 'Produits', path: '/products' },
  { icon: Warehouse, label: 'Stock', path: '/stock' },
  { icon: CreditCard, label: 'Trésorerie', path: '/treasury' },
  { icon: DollarSign, label: 'Budget', path: '/budget' },
  { icon: PieChart, label: 'Rapports', path: '/reports' },
  { icon: TrendingUp, label: 'Analyses', path: '/analytics' },
  { icon: UsersIcon, label: 'Employés', path: '/employees' },
  { icon: GraduationCap, label: 'Formation', path: '/training-support' },
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
          <GSuiteLogo size={40} />
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">G-Suite</h1>
            <p className="text-sm text-sidebar-foreground/70">Gestion d'entreprise digitale</p>
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
                      <OptimizedLink to={item.path}>
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </OptimizedLink>
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
