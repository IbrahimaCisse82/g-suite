
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

/**
 * Ici vous implémenterez la gestion des utilisateurs : affichage, ajout, modification, suppression.
 * Pour la démo, affichage statique.
 */
export function UserManagementSettings() {
  // Plus tard, récupérer la liste des utilisateurs via Supabase ou props

  return (
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
        <div className="text-gray-600 mb-4">Gérez les utilisateurs de votre entreprise&nbsp;: invitations, rôles, etc.</div>
        <Button>Inviter un nouvel utilisateur</Button>
        {/* Ajoutez ici la liste des utilisateurs, boutons d’action, etc. */}
        <div className="mt-6 text-gray-500 italic">Module bientôt disponible…</div>
      </CardContent>
    </Card>
  );
}
