
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
      "training",
      "settings",
    ],
    // Comptable : comptabilité, trésorerie, budget
    comptable: [
      "accounting",
      "treasury",
      "budget",
    ],
    // Commercial : contacts, facturation, achats
    commercial: [
      "contacts",
      "invoicing",
      "purchases",
    ],
    // Logisticien : produits, stock
    logistique: [
      "products",
      "stock",
    ],
    // Caissier : trésorerie
    caissier: [
      "treasury",
    ],
  },
  // SOLUTION COMPTABLE
  comptable: {
    // Manager : comptabilité, trésorerie, budget, paramètres
    manager: [
      "accounting",
      "treasury",
      "budget",
      "settings",
    ],
    // Comptable : comptabilité, trésorerie, budget
    comptable: [
      "accounting",
      "treasury",
      "budget",
    ],
    // Commercial : aucun accès
    commercial: [],
    // Logisticien : aucun accès
    logistique: [],
    // Caissier : trésorerie
    caissier: [
      "treasury",
    ],
  },
  // SOLUTION COMMERCIALE
  commercial: {
    // Manager : contacts, facturation, achats, produits, stock, paramètres
    manager: [
      "contacts",
      "invoicing",
      "purchases",
      "products",
      "stock",
      "settings",
    ],
    // Comptable : aucun accès
    comptable: [],
    // Commercial : contacts, facturation, achats
    commercial: [
      "contacts",
      "invoicing",
      "purchases",
    ],
    // Logisticien : produits, stock
    logistique: [
      "products",
      "stock",
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
