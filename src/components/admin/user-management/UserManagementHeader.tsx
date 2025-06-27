
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Plus } from 'lucide-react';

interface UserManagementHeaderProps {
  onAddUser: () => void;
}

export const UserManagementHeader = ({ onAddUser }: UserManagementHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          Gestion des utilisateurs
        </h1>
        <p className="text-gray-600 mt-2">Gérez les utilisateurs de votre entreprise</p>
      </div>
      <Button
        onClick={onAddUser}
        className="bg-green-600 hover:bg-green-700"
      >
        <Plus className="w-4 h-4 mr-2" />
        Ajouter un utilisateur
      </Button>
    </div>
  );
};
