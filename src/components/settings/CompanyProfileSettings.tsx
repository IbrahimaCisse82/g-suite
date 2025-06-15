
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function CompanyProfileSettings() {
  const [companyData, setCompanyData] = useState({
    name: 'Mon Entreprise SARL',
    address: '123 Rue de la Paix',
    city: 'Dakar',
    phone: '+221 33 123 45 67',
    email: 'contact@monentreprise.sn',
    ninea: '123456789',
    rccm: 'SN-DKR-2024-A-123'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Envoyer les données mises à jour du profil
    // Ajoutez ici l'intégration API si besoin
    console.log('Mise à jour profil entreprise:', companyData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil de l'entreprise</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nom de l'entreprise</Label>
              <Input
                id="company-name"
                value={companyData.name}
                onChange={(e) => setCompanyData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-email">Email</Label>
              <Input
                id="company-email"
                type="email"
                value={companyData.email}
                onChange={(e) => setCompanyData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-phone">Téléphone</Label>
              <Input
                id="company-phone"
                value={companyData.phone}
                onChange={(e) => setCompanyData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-city">Ville</Label>
              <Input
                id="company-city"
                value={companyData.city}
                onChange={(e) => setCompanyData(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-ninea">NINEA</Label>
              <Input
                id="company-ninea"
                value={companyData.ninea}
                onChange={(e) => setCompanyData(prev => ({ ...prev, ninea: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-rccm">RCCM</Label>
              <Input
                id="company-rccm"
                value={companyData.rccm}
                onChange={(e) => setCompanyData(prev => ({ ...prev, rccm: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-address">Adresse</Label>
            <Textarea
              id="company-address"
              value={companyData.address}
              onChange={(e) => setCompanyData(prev => ({ ...prev, address: e.target.value }))}
              rows={3}
            />
          </div>
          <Button type="submit">Sauvegarder les modifications</Button>
        </form>
      </CardContent>
    </Card>
  );
}
