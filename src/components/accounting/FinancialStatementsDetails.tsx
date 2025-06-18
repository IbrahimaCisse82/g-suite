
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EtatFinancier } from '@/hooks/useFinancialCalculations';

interface FinancialStatementsDetailsProps {
  etat: EtatFinancier;
}

export const FinancialStatementsDetails = ({ etat }: FinancialStatementsDetailsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Actif</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {etat.bilanActif.map((compte, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{compte.numero} - {compte.libelle}</span>
                <span>{(compte.soldeDebiteur - compte.soldeCrediteur).toLocaleString('fr-FR')}€</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Passif</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {etat.bilanPassif.map((compte, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{compte.numero} - {compte.libelle}</span>
                <span>{(compte.soldeCrediteur - compte.soldeDebiteur).toLocaleString('fr-FR')}€</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Résultat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {etat.compteResultat.map((compte, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{compte.numero} - {compte.libelle}</span>
                <span className={compte.numero.startsWith('6') ? 'text-red-600' : 'text-green-600'}>
                  {compte.numero.startsWith('6') 
                    ? `-${compte.soldeDebiteur.toLocaleString('fr-FR')}€`
                    : `+${compte.soldeCrediteur.toLocaleString('fr-FR')}€`
                  }
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
