
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

interface UserSettingsHeaderProps {
  onAddUser: () => void;
}

export const UserSettingsHeader = ({ onAddUser }: UserSettingsHeaderProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              Gestion des utilisateurs
            </CardTitle>
            <p className="text-gray-600 mt-2">Gérez les utilisateurs et leurs droits d'accès</p>
          </div>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={onAddUser}
          >
            <Plus className="w-4 h-4 mr-2" />
            Inviter un utilisateur
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};
