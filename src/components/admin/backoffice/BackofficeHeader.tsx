
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Plus, Download } from 'lucide-react';

interface BackofficeHeaderProps {
  onAddUser: () => void;
}

export const BackofficeHeader = ({ onAddUser }: BackofficeHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <Users className="w-7 h-7 text-white" />
          </div>
          Gestion des Utilisateurs
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Gérez tous les utilisateurs des comptes entreprises depuis ce backoffice
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Exporter
        </Button>
        <Button
          onClick={onAddUser}
          className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter un utilisateur
        </Button>
      </div>
    </div>
  );
};
