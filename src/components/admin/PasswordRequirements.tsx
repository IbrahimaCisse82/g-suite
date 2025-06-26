
import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { passwordRequirements } from '@/utils/validation/passwordValidator';

interface PasswordRequirementsProps {
  password: string;
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => {
  return (
    <div className="bg-slate-50 rounded-lg p-4">
      <h4 className="text-sm font-medium text-slate-900 mb-3">
        Exigences du mot de passe :
      </h4>
      <div className="space-y-2">
        {passwordRequirements.map((requirement, index) => {
          const isValid = requirement.test(password);
          return (
            <div key={index} className="flex items-center space-x-2">
              {isValid ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <X className="w-4 h-4 text-slate-400" />
              )}
              <span className={`text-sm ${isValid ? 'text-green-700' : 'text-slate-600'}`}>
                {requirement.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
