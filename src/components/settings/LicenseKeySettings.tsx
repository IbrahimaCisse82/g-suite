
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Key, BadgeCheck, Clock, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { usePaidAccountRequests, useCreatePaidAccountRequest } from "@/hooks/useSubscriptions";
import { Badge } from "@/components/ui/badge";

const MODULE_OPTIONS = [
  { value: "comptabilite", label: "Solution Comptable" },
  { value: "commerciale", label: "Solution Commerciale" },
  { value: "entreprise", label: "Solution Entreprise" },
];

const PLAN_NAME_MAP: Record<string, string> = {
  comptabilite: "Solution Comptable",
  commerciale: "Solution Commerciale",
  entreprise: "Solution Entreprise",
};

export function LicenseKeySettings() {
  const [selectedModule, setSelectedModule] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const createRequestMutation = useCreatePaidAccountRequest();
  const { data: requests = [], isLoading } = usePaidAccountRequests();

  const handleRequest = async () => {
    if (!selectedModule) {
      toast({
        title: "Module non sélectionné",
        description: "Veuillez choisir un module.",
        variant: "destructive",
      });
      return;
    }
    try {
      await createRequestMutation.mutateAsync({
        planId: selectedModule,
        message: requestMessage,
      });
      toast({
        title: "Demande envoyée",
        description: "Demande de clé envoyée avec succès.",
      });
      setSelectedModule("");
      setRequestMessage("");
    } catch (e) {
      toast({
        title: "Erreur lors de la demande",
        description: "Une erreur s'est produite lors de l’envoi de la demande.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300"><Clock className="mr-1 w-3 h-3" />En attente</Badge>;
      case "approved":
        return <Badge variant="outline" className="text-green-600 border-green-300"><BadgeCheck className="mr-1 w-3 h-3" />Validée</Badge>;
      case "rejected":
        return <Badge variant="outline" className="text-red-600 border-red-300"><X className="mr-1 w-3 h-3" />Refusée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="inline-flex items-center gap-2">
            <Key className="w-5 h-5" /> Gestion des clés licences modules
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-600 mb-4">Demandez une clé pour activer l’un des modules de la plateforme :</div>
        <div className="flex flex-col gap-3 md:flex-row md:items-end mb-6">
          <div className="flex-1">
            <label className="block font-medium mb-1">Module</label>
            <select
              className="w-full border rounded-md px-3 py-2"
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
            >
              <option value="">Choisir un module…</option>
              {MODULE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Message (optionnel)</label>
            <Textarea
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              placeholder="Exemple : besoins spécifiques, nombre d'utilisateurs…"
              rows={2}
            />
          </div>
          <Button className="md:ml-5" onClick={handleRequest} disabled={createRequestMutation.isPending}>
            {createRequestMutation.isPending ? "Envoi…" : "Demander la clé"}
          </Button>
        </div>

        <hr className="my-6" />

        <div>
          <h3 className="font-semibold mb-4">Suivi de vos demandes de clé licence</h3>
          {isLoading ? (
            <div>Chargement…</div>
          ) : requests.length === 0 ? (
            <div className="text-gray-500">Aucune demande enregistrée.</div>
          ) : (
            <ul className="space-y-4">
              {requests.map((req) => (
                <li key={req.id} className="border p-4 rounded">
                  <div className="flex justify-between items-center gap-2">
                    <div>
                      <strong>{PLAN_NAME_MAP[req.plan_id as string]?.toUpperCase() || req.subscription_plans?.name || "Module inconnu"}</strong>
                      <div className="text-sm text-gray-600">
                        Demandé le {new Date(req.created_at).toLocaleDateString("fr-FR")}
                      </div>
                      {req.request_message && (
                        <div className="italic text-xs text-gray-700 mt-2">"{req.request_message}"</div>
                      )}
                      {/* Si une clé licence est disponible */}
                      {req.status === "approved" && req.admin_notes && (
                        <div className="mt-2 p-2 rounded bg-green-50 text-xs">
                          <span className="font-semibold text-green-700">Clé : </span>
                          <span className="select-all">{req.admin_notes}</span>
                        </div>
                      )}
                    </div>
                    <div>{getStatusBadge(req.status || "pending")}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
