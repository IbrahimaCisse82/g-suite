
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
    // Vérifier si companies existe et est un tableau non vide
    if (profile?.companies && Array.isArray(profile.companies) && profile.companies.length > 0) {
      // Prendre la première company et vérifier ses propriétés
      const company = profile.companies[0];
      const moduleFromCompany = company?.plan_type || company?.module_type;
      
      if (["entreprise", "comptable", "commercial"].includes(moduleFromCompany)) {
        return moduleFromCompany as ModuleType;
      }
    }
    
    // Fallback par défaut
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
