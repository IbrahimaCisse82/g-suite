
import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface PasswordMatchIndicatorProps {
  confirmPassword: string;
  passwordsMatch: boolean;
}

export const PasswordMatchIndicator: React.FC<PasswordMatchIndicatorProps> = ({ 
  confirmPassword, 
  passwordsMatch 
}) => {
  if (!confirmPassword) return null;

  return (
    <div className="flex items-center space-x-2">
      {passwordsMatch ? (
        <>
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-700">Les mots de passe correspondent</span>
        </>
      ) : (
        <>
          <X className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-600">Les mots de passe ne correspondent pas</span>
        </>
      )}
    </div>
  );
};
