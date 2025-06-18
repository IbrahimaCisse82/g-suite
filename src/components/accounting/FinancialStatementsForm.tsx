
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calculator, FileText } from 'lucide-react';

interface FinancialStatementsFormProps {
  onGenerate: (exerciceId: string, comptesInput: string) => void;
}

export const FinancialStatementsForm = ({ onGenerate }: FinancialStatementsFormProps) => {
  const [exerciceId, setExerciceId] = useState('');
  const [comptesInput, setComptesInput] = useState(`[
  {"numero": "101", "libelle": "Capital", "soldeDebiteur": 0, "soldeCrediteur": 500000},
  {"numero": "512", "libelle": "Banque", "soldeDebiteur": 250000, "soldeCrediteur": 0},
  {"numero": "601", "libelle": "Achats", "soldeDebiteur": 150000, "soldeCrediteur": 0},
  {"numero": "701", "libelle": "Ventes", "soldeDebiteur": 0, "soldeCrediteur": 300000}
]`);

  const handleSubmit = () => {
    onGenerate(exerciceId, comptesInput);
  };

  return (
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
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <FileText className="w-4 h-4 mr-2" />
          Générer les États Financiers
        </Button>
      </CardContent>
    </Card>
  );
};
