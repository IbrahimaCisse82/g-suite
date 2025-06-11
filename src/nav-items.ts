
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

export const navItems = [
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
