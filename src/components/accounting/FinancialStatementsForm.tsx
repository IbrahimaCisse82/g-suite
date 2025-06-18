
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calculator, FileText, Code, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FinancialStatementsFormProps {
  onGenerate: (exerciceId: string, comptesInput: string) => void;
}

export const FinancialStatementsForm = ({ onGenerate }: FinancialStatementsFormProps) => {
  const [exerciceId, setExerciceId] = useState('');
  const [comptesInput, setComptesInput] = useState(`[
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
]`);
  const [isValidJson, setIsValidJson] = useState(true);

  const validateJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        const isValid = parsed.every(compte => 
          compte.numero && 
          compte.libelle && 
          typeof compte.soldeDebiteur === 'number' && 
          typeof compte.soldeCrediteur === 'number'
        );
        setIsValidJson(isValid);
        return isValid;
      }
      setIsValidJson(false);
      return false;
    } catch (error) {
      setIsValidJson(false);
      return false;
    }
  };

  const handleJsonChange = (value: string) => {
    setComptesInput(value);
    validateJson(value);
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(comptesInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setComptesInput(formatted);
      toast.success('JSON formaté avec succès');
    } catch (error) {
      toast.error('Format JSON invalide');
    }
  };

  const handleSubmit = () => {
    if (!validateJson(comptesInput)) {
      toast.error('Le format JSON des comptes est invalide');
      return;
    }
    onGenerate(exerciceId, comptesInput);
  };

  const exempleComptes = [
    { numero: "101", libelle: "Capital social", type: "Passif" },
    { numero: "211", libelle: "Terrains", type: "Actif" },
    { numero: "512", libelle: "Banque", type: "Actif" },
    { numero: "601", libelle: "Achats", type: "Charge" },
    { numero: "701", libelle: "Ventes", type: "Produit" },
    { numero: "661", libelle: "Charges de personnel", type: "Charge" }
  ];

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
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">
              Comptes (Format JSON)
              {isValidJson ? (
                <CheckCircle className="inline w-4 h-4 ml-2 text-green-500" />
              ) : (
                <AlertCircle className="inline w-4 h-4 ml-2 text-red-500" />
              )}
            </label>
            <Button 
              onClick={formatJson} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <Code className="w-4 h-4" />
              Formater JSON
            </Button>
          </div>
          
          <Textarea
            placeholder="Liste des comptes au format JSON"
            value={comptesInput}
            onChange={(e) => handleJsonChange(e.target.value)}
            rows={12}
            className={`font-mono text-sm ${!isValidJson ? 'border-red-500' : 'border-green-500'}`}
          />
          
          {!isValidJson && (
            <p className="text-red-500 text-sm">
              Format JSON invalide. Vérifiez la syntaxe et la structure des comptes.
            </p>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-sm">Structure requise pour chaque compte :</h4>
          <div className="bg-white p-3 rounded border font-mono text-xs">
            {`{
  "numero": "101",
  "libelle": "Capital social",
  "soldeDebiteur": 0,
  "soldeCrediteur": 500000
}`}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-sm">Exemples de comptes SYSCOHADA :</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {exempleComptes.map((compte, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-mono">{compte.numero}</span>
                <span className="text-gray-600">{compte.libelle}</span>
                <span className="text-blue-600 font-medium">{compte.type}</span>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={!isValidJson || !exerciceId.trim()}
        >
          <FileText className="w-4 h-4 mr-2" />
          Générer les États Financiers
        </Button>
      </CardContent>
    </Card>
  );
};
