
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
      "quotes",
      "invoicing",
      "purchases",
      "products",
      "stock",
      "treasury",
      "budget",
      "employees",
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
    // Commercial : contacts, devis, facturation, achats
    commercial: [
      "contacts",
      "quotes",
      "invoicing",
      "purchases",
    ],
    // Logisticien : produits, stock
    logistique: [
      "products",
      "stock",
    ],
    // Caissier : trésorerie uniquement
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
      "employees",
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
    // Manager : contacts, devis, facturation, achats, produits, stock, paramètres
    manager: [
      "contacts",
      "quotes",
      "invoicing",
      "purchases",
      "products",
      "stock",
      "employees",
      "settings",
    ],
    // Comptable : aucun accès
    comptable: [],
    // Commercial : contacts, devis, facturation, achats
    commercial: [
      "contacts",  
      "quotes",
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
  "/quotes": "quotes",
  "/invoicing": "invoicing",
  "/purchases": "purchases",
  "/products": "products",
  "/stock": "stock",
  "/treasury": "treasury",
  "/budget": "budget",
  "/employees": "employees",
  "/reports": "reports",
  "/analytics": "analytics",
  "/training": "training",
  "/settings": "settings",
};
