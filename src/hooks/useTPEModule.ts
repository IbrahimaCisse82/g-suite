
import { useState, useEffect } from 'react';

export interface TPEModuleConfig {
  facturation: boolean;
  contacts: boolean;
  comptabilite: boolean;
  stock: boolean;
  crm: boolean;
}

export interface TPEPricing {
  base: number;
  modules: Record<keyof TPEModuleConfig, number>;
  bundles: {
    name: string;
    modules: (keyof TPEModuleConfig)[];
    price: number;
    discount: number;
  }[];
}

const defaultPricing: TPEPricing = {
  base: 0, // Modules essentiels gratuits
  modules: {
    facturation: 0,
    contacts: 0,
    comptabilite: 15,
    stock: 10,
    crm: 20
  },
  bundles: [
    {
      name: 'TPE Complet',
      modules: ['facturation', 'contacts', 'comptabilite', 'stock', 'crm'],
      price: 39,
      discount: 20
    }
  ]
};

export const useTPEModule = () => {
  const [moduleConfig, setModuleConfig] = useState<TPEModuleConfig>({
    facturation: true,
    contacts: true,
    comptabilite: false,
    stock: false,
    crm: false
  });

  const [pricing] = useState<TPEPricing>(defaultPricing);

  const toggleModule = (module: keyof TPEModuleConfig, enabled: boolean) => {
    // Empêcher la désactivation des modules essentiels
    if ((module === 'facturation' || module === 'contacts') && !enabled) {
      return;
    }
    
    setModuleConfig(prev => ({
      ...prev,
      [module]: enabled
    }));
  };

  const calculateTotalPrice = (): number => {
    const enabledModules = Object.entries(moduleConfig)
      .filter(([_, enabled]) => enabled)
      .map(([module, _]) => module as keyof TPEModuleConfig);

    // Vérifier si éligible à un bundle
    const applicableBundle = pricing.bundles.find(bundle =>
      bundle.modules.every(module => enabledModules.includes(module)) &&
      enabledModules.length >= bundle.modules.length
    );

    if (applicableBundle) {
      return applicableBundle.price;
    }

    // Calcul prix individuel
    return enabledModules.reduce((total, module) => {
      return total + pricing.modules[module];
    }, pricing.base);
  };

  const getRecommendedBundle = (): string | null => {
    const enabledCount = Object.values(moduleConfig).filter(Boolean).length;
    if (enabledCount >= 3) {
      return 'Économisez avec le forfait TPE Complet !';
    }
    return null;
  };

  const isEssentialModule = (module: keyof TPEModuleConfig): boolean => {
    return module === 'facturation' || module === 'contacts';
  };

  return {
    moduleConfig,
    pricing,
    toggleModule,
    calculateTotalPrice,
    getRecommendedBundle,
    isEssentialModule,
    enabledModules: Object.entries(moduleConfig)
      .filter(([_, enabled]) => enabled)
      .map(([module, _]) => module as keyof TPEModuleConfig)
  };
};
