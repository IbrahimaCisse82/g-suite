
import React from "react";
import { Layout } from "@/components/Layout";
import { Building, Users, Key } from "lucide-react";
import { useCompanyProfile } from "@/hooks/useCompanyData";
import { usePaidAccountRequests } from "@/hooks/useSubscriptions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const { data: profile } = useCompanyProfile();
  const { data: licenseRequests = [] } = usePaidAccountRequests();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-8 flex flex-col gap-8">
        <h2 className="text-2xl font-bold mb-4">Résumé des paramètres de l'entreprise</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profil de l'entreprise */}
          <Card className="cursor-pointer hover:shadow-lg transition" onClick={() => navigate("/settings/profile")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-green-600" /> Profil de l'entreprise
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile ? (
                <ul className="text-sm space-y-1">
                  <li>
                    <span className="font-medium">Nom : </span>
                    {profile.companies?.name || <span className="italic text-gray-500">N/A</span>}
                  </li>
                  <li>
                    <span className="font-medium">Email : </span>
                    {profile.companies?.email || <span className="italic text-gray-500">N/A</span>}
                  </li>
                  <li>
                    <span className="font-medium">Ville : </span>
                    {profile.companies?.city || <span className="italic text-gray-500">N/A</span>}
                  </li>
                </ul>
              ) : (
                <div className="italic text-gray-400">Aucune donnée disponible.</div>
              )}
            </CardContent>
          </Card>

          {/* Utilisateurs */}
          <Card className="cursor-pointer hover:shadow-lg transition" onClick={() => navigate("/settings/users")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" /> Utilisateurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Données fictives pour la démo */}
              <ul className="text-sm space-y-1">
                <li>
                  <span className="font-medium">Administrateur :</span> admin@exemple.com
                </li>
                <li>
                  <span className="font-medium">Utilisateur :</span> user@exemple.com
                </li>
                <li>
                  <Badge variant="outline" className="border-green-300 text-green-700 mt-2">
                    2 utilisateurs actifs
                  </Badge>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Clés de licence */}
          <Card className="cursor-pointer hover:shadow-lg transition" onClick={() => navigate("/settings/licenses")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-green-600" /> Clés de licence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                {licenseRequests?.length > 0 ? (
                  <>
                    <div>
                      <span className="font-medium">{licenseRequests.length}</span> demande(s) envoyée(s)
                    </div>
                    <div className="flex flex-col gap-1 mt-2">
                      {licenseRequests.slice(0,2).map((req: any) => (
                        <div key={req.id} className="flex items-center gap-2">
                          <span className="capitalize">{req.subscription_plans?.name || "Module"}</span>
                          <Badge variant="outline" className="text-xs">{req.status}</Badge>
                        </div>
                      ))}
                      {licenseRequests.length > 2 && (
                        <span className="text-xs text-gray-500 mt-2">+ {licenseRequests.length - 2} autres…</span>
                      )}
                    </div>
                  </>
                ) : (
                  <span className="italic text-gray-400">Aucune demande envoyée.</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
