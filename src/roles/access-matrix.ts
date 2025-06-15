
/**
 * Mapping combiné {module: {role: features[]}}
 * Les clés de modules : "entreprise", "comptable", "commerciale"
 * Les rôles sont : "manager", "comptable", "commerciale", "logistique", "caissier"
 */
export type ModuleType = "entreprise" | "comptable" | "commerciale";
export type Role =
  | "manager"
  | "comptable"
  | "commerciale"
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
    // Comptable : comptabilité, trésorerie, formation
    comptable: [
      "accounting",
      "treasury",
      "training",
    ],
    // Commercial : contacts, facturation, achats, formation
    commerciale: [
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
    // Commercial : aucun accès
    commerciale: [],
    // Logisticien : aucun accès
    logistique: [],
    // Caissier : trésorerie, formation
    caissier: [
      "treasury",
      "training",
    ],
  },
  // SOLUTION COMMERCIALE
  commerciale: {
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
    commerciale: [
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
  "/training": "training",
  "/settings": "settings",
};
