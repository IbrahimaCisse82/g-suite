
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const UsersSettings = () => {
  // Utilisateurs démo
  const users = [
    { id: 1, email: "admin@exemple.com", role: "Administrateur" },
    { id: 2, email: "user@exemple.com", role: "Utilisateur" }
  ];

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="inline-flex items-center gap-2">
              <Users className="w-5 h-5" />
              Gestion des utilisateurs
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-600 mb-4">Voici la liste des utilisateurs actifs de votre entreprise :</div>
          <ul className="divide-y border rounded">
            {users.map((u) => (
              <li key={u.id} className="flex justify-between py-3 px-4 items-center">
                <div>
                  <span className="font-medium">{u.email}</span>
                  <div className="text-xs text-gray-500">{u.role}</div>
                </div>
                <Button size="sm" variant="outline">Gérer</Button>
              </li>
            ))}
          </ul>
          <div className="pt-6">
            <Button>Inviter un nouvel utilisateur</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersSettings;
