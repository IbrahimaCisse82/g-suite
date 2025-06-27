
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactsErrorViewProps {
  error: Error;
}

export const ContactsErrorView = ({ error }: ContactsErrorViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Erreur de chargement
      </h2>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        Une erreur s'est produite lors du chargement des contacts.
      </p>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-md">
        <p className="text-sm text-red-700 font-mono">
          {error.message}
        </p>
      </div>
      <Button 
        onClick={() => window.location.reload()} 
        variant="outline"
      >
        Actualiser la page
      </Button>
    </div>
  );
};
