
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Clock, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const LocaleSettings = () => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3">
            <Globe className="w-5 h-5 text-white" />
          </div>
          Langue et région
        </h1>
        <p className="text-muted-foreground">
          Définissez votre langue et vos préférences régionales
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Paramètres de langue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Langue de l'interface</Label>
              <Select defaultValue="fr">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Région</Label>
              <Select defaultValue="fr-FR">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une région" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr-FR">France</SelectItem>
                  <SelectItem value="be-BE">Belgique</SelectItem>
                  <SelectItem value="ch-CH">Suisse</SelectItem>
                  <SelectItem value="ca-CA">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Paramètres de date et heure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Fuseau horaire</Label>
              <Select defaultValue="Europe/Paris">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un fuseau horaire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
                  <SelectItem value="Europe/Brussels">Europe/Brussels (UTC+1)</SelectItem>
                  <SelectItem value="Europe/Zurich">Europe/Zurich (UTC+1)</SelectItem>
                  <SelectItem value="America/Montreal">America/Montreal (UTC-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-format">Format de date</Label>
              <Select defaultValue="dd/mm/yyyy">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Paramètres de devise
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Devise par défaut</Label>
              <Select defaultValue="EUR">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une devise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="USD">Dollar US ($)</SelectItem>
                  <SelectItem value="CAD">Dollar canadien (CAD)</SelectItem>
                  <SelectItem value="CHF">Franc suisse (CHF)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="number-format">Format des nombres</Label>
              <Select defaultValue="1,234.56">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1,234.56">1,234.56</SelectItem>
                  <SelectItem value="1 234,56">1 234,56</SelectItem>
                  <SelectItem value="1.234,56">1.234,56</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LocaleSettings;
