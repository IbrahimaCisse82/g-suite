
/**
 * Définition des autorisations par rôle.
 */
export type Role =
  | "manager"
  | "comptable"
  | "commerciale"
  | "logistique"
  | "caissier";

// Les clés correspondent aux paths (routes principales)
export const ACCESS_MATRIX: Record<Role, string[]> = {
  manager: [
    // Accès total
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
  comptable: [
    "accounting",
    "treasury",
    "training",
  ],
  commerciale: [
    "invoicing",
    "purchases",
    "training",
  ],
  logistique: [
    "products",
    "stock",
    "training",
  ],
  caissier: [
    "treasury",
    "training",
  ],
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
  "/settings": "settings", // paramétrage (visible pour manager uniquement)
};
