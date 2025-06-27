
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';

interface QuotesHeaderProps {
  onCreateQuote: () => void;
  totalQuotes: number;
}

export const QuotesHeader = ({ onCreateQuote, totalQuotes }: QuotesHeaderProps) => {
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-readable-primary mb-2 flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 transform transition-transform hover:scale-110">
              <FileText className="w-6 h-6 text-white" />
            </div>
            Gestion des devis
          </h1>
          <p className="text-xl text-readable-secondary">
            Créez et gérez vos devis commerciaux ({totalQuotes} devis)
          </p>
        </div>
        <Button 
          onClick={onCreateQuote} 
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          Nouveau Devis
        </Button>
      </div>
    </div>
  );
};
