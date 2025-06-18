
/**
 * Mapping combiné {module: {role: features[]}}
 * Les clés de modules : "entreprise", "comptable", "budget"
 * Les rôles sont : "manager", "comptable", "budget", "logistique", "caissier"
 */
export type ModuleType = "entreprise" | "comptable" | "budget";
export type Role =
  | "manager"
  | "comptable"
  | "budget"
  | "logistique"
  | "caissier";

export const MODULE_ACCESS_MATRIX: Record<
  ModuleType,
  Record<Role, string[]>
> = {
  // SOLUTION ENTREPRISE
  entreprise: {
    // Manager : toutes les fonctionnalités
    manager: [
      "dashboard",
      "accounting",
      "contacts",
      "invoicing",
      "purchases",
      "products",
      "stock",
      "treasury",
      "reports",
      "analytics",
      "budget",
      "training",
      "settings",
    ],
    // Comptable : comptabilité, trésorerie, formation
    comptable: [
      "accounting",
      "treasury",
      "training",
    ],
    // Budget : contacts, facturation, achats, budget, formation
    budget: [
      "contacts",
      "invoicing",
      "purchases",
      "budget",
      "training",
    ],
    // Logisticien : produits, stock, formation
    logistique: [
      "products",
      "stock",
      "training",
    ],
    // Caissier : trésorerie, formation
    caissier: [
      "treasury",
      "training",
    ],
  },
  // SOLUTION COMPTABLE
  comptable: {
    // Manager : comptabilité, trésorerie, formation, paramètres
    manager: [
      "accounting",
      "treasury",
      "training",
      "settings",
    ],
    // Comptable : comptabilité, trésorerie, formation
    comptable: [
      "accounting",
      "treasury",
      "training",
    ],
    // Budget : aucun accès
    budget: [],
    // Logisticien : aucun accès
    logistique: [],
    // Caissier : trésorerie, formation
    caissier: [
      "treasury",
      "training",
    ],
  },
  // SOLUTION BUDGET
  budget: {
    // Manager : contacts, facturation, achats, produits, stock, budget, formation, paramètres
    manager: [
      "contacts",
      "invoicing",
      "purchases",
      "products",
      "stock",
      "budget",
      "training",
      "settings",
    ],
    // Comptable : aucun accès
    comptable: [],
    // Budget : contacts, facturation, achats, budget, formation
    budget: [
      "contacts",
      "invoicing",
      "purchases",
      "budget",
      "training",
    ],
    // Logisticien : produits, stock, formation
    logistique: [
      "products",
      "stock",
      "training",
    ],
    // Caissier : aucun accès
    caissier: [],
  },
};

/**
 * Mapping des paths de route vers un "slug" de fonctionnalité
 */
export const PATH_FEATURE_MAP: Record<string, string> = {
  "/dashboard": "dashboard",
  "/accounting": "accounting",
  "/contacts": "contacts",
  "/invoicing": "invoicing",
  "/purchases": "purchases",
  "/products": "products",
  "/stock": "stock",
  "/treasury": "treasury",
  "/reports": "reports",
  "/analytics": "analytics",
  "/budget": "budget",
  "/training": "training",
  "/settings": "settings",
};
