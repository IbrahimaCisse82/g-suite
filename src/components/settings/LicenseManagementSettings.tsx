
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Ici vous implémenterez la gestion des licences d’abonnement.
 * Pour la démo, affichage statique.
 */
export function LicenseManagementSettings() {
  // Plus tard, récupération dynamique des données de licence
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="inline-flex items-center gap-2">
            <BadgeCheck className="w-5 h-5" />
            Gestion des licences
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600 mb-4">Consultez vos licences d’abonnement et leur statut.</div>
        {/* Ajoutez kés infos et boutons d’action ici */}
        <Button>Voir les détails de la licence</Button>
        <div className="mt-6 text-gray-500 italic">Module bientôt disponible…</div>
      </CardContent>
    </Card>
  );
}
