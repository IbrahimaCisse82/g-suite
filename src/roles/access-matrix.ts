
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
  entreprise: {
    manager: [
      // Toutes les fonctionnalités
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
    comptable: ["accounting", "treasury", "training"],
    commerciale: ["contacts", "invoicing", "purchases", "training"],
    logistique: ["products", "stock", "training"],
    caissier: ["treasury", "training"],
  },
  comptable: {
    manager: ["accounting", "treasury", "training", "settings"],
    comptable: ["accounting", "treasury", "training"],
    caissier: ["treasury", "training"],
    commerciale: [],
    logistique: [],
  },
  commerciale: {
    manager: [
      "contacts",
      "invoicing",
      "purchases",
      "products",
      "stock",
      "training",
      "settings",
    ],
    commerciale: ["contacts", "invoicing", "purchases", "training"],
    logistique: ["products", "stock", "training"],
    comptable: [],
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
  "/settings": "settings", // paramétrage
};
