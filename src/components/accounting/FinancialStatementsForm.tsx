
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator, FileText } from 'lucide-react';

interface FinancialStatementsFormProps {
  onGenerate: (exerciceId: string, comptesInput: string) => void;
}

export const FinancialStatementsForm = ({ onGenerate }: FinancialStatementsFormProps) => {
  const [exerciceId, setExerciceId] = useState('');

  const defaultComptesInput = `[
  {
    "numero": "101",
    "libelle": "Capital social",
    "soldeDebiteur": 0,
    "soldeCrediteur": 500000
  },
  {
    "numero": "512",
    "libelle": "Banque",
    "soldeDebiteur": 250000,
    "soldeCrediteur": 0
  },
  {
    "numero": "601",
    "libelle": "Achats de marchandises",
    "soldeDebiteur": 150000,
    "soldeCrediteur": 0
  },
  {
    "numero": "701",
    "libelle": "Ventes de marchandises",
    "soldeDebiteur": 0,
    "soldeCrediteur": 300000
  },
  {
    "numero": "211",
    "libelle": "Terrains",
    "soldeDebiteur": 100000,
    "soldeCrediteur": 0
  },
  {
    "numero": "661",
    "libelle": "Charges de personnel",
    "soldeDebiteur": 80000,
    "soldeCrediteur": 0
  }
]`;

  const handleSubmit = () => {
    onGenerate(exerciceId, defaultComptesInput);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Générateur d'États Financiers SYSCOHADA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">ID de l'exercice</label>
          <Input
            placeholder="ex: 2024"
            value={exerciceId}
            onChange={(e) => setExerciceId(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={!exerciceId.trim()}
        >
          <FileText className="w-4 h-4 mr-2" />
          Générer les États Financiers
        </Button>
      </CardContent>
    </Card>
  );
};
