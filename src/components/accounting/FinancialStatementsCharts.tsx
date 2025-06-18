
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EtatFinancier } from '@/hooks/useFinancialCalculations';

interface FinancialStatementsChartsProps {
  etat: EtatFinancier;
  bilanData: Array<{ name: string; montant: number }>;
  resultatData: Array<{ name: string; montant: number; fill?: string }>;
  fluxData: Array<{ name: string; montant: number }>;
}

export const FinancialStatementsCharts = ({ 
  etat, 
  bilanData, 
  resultatData, 
  fluxData 
}: FinancialStatementsChartsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Bilan */}
        <Card>
          <CardHeader>
            <CardTitle>Bilan (Actif vs Passif)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bilanData}>
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
                <Tooltip formatter={(value) => [`${value.toLocaleString('fr-FR')}€`, '']} />
                <Legend />
                <Bar dataKey="montant" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Compte de Résultat */}
        <Card>
          <CardHeader>
            <CardTitle>Compte de Résultat</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resultatData}>
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
                <Tooltip formatter={(value) => [`${value.toLocaleString('fr-FR')}€`, '']} />
                <Legend />
                <Bar dataKey="montant" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Flux de Trésorerie */}
      {etat.fluxTresorerie.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Flux de Trésorerie</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fluxData}>
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
                <Tooltip formatter={(value) => [`${value.toLocaleString('fr-FR')}€`, '']} />
                <Legend />
                <Bar dataKey="montant" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
};
