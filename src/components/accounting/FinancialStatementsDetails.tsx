
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EtatFinancier } from '@/hooks/useFinancialCalculations';
import { BilanSYSCOHADATable } from './BilanSYSCOHADATable';

interface FinancialStatementsDetailsProps {
  etat: EtatFinancier;
}

export const FinancialStatementsDetails = ({ etat }: FinancialStatementsDetailsProps) => {
  return (
    <div className="space-y-6">
      {/* Bilan SYSCOHADA officiel */}
      <BilanSYSCOHADATable etat={etat} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Détail du Compte de Résultat */}
        <Card>
          <CardHeader>
            <CardTitle>Compte de Résultat - Détail</CardTitle>
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

        {/* Flux de Trésorerie */}
        <Card>
          <CardHeader>
            <CardTitle>Flux de Trésorerie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {etat.fluxTresorerie.length > 0 ? (
                etat.fluxTresorerie.map((compte, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{compte.numero} - {compte.libelle}</span>
                    <span>{(compte.soldeDebiteur - compte.soldeCrediteur).toLocaleString('fr-FR')}€</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">Aucun flux de trésorerie</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
