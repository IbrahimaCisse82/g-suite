
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Key, BadgeCheck, Clock, X, Check, ArrowUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { usePaidAccountRequests, useCreatePaidAccountRequest, useSubscriptionPlans, useCurrentSubscription } from "@/hooks/useSubscriptions";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import { useSearchParams } from "react-router-dom";

const MODULE_OPTIONS = [
  { value: "entreprise", label: "Gestion d'Entreprise" },
  { value: "comptable", label: "Comptabilité" },
  { value: "commerciale", label: "Commerciale" },
];

const PLAN_NAME_MAP: Record<string, string> = {
  entreprise: "Gestion d'Entreprise",
  comptable: "Comptabilité",
  commerciale: "Commerciale",
};

const PLAN_COLOR_MAP: Record<string, string> = {
  entreprise: "bg-purple-50 text-purple-700 border-purple-400",
  comptable: "bg-blue-50 text-blue-700 border-blue-400",
  commerciale: "bg-green-50 text-green-700 border-green-400",
};

const PLAN_PROFILES_MAP: Record<string, string[]> = {
  entreprise: ["Manager", "Comptable", "Commerciale", "Logistique", "Caissier"],
  comptable: ["Manager", "Comptable", "Caissier"],
  commerciale: ["Manager", "Commerciale", "Logistique"],
};

