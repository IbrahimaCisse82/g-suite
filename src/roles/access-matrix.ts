
/**
 * Mapping combiné {module: {role: features[]}}
 * Les clés de modules : "entreprise", "comptable", "commercial"
 * Les rôles sont : "manager", "comptable", "commercial", "logistique", "caissier"
 */
export type ModuleType = "entreprise" | "comptable" | "commercial";
export type Role =
  | "manager"
  | "comptable"
  | "commercial"
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
    // Comptable : comptabilité, trésorerie, budget, formation
    comptable: [
      "accounting",
      "treasury",
      "budget",
      "training",
    ],
    // Commercial : contacts, facturation, achats, formation
    commercial: [
      "contacts",
      "invoicing",
      "purchases",
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
    // Manager : comptabilité, trésorerie, budget, formation, paramètres
    manager: [
      "accounting",
      "treasury",
      "budget",
      "training",
      "settings",
    ],
    // Comptable : comptabilité, trésorerie, budget, formation
    comptable: [
      "accounting",
      "treasury",
      "budget",
      "training",
    ],
    // Commercial : aucun accès
    commercial: [],
    // Logisticien : aucun accès
    logistique: [],
    // Caissier : trésorerie, formation
    caissier: [
      "treasury",
      "training",
    ],
  },
  // SOLUTION COMMERCIALE
  commercial: {
    // Manager : contacts, facturation, achats, produits, stock, formation, paramètres
    manager: [
      "contacts",
      "invoicing",
      "purchases",
      "products",
      "stock",
      "training",
      "settings",
    ],
    // Comptable : aucun accès
    comptable: [],
    // Commercial : contacts, facturation, achats, formation
    commercial: [
      "contacts",
      "invoicing",
      "purchases",
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
