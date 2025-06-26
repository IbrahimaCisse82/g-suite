
import {
  LayoutDashboard,
  Calculator,
  Users,
  FileText,
  ShoppingCart,
  Package,
  Warehouse,
  TrendingUp,
  BarChart3,
  PiggyBank,
  Settings,
  BookOpen,
  HelpCircle,
  UserPlus,
  Receipt,
  Coins,
  UsersIcon,
  Target,
  FileCheck
} from "lucide-react";

export const navItems = [
  {
    title: "Tableau de bord",
    to: "/dashboard",
    icon: LayoutDashboard,
    variant: "default" as const,
  },
  {
    title: "Comptabilité",
    to: "/accounting",
    icon: Calculator,
    variant: "ghost" as const,
  },
  {
    title: "Contacts",
    to: "/contacts",
    icon: Users,
    variant: "ghost" as const,
  },
  {
    title: "Devis",
    to: "/quotes",
    icon: FileCheck,
    variant: "ghost" as const,
  },
  {
    title: "Facturation",
    to: "/invoicing",
    icon: FileText,
    variant: "ghost" as const,
  },
  {
    title: "Achats",
    to: "/purchases",
    icon: ShoppingCart,
    variant: "ghost" as const,
  },
  {
    title: "Produits",
    to: "/products",
    icon: Package,
    variant: "ghost" as const,
  },
  {
    title: "Stock",
    to: "/stock",
    icon: Warehouse,
    variant: "ghost" as const,
  },
  {
    title: "Trésorerie",
    to: "/treasury",
    icon: Coins,
    variant: "ghost" as const,
  },
  {
    title: "Budget",
    to: "/budget",
    icon: Target,
    variant: "ghost" as const,
  },
  {
    title: "Employés",
    to: "/employees",
    icon: UsersIcon,
    variant: "ghost" as const,
  },
  {
    title: "Rapports",
    to: "/reports",
    icon: BarChart3,
    variant: "ghost" as const,
  },
  {
    title: "Analytics",
    to: "/analytics",
    icon: TrendingUp,
    variant: "ghost" as const,
  },
  {
    title: "Formation",
    to: "/training-support",
    icon: BookOpen,
    variant: "ghost" as const,
  },
  {
    title: "Paramètres",
    to: "/settings",
    icon: Settings,
    variant: "ghost" as const,
  }
];
