
import { useState } from 'react';
import { toast } from 'sonner';

interface Compte {
  numero: string;
  libelle: string;
  soldeDebiteur: number;
  soldeCrediteur: number;
}

interface EtatFinancier {
  id: string;
  exerciceId: string;
  bilanActif: Compte[];
  bilanPassif: Compte[];
  compteResultat: Compte[];
  fluxTresorerie: Compte[];
  dateCreation: string;
}

export const useFinancialCalculations = () => {
  const [historique, setHistorique] = useState<EtatFinancier[]>([]);

  const calculerBilan = (comptes: Compte[]) => {
    const actif = comptes.filter(c => ['1', '2', '3', '4', '5'].includes(c.numero.charAt(0)) && 
                                   !c.numero.startsWith('1') || 
                                   c.numero.startsWith('2') || 
                                   c.numero.startsWith('3') || 
                                   c.numero.startsWith('4') || 
                                   c.numero.startsWith('5'));
    const passif = comptes.filter(c => c.numero.startsWith('1') && !c.numero.startsWith('10'));
    return { actif, passif };
  };

  const calculerCompteResultat = (comptes: Compte[]) => {
    return comptes.filter(c => c.numero.startsWith('6') || c.numero.startsWith('7'));
  };

  const calculerFluxTresorerie = (comptes: Compte[]) => {
    return comptes.filter(c => c.numero.startsWith('5'));
  };

  const genererEtatsFinanciers = (exerciceId: string, comptesInput: string) => {
    try {
      const comptes: Compte[] = JSON.parse(comptesInput);
      
      if (!exerciceId.trim()) {
        toast.error('Veuillez saisir un ID d\'exercice');
        return null;
      }

      const { actif, passif } = calculerBilan(comptes);
      const compteResultat = calculerCompteResultat(comptes);
      const fluxTresorerie = calculerFluxTresorerie(comptes);

      const nouvelEtat: EtatFinancier = {
        id: Date.now().toString(),
        exerciceId,
        bilanActif: actif,
        bilanPassif: passif,
        compteResultat,
        fluxTresorerie,
        dateCreation: new Date().toISOString(),
      };

      setHistorique(prev => [nouvelEtat, ...prev]);
      toast.success('États financiers générés avec succès');
      return nouvelEtat;
      
    } catch (error) {
      toast.error('Erreur dans le format JSON des comptes');
      return null;
    }
  };

  const preparerDonneesBilan = (etat: EtatFinancier) => {
    const totalActif = etat.bilanActif.reduce((acc, c) => acc + c.soldeDebiteur - c.soldeCrediteur, 0);
    const totalPassif = etat.bilanPassif.reduce((acc, c) => acc + c.soldeCrediteur - c.soldeDebiteur, 0);
    
    return [
      { name: 'Actif', montant: totalActif },
      { name: 'Passif', montant: totalPassif },
    ];
  };

  const preparerDonneesResultat = (etat: EtatFinancier) => {
    const charges = etat.compteResultat
      .filter(c => c.numero.startsWith('6'))
      .reduce((acc, c) => acc + c.soldeDebiteur, 0);
    
    const produits = etat.compteResultat
      .filter(c => c.numero.startsWith('7'))
      .reduce((acc, c) => acc + c.soldeCrediteur, 0);
    
    return [
      { name: 'Charges', montant: charges, fill: '#ef4444' },
      { name: 'Produits', montant: produits, fill: '#22c55e' },
      { name: 'Résultat', montant: produits - charges, fill: produits - charges >= 0 ? '#22c55e' : '#ef4444' }
    ];
  };

  const preparerDonneesFluxTresorerie = (etat: EtatFinancier) => {
    return etat.fluxTresorerie.map(c => ({
      name: c.libelle.length > 20 ? c.libelle.substring(0, 20) + '...' : c.libelle,
      montant: c.soldeDebiteur - c.soldeCrediteur
    }));
  };

  return {
    historique,
    genererEtatsFinanciers,
    preparerDonneesBilan,
    preparerDonneesResultat,
    preparerDonneesFluxTresorerie
  };
};

export type { Compte, EtatFinancier };