export function LicenseKeySettings() {
  const [searchParams] = useSearchParams();
  const solutionParam = searchParams.get("solution");
  const [selectedModule, setSelectedModule] = useState(solutionParam || "");
  const [requestMessage, setRequestMessage] = useState("");
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState("");
  
  const createRequestMutation = useCreatePaidAccountRequest();
  const { data: requests = [], isLoading } = usePaidAccountRequests();
  const { data: plans = [] } = useSubscriptionPlans();
  const { data: currentSubscription } = useCurrentSubscription();

  const [dialogOpenId, setDialogOpenId] = useState<string | null>(null);

  // Calculer les plans disponibles pour upgrade
  const availableUpgradePlans = plans.filter(plan => {
    if (!currentSubscription) return false;
    return plan.price > (currentSubscription.subscription_plans?.price || 0);
  });

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
        description: "Une erreur s'est produite lors de l'envoi de la demande.",
        variant: "destructive",
      });
    }
  };

  const handleUpgradeRequest = async () => {
    if (!selectedUpgradePlan) {
      toast({
        title: "Plan non sélectionné",
        description: "Veuillez choisir un plan d'upgrade.",
        variant: "destructive",
      });
      return;
    }

    try {
      const selectedPlan = plans.find(p => p.id === selectedUpgradePlan);
      const upgradeMessage = `[UPGRADE] Demande d'upgrade depuis ${currentSubscription?.subscription_plans?.name} vers ${selectedPlan?.name}. ${requestMessage}`;
      
      await createRequestMutation.mutateAsync({
        planId: selectedUpgradePlan,
        message: upgradeMessage,
      });
      
      toast({
        title: "Demande d'upgrade envoyée",
        description: "Votre demande d'upgrade a été envoyée avec succès.",
      });
      
      setUpgradeDialogOpen(false);
      setSelectedUpgradePlan("");
      setRequestMessage("");
    } catch (e) {
      toast({
        title: "Erreur lors de la demande d'upgrade",
        description: "Une erreur s'est produite lors de l'envoi de la demande.",
        variant: "destructive",
      });
    }
  };

  const handleValidateKey = (req: any) => {
    toast({
      title: "Clé validée avec succès",
      description: `La clé pour ${PLAN_NAME_MAP[req.plan_id as string] || req.subscription_plans?.name} est maintenant active.`,
    });
    setDialogOpenId(null);
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

  const getRequestTypeBadge = (message: string) => {
    if (message?.includes('[UPGRADE]')) {
      return <Badge className="bg-purple-100 text-purple-800 mr-2"><ArrowUp className="w-3 h-3 mr-1" />Upgrade</Badge>;
    }
    if (message?.includes('[AUTOMATIQUE]') && message?.includes('Renouvellement')) {
      return <Badge className="bg-orange-100 text-orange-800 mr-2">Renouvellement Auto</Badge>;
    }
    return <Badge className="bg-blue-100 text-blue-800 mr-2">Nouvelle</Badge>;
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
        <div className="text-gray-600 mb-4">Demandez une clé pour activer l'un des modules de la plateforme :</div>
        
        {/* Section Nouvelle Licence */}
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

        {/* Section Upgrade (si abonnement actuel) */}
        {currentSubscription && availableUpgradePlans.length > 0 && (
          <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-purple-900">Upgrade disponible</h3>
                <p className="text-sm text-purple-700">
                  Plan actuel: {currentSubscription.subscription_plans?.name}
                </p>
              </div>
              <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-purple-700 border-purple-300 hover:bg-purple-100">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    Demander un upgrade
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Demande d'upgrade</DialogTitle>
                    <DialogDescription>
                      Choisissez le plan vers lequel vous souhaitez upgrader
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-medium mb-2">Plan de destination</label>
                      <select
                        className="w-full border rounded-md px-3 py-2"
                        value={selectedUpgradePlan}
                        onChange={(e) => setSelectedUpgradePlan(e.target.value)}
                      >
                        <option value="">Choisir un plan...</option>
                        {availableUpgradePlans.map((plan) => (
                          <option key={plan.id} value={plan.id}>
                            {plan.name} - {plan.price?.toLocaleString()} XOF/mois
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium mb-2">Raison de l'upgrade</label>
                      <Textarea
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                        placeholder="Pourquoi souhaitez-vous upgrader votre plan ?"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setUpgradeDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleUpgradeRequest} disabled={createRequestMutation.isPending}>
                      {createRequestMutation.isPending ? "Envoi..." : "Demander l'upgrade"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}

        <hr className="my-6" />

        <div>
          <h3 className="font-semibold mb-4">Suivi de vos demandes de clé licence</h3>
          {isLoading ? (
            <div>Chargement…</div>
          ) : requests.length === 0 ? (
            <div className="text-gray-500">Aucune demande enregistrée.</div>
          ) : (
            <ul className="space-y-4">
              {requests.map((req) => {
                const planKey = req.plan_id as string;
                const planName = PLAN_NAME_MAP[planKey] || req.subscription_plans?.name || "Module inconnu";
                const colorClass = PLAN_COLOR_MAP[planKey] || "bg-gray-100 text-gray-700 border-gray-300";
                const showValidate = req.status === "approved" && req.admin_notes;
                const allowedProfiles = PLAN_PROFILES_MAP[planKey] || [];

                return (
                  <li key={req.id} className={`border p-4 rounded ${colorClass} border`}>
                    <div className="flex justify-between items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getRequestTypeBadge(req.request_message || "")}
                          <strong className="uppercase">{planName}</strong>
                          <Badge className="text-xs" variant="outline">{planKey}</Badge>
                        </div>
                        
                        {allowedProfiles.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-1 mt-1">
                            {allowedProfiles.map((profile) => (
                              <span
                                key={profile}
                                className="inline-block text-xs font-medium rounded px-2 py-1 bg-gray-200 text-gray-700"
                              >
                                {profile}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="text-sm text-gray-600">
                          Demandé le {new Date(req.created_at).toLocaleDateString("fr-FR")}
                        </div>
                        {req.request_message && (
                          <div className="italic text-xs text-gray-700 mt-2">"{req.request_message}"</div>
                        )}
                        {req.status === "approved" && req.admin_notes && (
                          <div className="mt-2 p-2 rounded border bg-white">
                            <span className="font-semibold text-green-700">Votre clé : </span>
                            <span className="select-all">{req.admin_notes}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(req.status || "pending")}
                        {showValidate && (
                          <Dialog open={dialogOpenId === req.id} onOpenChange={(open) => setDialogOpenId(open ? req.id : null)}>
                            <DialogTrigger asChild>
                              <Button size="sm" className="bg-green-700 text-white mt-2">Valider la clé</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Validation de la clé</DialogTitle>
                                <DialogDescription>
                                  Êtes-vous sûr de vouloir valider la clé ?<br />
                                  <span className="block mt-3 font-medium">Module : <span className="font-bold">{planName}</span></span>
                                  <span className="block mt-2">Clé : <span className="select-all text-xs">{req.admin_notes}</span></span>
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setDialogOpenId(null)}>Annuler</Button>
                                <Button onClick={() => handleValidateKey(req)} className="bg-green-700 text-white">
                                  Confirmer la validation
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
