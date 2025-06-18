
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { Download, FileText, TrendingUp, Calculator } from 'lucide-react';

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

export const FinancialStatementsGenerator = () => {
  const [exerciceId, setExerciceId] = useState('');
  const [comptesInput, setComptesInput] = useState(`[
  {"numero": "101", "libelle": "Capital", "soldeDebiteur": 0, "soldeCrediteur": 500000},
  {"numero": "512", "libelle": "Banque", "soldeDebiteur": 250000, "soldeCrediteur": 0},
  {"numero": "601", "libelle": "Achats", "soldeDebiteur": 150000, "soldeCrediteur": 0},
  {"numero": "701", "libelle": "Ventes", "soldeDebiteur": 0, "soldeCrediteur": 300000}
]`);
  const [historique, setHistorique] = useState<EtatFinancier[]>([]);
  const [etatSelectionne, setEtatSelectionne] = useState<EtatFinancier | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  // Calculs des états financiers
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

  const genererEtatsFinanciers = () => {
    try {
      const comptes: Compte[] = JSON.parse(comptesInput);
      
      if (!exerciceId.trim()) {
        toast.error('Veuillez saisir un ID d\'exercice');
        return;
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
      
    } catch (error) {
      toast.error('Erreur dans le format JSON des comptes');
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
        {/* Générateur */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Générateur d'États Financiers SYSCOHADA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">ID de l'exercice</label>
              <Input
                placeholder="ex: 2024"
                value={exerciceId}
                onChange={(e) => setExerciceId(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Comptes (Format JSON)</label>
              <Textarea
                placeholder="Liste des comptes au format JSON"
                value={comptesInput}
                onChange={(e) => setComptesInput(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
            </div>
            
            <Button 
              onClick={genererEtatsFinanciers}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              Générer les États Financiers
            </Button>
          </CardContent>
        </Card>

        {/* Historique */}
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
                    onClick={() => setEtatSelectionne(etat)}
                    className="w-full justify-start"
                  >
                    Exercice {etat.exerciceId} - {new Date(etat.dateCreation).toLocaleDateString('fr-FR')}
                  </Button>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visualisation */}
      {etatSelectionne && (
        <div className="space-y-6" ref={exportRef}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">États Financiers - Exercice {etatSelectionne.exerciceId}</h2>
            <Button onClick={exporterPDF} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter en PDF
            </Button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Bilan */}
            <Card>
              <CardHeader>
                <CardTitle>Bilan (Actif vs Passif)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={preparerDonneesBilan(etatSelectionne)}>
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
                  <BarChart data={preparerDonneesResultat(etatSelectionne)}>
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
          {etatSelectionne.fluxTresorerie.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Flux de Trésorerie</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={preparerDonneesFluxTresorerie(etatSelectionne)}>
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

          {/* Détails des comptes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Actif</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {etatSelectionne.bilanActif.map((compte, index) => (
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
                  {etatSelectionne.bilanPassif.map((compte, index) => (
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
                  {etatSelectionne.compteResultat.map((compte, index) => (
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
        </div>
      )}
    </div>
  );
};
