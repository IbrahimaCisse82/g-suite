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
  ShoppingBag
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
import GsuiteLogo from "/gsuite-logo.png";
import { Briefcase } from 'lucide-react';

const menuItems = [
  { icon: Globe2, label: 'Tableau de bord', path: '/dashboard' }, // Globe2 pour l’aspect global entreprise
  { icon: FileBarChart, label: 'Comptabilité', path: '/accounting' }, // FileBarChart pour la compta
  { icon: Users, label: 'Contacts', path: '/contacts' },
  { icon: FileText, label: 'Facturation', path: '/invoicing' },
  { icon: ShoppingCart, label: 'Achats', path: '/purchases' },
  { icon: Package, label: 'Produits', path: '/products' },
  { icon: Warehouse, label: 'Stock', path: '/stock' },
  { icon: CreditCard, label: 'Trésorerie', path: '/treasury' },
  { icon: PieChart, label: 'Rapports', path: '/reports' },
  { icon: TrendingUp, label: 'Analyse', path: '/analytics' },
  { icon: ShoppingBag, label: 'Commercial', path: '/training' }, // ShoppingBag pour Commerciale
  // Retirer l'entrée "Paramètres" ici (on va l'ajouter avec son sous-menu plus bas)
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

  // Helper pour savoir si un chemin est "actif" ou dans un sous-menu de paramètres
  const isSettingsBase = location.pathname.startsWith('/settings');

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-3 p-2">
          <img src={GsuiteLogo} alt="G-Suite Logo" className="w-10 h-10 object-contain rounded-md shadow" />
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
                      <Link to={item.path}>
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              {/* Bloc Paramètres avec sous-menu */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={isSettingsBase}
                  // Désactive le lien si on affiche le sous-menu
                  asChild={false}
                  aria-expanded={isSettingsBase}
                >
                  <span className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Paramètres</span>
                  </span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={location.pathname === "/settings/profile"}
                    >
                      <Link to="/settings/profile">Profil de l'entreprise</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={location.pathname === "/settings/users"}
                    >
                      <Link to="/settings/users">Utilisateurs</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={location.pathname === "/settings/licenses"}
                    >
                      <Link to="/settings/licenses">Clés de licence</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
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
