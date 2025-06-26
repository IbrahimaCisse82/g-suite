
import { useCompanyProfile } from "@/hooks/useCompanyData";
import { MODULE_ACCESS_MATRIX, PATH_FEATURE_MAP, Role, ModuleType } from "@/roles/access-matrix";

/**
 * Hook simplifié pour la gestion des accès
 * Corrige les incohérences du système de rôles
 */
export function useAccessControl() {
  const { data: profile, isLoading } = useCompanyProfile();

  // Détection du module actif avec fallback sécurisé
  const getActiveModule = (): ModuleType => {
    // Pour l'instant, on utilise le business_sector ou on définit par défaut
    // En attendant l'ajout des champs plan_type/module_type dans la base
    if (profile?.companies && Array.isArray(profile.companies) && profile.companies.length > 0) {
      const company = profile.companies[0];
      
      // Logique temporaire basée sur le secteur d'activité
      const businessSector = company?.business_sector?.toLowerCase();
      
      if (businessSector?.includes('comptable') || businessSector?.includes('accounting')) {
        return "comptable";
      } else if (businessSector?.includes('commercial') || businessSector?.includes('sales')) {
        return "commercial";
      }
    }
    
    // Fallback par défaut - solution entreprise complète
    return "entreprise";
  };

  const moduleType = getActiveModule();
  const role = (profile?.role?.toLowerCase() as Role) || "manager";
  
  // Fonctionnalités autorisées selon le module ET le rôle
  const allowedFeatures = MODULE_ACCESS_MATRIX[moduleType]?.[role] || [];

  /**
   * Vérifie l'accès à une route spécifique
   */
  const hasAccess = (path: string): boolean => {
    const feature = PATH_FEATURE_MAP[path];
    return feature ? allowedFeatures.includes(feature) : false;
  };

  /**
   * Vérifie l'accès à une fonctionnalité directement
   */
  const hasFeatureAccess = (feature: string): boolean => {
    return allowedFeatures.includes(feature);
  };

  /**
   * Filtre les éléments de navigation selon les accès
   */
  const filterNavigationItems = (items: any[]) => {
    return items.filter(item => {
      if (item.feature) {
        return hasFeatureAccess(item.feature);
      }
      if (item.path) {
        return hasAccess(item.path);
      }
      return true;
    });
  };

  return {
    moduleType,
    role,
    allowedFeatures,
    hasAccess,
    hasFeatureAccess,
    filterNavigationItems,
    isLoading,
    profile
  };
}
