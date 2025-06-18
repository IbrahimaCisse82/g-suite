
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ContactsHeaderProps {
  onCreateContact: () => void;
}

export const ContactsHeader = ({ onCreateContact }: ContactsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-readable-primary">
          Clients & Fournisseurs
        </h1>
        <p className="text-readable-secondary mt-2">
          Gérez vos contacts commerciaux avec numérotation automatique
        </p>
      </div>
      <Button 
        onClick={onCreateContact} 
        className="bg-green-600 hover:bg-green-700 text-white font-semibold"
      >
        <Plus className="w-4 h-4 mr-2" />
        Nouveau contact
      </Button>
    </div>
  );
};
