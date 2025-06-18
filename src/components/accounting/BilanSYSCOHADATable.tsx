
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EtatFinancier } from '@/hooks/useFinancialCalculations';

interface BilanSYSCOHADATableProps {
  etat: EtatFinancier;
}

export const BilanSYSCOHADATable = ({ etat }: BilanSYSCOHADATableProps) => {
  const actifStructure = [
    { nom: "Immobilisations (1)", note: "1", comptes: ["20", "21", "22", "23", "24", "25", "26", "27", "28"] },
    { nom: "Stocks", note: "2", comptes: ["30", "31", "32", "33", "34", "35", "36", "37", "38"] },
    { nom: "Clients et débiteurs divers", note: "3", comptes: ["41", "42", "43", "44", "45", "46", "47", "48"] },
    { nom: "Caisse", note: "", comptes: ["57"] },
    { nom: "Banque (en + ou en -)", note: "", comptes: ["52", "53", "54"] }
  ];

  const passifStructure = [
    { nom: "Compte exploitant", note: "", comptes: ["10"] },
    { nom: "Résultat exercice", note: "", comptes: ["13"] },
    { nom: "Emprunt", note: "", comptes: ["16", "17"] },
    { nom: "Fournisseurs et créditeurs", note: "3", comptes: ["40", "41", "42", "43", "44", "45", "46", "47", "48"] }
  ];

  const getMontatForComptes = (comptes: string[], isActif: boolean) => {
    const relatedComptes = etat.bilanActif.concat(etat.bilanPassif).filter(compte => 
      comptes.some(prefixe => compte.numero.startsWith(prefixe))
    );
    
    return relatedComptes.reduce((total, compte) => {
      if (isActif) {
        return total + (compte.soldeDebiteur - compte.soldeCrediteur);
      } else {
        return total + (compte.soldeCrediteur - compte.soldeDebiteur);
      }
    }, 0);
  };

  const formatMontant = (montant: number) => {
    return montant !== 0 ? montant.toLocaleString('fr-FR') : '';
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-lg font-bold">BILAN - SYSTEME MINIMAL DE TRESORERIE</CardTitle>
        <div className="flex justify-between text-sm mt-4">
          <div>
            <div>Désignation de l'entreprise :</div>
            <div>Numéro d'identification :</div>
          </div>
          <div className="text-right">
            <div>Exercice clos le :</div>
            <div>Durée (en mois) :</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-0 border">
          {/* ACTIF */}
          <div className="border-r">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center font-bold border-r">ACTIF</TableHead>
                  <TableHead className="text-center font-bold border-r w-16">Note</TableHead>
                  <TableHead className="text-center font-bold border-r">Exercice au 31/12/N</TableHead>
                  <TableHead className="text-center font-bold">Exercice au 31/12/N-1</TableHead>
                </TableRow>
                <TableRow className="bg-gray-50">
                  <TableHead className="border-r"></TableHead>
                  <TableHead className="border-r"></TableHead>
                  <TableHead className="text-center text-xs border-r">
                    <div className="grid grid-cols-3 gap-1">
                      <span>Brut</span>
                      <span>Amort/Prov.</span>
                      <span>Net</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center text-xs">Net</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actifStructure.map((ligne, index) => {
                  const montant = getMontatForComptes(ligne.comptes, true);
                  return (
                    <TableRow key={index} className="border-b">
                      <TableCell className="border-r font-medium">{ligne.nom}</TableCell>
                      <TableCell className="text-center border-r">{ligne.note}</TableCell>
                      <TableCell className="border-r">
                        <div className="grid grid-cols-3 gap-1 text-center">
                          <span>{formatMontant(montant)}</span>
                          <span></span>
                          <span>{formatMontant(montant)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center"></TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="bg-gray-100 font-bold border-t-2">
                  <TableCell className="border-r">TOTAL ACTIF</TableCell>
                  <TableCell className="border-r"></TableCell>
                  <TableCell className="border-r">
                    <div className="grid grid-cols-3 gap-1 text-center">
                      <span>{formatMontant(etat.bilanActif.reduce((acc, c) => acc + c.soldeDebiteur - c.soldeCrediteur, 0))}</span>
                      <span></span>
                      <span className="border border-green-500">{formatMontant(etat.bilanActif.reduce((acc, c) => acc + c.soldeDebiteur - c.soldeCrediteur, 0))}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* PASSIF */}
          <div>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center font-bold border-r">PASSIF</TableHead>
                  <TableHead className="text-center font-bold border-r w-16">Note</TableHead>
                  <TableHead className="text-center font-bold border-r">Exercice au 31/12/N</TableHead>
                  <TableHead className="text-center font-bold">Exercice au 31/12/N-1</TableHead>
                </TableRow>
                <TableRow className="bg-gray-50">
                  <TableHead className="border-r"></TableHead>
                  <TableHead className="border-r"></TableHead>
                  <TableHead className="text-center text-xs border-r">Net</TableHead>
                  <TableHead className="text-center text-xs">Net</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {passifStructure.map((ligne, index) => {
                  const montant = getMontatForComptes(ligne.comptes, false);
                  return (
                    <TableRow key={index} className="border-b">
                      <TableCell className="border-r font-medium">{ligne.nom}</TableCell>
                      <TableCell className="text-center border-r">{ligne.note}</TableCell>
                      <TableCell className="text-center border-r">{formatMontant(montant)}</TableCell>
                      <TableCell className="text-center"></TableCell>
                    </TableRow>
                  );
                })}
                {/* Lignes vides pour équilibrer */}
                <TableRow className="border-b">
                  <TableCell className="border-r"></TableCell>
                  <TableCell className="border-r"></TableCell>
                  <TableCell className="border-r"></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow className="bg-gray-100 font-bold border-t-2">
                  <TableCell className="border-r">TOTAL PASSIF</TableCell>
                  <TableCell className="border-r"></TableCell>
                  <TableCell className="text-center border-r">{formatMontant(etat.bilanPassif.reduce((acc, c) => acc + c.soldeCrediteur - c.soldeDebiteur, 0))}</TableCell>
                  <TableCell className="text-center"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
