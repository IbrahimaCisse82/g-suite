
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';

interface QuotesHeaderProps {
  onCreateQuote: () => void;
  totalQuotes: number;
}

export const QuotesHeader = ({ onCreateQuote, totalQuotes }: QuotesHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <FileText className="mr-3 h-8 w-8" />
          Devis
        </h1>
        <p className="text-gray-600">
          Gestion des devis et propositions commerciales ({totalQuotes} devis)
        </p>
      </div>
      <Button onClick={onCreateQuote} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Nouveau Devis
      </Button>
    </div>
  );
};
