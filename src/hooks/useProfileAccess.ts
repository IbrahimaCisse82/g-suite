
import { useCompanyProfile } from "@/hooks/useCompanyData";
import { ACCESS_MATRIX, PATH_FEATURE_MAP, Role } from "@/roles/access-matrix";

/**
 * Utilitaire : Retourne le rôle associé au profil connecté.
 * ATTENTION : suppose que le champ profile.role est bien renseigné (manager, comptable, commerciale, logistique, caissier)
 * Adapter si besoin.
 */
export function useProfileAccess() {
  const { data: profile, isLoading } = useCompanyProfile();

  // Exemple : profile.role = "manager"
  const role = (profile?.role?.toLowerCase?.() as Role) || "manager";

  // Liste des fonctionnalités autorisées pour ce rôle
  const allowedFeatures: string[] = ACCESS_MATRIX[role] || [];

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
    loading: isLoading,
    profile,
  };
}
