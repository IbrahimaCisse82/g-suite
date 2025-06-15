
import { useCompanyProfile } from "@/hooks/useCompanyData";
import { MODULE_ACCESS_MATRIX, PATH_FEATURE_MAP, Role, ModuleType } from "@/roles/access-matrix";

/**
 * Détecte le module actif de l'entreprise à partir du profil.
 * NB: Adapter ce code si besoin pour détecter le module autrement.
 */
function getActiveModule(profile: any): ModuleType {
  // ESSAYER de détecter d'après le profil ou company
  // Adapter ici la source "plan_type" selon STRATEGIE réelle :
  // 1. Soit profile.companies.plan_type
  // 2. Soit profile.active_module
  // 3. Soit profile.plan_type
  const mod =
    profile?.companies?.plan_type ||
    profile?.active_module ||
    profile?.plan_type ||
    "entreprise"; // fallback
  
  // Normaliser la valeur
  if (["entreprise", "comptable", "commerciale"].includes(mod)) {
    return mod as ModuleType;
  }
  // Si valeur pas trouvée
  return "entreprise";
}

/**
 * Utilitaire : Retourne le rôle associé au profil connecté et le module d'abonnement de l'entreprise.
 */
export function useProfileAccess() {
  const { data: profile, isLoading } = useCompanyProfile();

  // Récupération du module actif (entreprise, comptable, commerciale)
  const moduleType = getActiveModule(profile);

  // Exemple : profile.role = "manager"
  const role = (profile?.role?.toLowerCase?.() as Role) || "manager";

  // Liste des fonctionnalités autorisées pour ce rôle ET ce module
  const allowedFeatures: string[] =
    MODULE_ACCESS_MATRIX[moduleType]?.[role] || [];

  /**
   * Vérifie si l'utilisateur courant peut accéder à la fonctionnalité liée à un path
   */
  function hasAccess(path: string) {
    const feature = PATH_FEATURE_MAP[path];
    if (!feature) return false;
    return allowedFeatures.includes(feature);
  }

  return {
    allowedFeatures,
    hasAccess,
    role,
    moduleType,
    loading: isLoading,
    profile,
  };
}

