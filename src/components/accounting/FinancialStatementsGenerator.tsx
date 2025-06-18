
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Download } from 'lucide-react';
import { useFinancialCalculations, EtatFinancier } from '@/hooks/useFinancialCalculations';
import { FinancialStatementsForm } from './FinancialStatementsForm';
import { FinancialStatementsHistory } from './FinancialStatementsHistory';
import { FinancialStatementsCharts } from './FinancialStatementsCharts';
import { FinancialStatementsDetails } from './FinancialStatementsDetails';

export const FinancialStatementsGenerator = () => {
  const [etatSelectionne, setEtatSelectionne] = useState<EtatFinancier | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const {
    historique,
    genererEtatsFinanciers,
    preparerDonneesBilan,
    preparerDonneesResultat,
    preparerDonneesFluxTresorerie
  } = useFinancialCalculations();

  const handleGenerate = (exerciceId: string, comptesInput: string) => {
    const nouvelEtat = genererEtatsFinanciers(exerciceId, comptesInput);
    if (nouvelEtat) {
      setEtatSelectionne(nouvelEtat);
    }
  };

  const exporterPDF = async () => {
    try {
      // Pour l'instant, on simule l'export PDF
      toast.success('Export PDF simulé - Fonctionnalité à développer');
    } catch (error) {
      toast.error('Erreur lors de l\'export PDF');
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinancialStatementsForm onGenerate={handleGenerate} />
        <FinancialStatementsHistory 
          historique={historique} 
          onSelectEtat={setEtatSelectionne} 
        />
      </div>

      {etatSelectionne && (
        <div className="space-y-6" ref={exportRef}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">États Financiers - Exercice {etatSelectionne.exerciceId}</h2>
            <Button onClick={exporterPDF} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter en PDF
            </Button>
          </div>

          <FinancialStatementsCharts
            etat={etatSelectionne}
            bilanData={preparerDonneesBilan(etatSelectionne)}
            resultatData={preparerDonneesResultat(etatSelectionne)}
            fluxData={preparerDonneesFluxTresorerie(etatSelectionne)}
          />

          <FinancialStatementsDetails etat={etatSelectionne} />
        </div>
      )}
    </div>
  );
};
