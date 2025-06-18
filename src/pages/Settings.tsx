
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCompanyProfile } from '@/hooks/useCompanyData';

const Settings = () => {
  const { data: profile } = useCompanyProfile();

  // Extract company data from profile
  const company = Array.isArray(profile?.companies) ? profile.companies[0] : profile?.companies;

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Paramètres</h1>
        <Card>
          <CardContent className="p-6">
            <p>Chargement des données de l'entreprise...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Paramètres</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations de l'entreprise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom de l'entreprise</label>
              <p className="text-gray-900">{company?.name || 'Non renseigné'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <p className="text-gray-900">{company?.email || 'Non renseigné'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ville</label>
              <p className="text-gray-900">{company?.city || 'Non renseigné'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pays</label>
              <p className="text-gray-900">{company?.country || 'Non renseigné'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations légales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">NINEA</label>
              <p className="text-gray-900">{company?.ninea || 'Non renseigné'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">RCCM</label>
              <p className="text-gray-900">{company?.rccm || 'Non renseigné'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Secteur d'activité</label>
              <p className="text-gray-900">{company?.business_sector || 'Non renseigné'}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
