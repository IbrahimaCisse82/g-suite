
import { useState, useCallback } from 'react';

interface EcritureLine {
  account_number: string;
  account_name: string;
  debit: number;
  credit: number;
}

interface EcritureValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  totalDebit: number;
  totalCredit: number;
  isBalanced: boolean;
}

interface EcritureData {
  date: string;
  piece_number: string;
  description: string;
  lines: EcritureLine[];
}

export const useEcritureValidation = () => {
  const [validation, setValidation] = useState<EcritureValidation>({
    isValid: false,
    errors: [],
    warnings: [],
    totalDebit: 0,
    totalCredit: 0,
    isBalanced: false
  });

  const validateEcriture = useCallback((ecriture: EcritureData): EcritureValidation => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validation des champs obligatoires
    if (!ecriture.date) {
      errors.push('La date est obligatoire');
    }

    if (!ecriture.piece_number) {
      errors.push('Le numéro de pièce est obligatoire');
    }

    if (!ecriture.description || ecriture.description.trim().length < 3) {
      errors.push('La description doit contenir au moins 3 caractères');
    }

    if (!ecriture.lines || ecriture.lines.length < 2) {
      errors.push('Une écriture doit contenir au moins 2 lignes');
    }

    // Validation des lignes
    let totalDebit = 0;
    let totalCredit = 0;
    const accountsUsed = new Set<string>();

    if (ecriture.lines) {
      ecriture.lines.forEach((line, index) => {
        // Vérification du numéro de compte
        if (!line.account_number || line.account_number.length < 6) {
          errors.push(`Ligne ${index + 1}: Numéro de compte invalide`);
        }

        // Vérification du libellé de compte
        if (!line.account_name || line.account_name.trim().length < 2) {
          errors.push(`Ligne ${index + 1}: Libellé de compte obligatoire`);
        }

        // Vérification des montants
        if (line.debit === 0 && line.credit === 0) {
          errors.push(`Ligne ${index + 1}: Montant débit ou crédit obligatoire`);
        }

        if (line.debit > 0 && line.credit > 0) {
          errors.push(`Ligne ${index + 1}: Une ligne ne peut pas avoir à la fois un débit et un crédit`);
        }

        if (line.debit < 0 || line.credit < 0) {
          errors.push(`Ligne ${index + 1}: Les montants ne peuvent pas être négatifs`);
        }

        // Accumulation des totaux
        totalDebit += line.debit || 0;
        totalCredit += line.credit || 0;

        // Vérification des doublons de compte
        if (accountsUsed.has(line.account_number)) {
          warnings.push(`Le compte ${line.account_number} est utilisé plusieurs fois`);
        }
        accountsUsed.add(line.account_number);
      });
    }

    // Vérification de l'équilibre
    const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01; // Tolérance pour les arrondis

    if (!isBalanced) {
      errors.push(`L'écriture n'est pas équilibrée (Débit: ${totalDebit.toLocaleString()} XOF, Crédit: ${totalCredit.toLocaleString()} XOF)`);
    }

    // Avertissements SYSCOHADA
    if (totalDebit > 10000000) { // 10 millions XOF
      warnings.push('Montant élevé - Vérifiez la cohérence avec votre activité');
    }

    // Validation de la date
    const ecritureDate = new Date(ecriture.date);
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    if (ecritureDate > today) {
      errors.push('La date ne peut pas être dans le futur');
    }

    if (ecritureDate < oneYearAgo) {
      warnings.push('Écriture datée de plus d\'un an - Vérifiez si l\'exercice est encore ouvert');
    }

    const result: EcritureValidation = {
      isValid: errors.length === 0,
      errors,
      warnings,
      totalDebit,
      totalCredit,
      isBalanced
    };

    setValidation(result);
    return result;
  }, []);

  const validateAccountNumber = useCallback((accountNumber: string): { isValid: boolean; message?: string } => {
    if (!accountNumber || accountNumber.length < 6) {
      return { isValid: false, message: 'Le numéro de compte doit contenir au moins 6 chiffres' };
    }

    if (!/^\d+$/.test(accountNumber)) {
      return { isValid: false, message: 'Le numéro de compte ne doit contenir que des chiffres' };
    }

    const classe = parseInt(accountNumber.charAt(0));
    if (classe < 1 || classe > 8) {
      return { isValid: false, message: 'La classe de compte doit être entre 1 et 8 (SYSCOHADA)' };
    }

    return { isValid: true };
  }, []);

  const getSYSCOHADAClassDescription = useCallback((accountNumber: string): string => {
    if (!accountNumber) return '';
    
    const classe = parseInt(accountNumber.charAt(0));
    const descriptions = {
      1: 'Comptes de ressources durables',
      2: 'Comptes d\'actif immobilisé',
      3: 'Comptes de stocks',
      4: 'Comptes de tiers',
      5: 'Comptes de trésorerie',
      6: 'Comptes de charges',
      7: 'Comptes de produits',
      8: 'Comptes spéciaux'
    };

    return descriptions[classe as keyof typeof descriptions] || 'Classe inconnue';
  }, []);

  return {
    validation,
    validateEcriture,
    validateAccountNumber,
    getSYSCOHADAClassDescription
  };
};
