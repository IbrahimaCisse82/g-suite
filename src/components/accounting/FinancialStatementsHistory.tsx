
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import { EtatFinancier } from '@/hooks/useFinancialCalculations';

interface FinancialStatementsHistoryProps {
  historique: EtatFinancier[];
  onSelectEtat: (etat: EtatFinancier) => void;
}

export const FinancialStatementsHistory = ({ historique, onSelectEtat }: FinancialStatementsHistoryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Historique des États Financiers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {historique.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucun état financier généré</p>
          ) : (
            historique.map((etat) => (
              <Button
                key={etat.id}
                variant="outline"
                onClick={() => onSelectEtat(etat)}
                className="w-full justify-start"
              >
                Exercice {etat.exerciceId} - {new Date(etat.dateCreation).toLocaleDateString('fr-FR')}
              </Button>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
