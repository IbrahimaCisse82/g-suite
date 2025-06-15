
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CompanyProfileSettings } from "@/components/settings/CompanyProfileSettings";
import { UserManagementSettings } from "@/components/settings/UserManagementSettings";
import { LicenseManagementSettings } from "@/components/settings/LicenseManagementSettings";
import { BadgeCheck, Users, Building } from "lucide-react";

export const Settings = () => {
  const [selectedTab, setSelectedTab] = useState("profile");

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600 mt-2">Configurez votre application</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Profil de l'entreprise
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="licenses" className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4" />
              Licences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <CompanyProfileSettings />
          </TabsContent>
          <TabsContent value="users">
            <UserManagementSettings />
          </TabsContent>
          <TabsContent value="licenses">
            <LicenseManagementSettings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};
