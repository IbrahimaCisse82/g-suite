
import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EcritureValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  totalDebit: number;
  totalCredit: number;
  isBalanced: boolean;
}

interface EcritureValidatorProps {
  validation: EcritureValidation;
}

export const EcritureValidator = ({ validation }: EcritureValidatorProps) => {
  const getStatusIcon = () => {
    if (validation.isValid && validation.isBalanced) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (validation.warnings.length > 0 && validation.errors.length === 0) {
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    } else {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    if (validation.isValid && validation.isBalanced) {
      return 'text-green-600';
    } else if (validation.warnings.length > 0 && validation.errors.length === 0) {
      return 'text-yellow-600';
    } else {
      return 'text-red-600';
    }
  };

  const getStatusText = () => {
    if (validation.isValid && validation.isBalanced) {
      return 'Écriture valide et équilibrée';
    } else if (!validation.isBalanced) {
      return 'Écriture déséquilibrée';
    } else if (validation.errors.length > 0) {
      return 'Écriture invalide';
    } else {
      return 'Écriture avec avertissements';
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={getStatusColor()}>{getStatusText()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-green-600">Total Débit</p>
            <p className="text-lg font-bold text-green-800">
              {validation.totalDebit.toLocaleString()} XOF
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-600">Total Crédit</p>
            <p className="text-lg font-bold text-blue-800">
              {validation.totalCredit.toLocaleString()} XOF
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center mb-4">
          <Badge 
            variant={validation.isBalanced ? "default" : "destructive"}
            className="text-sm"
          >
            {validation.isBalanced ? 
              "✓ Écriture équilibrée" : 
              `⚠ Différence: ${Math.abs(validation.totalDebit - validation.totalCredit).toLocaleString()} XOF`
            }
          </Badge>
        </div>

        {validation.errors.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-red-600 mb-2 flex items-center">
              <XCircle className="w-4 h-4 mr-1" />
              Erreurs à corriger
            </h4>
            <ul className="space-y-1">
              {validation.errors.map((error, index) => (
                <li key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  • {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {validation.warnings.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-yellow-600 mb-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              Avertissements
            </h4>
            <ul className="space-y-1">
              {validation.warnings.map((warning, index) => (
                <li key={index} className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
                  • {warning}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
