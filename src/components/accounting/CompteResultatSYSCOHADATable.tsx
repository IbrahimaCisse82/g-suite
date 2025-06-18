
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EtatFinancier } from '@/hooks/useFinancialCalculations';

interface CompteResultatSYSCOHADATableProps {
  etat: EtatFinancier;
}

export const CompteResultatSYSCOHADATable = ({ etat }: CompteResultatSYSCOHADATableProps) => {
  const structureCompteResultat = [
    { 
      section: "PRODUITS", 
      lignes: [
        { libelle: "Recettes sur ventes ou prestations de services", note: "4", comptes: ["70", "701", "702", "703", "704", "705", "706", "707", "708"] },
        { libelle: "Autres recettes sur activités", note: "4", comptes: ["75", "751", "752", "753", "754", "755", "756", "757", "758"] }
      ]
    },
    { 
      section: "TOTAL DES RECETTES SUR PRODUITS", 
      isTotal: true
    },
    { 
      section: "CHARGES", 
      lignes: [
        { libelle: "Dépenses sur achats", note: "4", comptes: ["60", "601", "602", "603", "604", "605", "606", "607", "608"] },
        { libelle: "Dépenses sur loyers", note: "4", comptes: ["61", "611", "612", "613", "614", "615", "616", "617", "618"] },
        { libelle: "Dépenses sur salaires", note: "4", comptes: ["66", "661", "662", "663", "664", "665", "666", "667", "668"] },
        { libelle: "Dépenses sur impôts et taxes", note: "4", comptes: ["63", "631", "632", "633", "634", "635", "636", "637", "638"] },
        { libelle: "Charges d'intérêts", note: "", comptes: ["67", "671", "672", "673", "674", "675", "676", "677", "678"] },
        { libelle: "Autres dépenses sur activités", note: "4", comptes: ["65", "651", "652", "653", "654", "655", "656", "657", "658"] }
      ]
    },
    { 
      section: "TOTAL DEPENSES SUR CHARGES", 
      isTotal: true
    },
    { 
      section: "SOLDE : Excédent (+) ou Insuffisance (-) de recettes", 
      isSolde: true
    },
    { 
      section: "VARIATIONS", 
      lignes: [
        { libelle: "- Variation des stocks N/N-1", note: "2", comptes: ["3"] },
        { libelle: "- Variation des créances N/N-1", note: "3", comptes: ["4"] },
        { libelle: "+ Variation des dettes d'exploitation N/N-1", note: "3", comptes: ["4"] }
      ]
    },
    { 
      section: "DOTATIONS AUX AMORTISSEMENTS", 
      isSection: true
    },
    { 
      section: "Impôt sur le résultat", 
      isImpot: true
    },
    { 
      section: "TOTAL GENERAL DES CHARGES", 
      isTotalGeneral: true
    },
    { 
      section: "RESULTAT DE L'EXERCICE", 
      isResultat: true
    }
  ];

  const getMontantForComptes = (comptes: string[]) => {
    const relatedComptes = etat.compteResultat.filter(compte => 
      comptes.some(prefixe => compte.numero.startsWith(prefixe))
    );
    
    return relatedComptes.reduce((total, compte) => {
      if (compte.numero.startsWith('6')) {
        return total + compte.soldeDebiteur;
      } else if (compte.numero.startsWith('7')) {
        return total + compte.soldeCrediteur;
      }
      return total;
    }, 0);
  };

  const formatMontant = (montant: number) => {
    return montant !== 0 ? montant.toLocaleString('fr-FR') : '';
  };

  const totalProduits = etat.compteResultat
    .filter(c => c.numero.startsWith('7'))
    .reduce((acc, c) => acc + c.soldeCrediteur, 0);

  const totalCharges = etat.compteResultat
    .filter(c => c.numero.startsWith('6'))
    .reduce((acc, c) => acc + c.soldeDebiteur, 0);

  const resultatExercice = totalProduits - totalCharges;

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-lg font-bold">COMPTE DE RESULTAT - SYSTEME MINIMAL DE TRESORERIE</CardTitle>
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
        <div className="text-center font-bold mt-4">
          COMPTE DE RESULTAT SMT AU 31 DECEMBRE N
        </div>
      </CardHeader>
      <CardContent>
        <Table className="border">
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="text-center font-bold border-r w-1/2">Libellés</TableHead>
              <TableHead className="text-center font-bold border-r w-16">Note</TableHead>
              <TableHead className="text-center font-bold border-r">MONTANT</TableHead>
              <TableHead className="text-center font-bold"></TableHead>
            </TableRow>
            <TableRow className="bg-gray-100">
              <TableHead className="border-r"></TableHead>
              <TableHead className="border-r"></TableHead>
              <TableHead className="text-center text-xs border-r">Exercice au 31/12/N</TableHead>
              <TableHead className="text-center text-xs">Exercice au 31/12/N-1</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {structureCompteResultat.map((section, index) => {
              if (section.lignes) {
                return (
                  <React.Fragment key={index}>
                    {section.lignes.map((ligne, ligneIndex) => {
                      const montant = getMontantForComptes(ligne.comptes);
                      return (
                        <TableRow key={`${index}-${ligneIndex}`} className="border-b">
                          <TableCell className="border-r font-medium">{ligne.libelle}</TableCell>
                          <TableCell className="text-center border-r">{ligne.note}</TableCell>
                          <TableCell className="text-center border-r">{formatMontant(montant)}</TableCell>
                          <TableCell className="text-center"></TableCell>
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
                );
              } else if (section.isTotal) {
                const montant = section.section.includes('PRODUITS') ? totalProduits : totalCharges;
                return (
                  <TableRow key={index} className="bg-gray-100 font-bold border-t border-b">
                    <TableCell className="border-r">{section.section}</TableCell>
                    <TableCell className="border-r"></TableCell>
                    <TableCell className="text-center border-r">{formatMontant(montant)}</TableCell>
                    <TableCell className="text-center"></TableCell>
                  </TableRow>
                );
              } else if (section.isSolde) {
                return (
                  <TableRow key={index} className="bg-gray-200 font-bold border-t border-b">
                    <TableCell className="border-r">{section.section}</TableCell>
                    <TableCell className="border-r"></TableCell>
                    <TableCell className="text-center border-r">{formatMontant(totalProduits - totalCharges)}</TableCell>
                    <TableCell className="text-center"></TableCell>
                  </TableRow>
                );
              } else if (section.isImpot) {
                return (
                  <TableRow key={index} className="bg-orange-200 border-b">
                    <TableCell className="border-r font-medium">{section.section}</TableCell>
                    <TableCell className="border-r"></TableCell>
                    <TableCell className="text-center border-r"></TableCell>
                    <TableCell className="text-center"></TableCell>
                  </TableRow>
                );
              } else if (section.isTotalGeneral) {
                return (
                  <TableRow key={index} className="bg-orange-200 font-bold border-t border-b">
                    <TableCell className="border-r">{section.section}</TableCell>
                    <TableCell className="border-r"></TableCell>
                    <TableCell className="text-center border-r">{formatMontant(totalCharges)}</TableCell>
                    <TableCell className="text-center"></TableCell>
                  </TableRow>
                );
              } else if (section.isResultat) {
                return (
                  <TableRow key={index} className="bg-gray-300 font-bold border-t-2">
                    <TableCell className="border-r">{section.section}</TableCell>
                    <TableCell className="border-r"></TableCell>
                    <TableCell className="text-center border-r border border-green-500">{formatMontant(resultatExercice)}</TableCell>
                    <TableCell className="text-center"></TableCell>
                  </TableRow>
                );
              } else if (section.isSection) {
                return (
                  <TableRow key={index} className="bg-gray-100 font-bold border-t border-b">
                    <TableCell className="border-r">{section.section}</TableCell>
                    <TableCell className="border-r"></TableCell>
                    <TableCell className="text-center border-r"></TableCell>
                    <TableCell className="text-center"></TableCell>
                  </TableRow>
                );
              } else {
                return (
                  <TableRow key={index} className="bg-gray-100 font-bold border-t border-b">
                    <TableCell className="border-r">{section.section}</TableCell>
                    <TableCell className="border-r"></TableCell>
                    <TableCell className="text-center border-r"></TableCell>
                    <TableCell className="text-center"></TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
