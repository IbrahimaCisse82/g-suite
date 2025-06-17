
import React from 'react';
import { Check, X } from 'lucide-react';

interface FeatureIconProps {
  included: boolean;
}

export const FeatureIcon = ({ included }: FeatureIconProps) => {
  return included ? (
    <Check className="w-5 h-5 text-green-600" />
  ) : (
    <X className="w-5 h-5 text-red-400" />
  );
};
