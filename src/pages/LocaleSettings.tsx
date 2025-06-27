
import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Clock, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PageTransition } from "@/components/common/PageTransition";
import { OptimizedCard } from "@/components/common/OptimizedCard";

const LocaleSettings = React.memo(() => {
  const [settings, setSettings] = useState({
    language: 'fr',
    region: 'fr-FR',
    timezone: 'Europe/Paris',
    dateFormat: 'dd/mm/yyyy',
    currency: 'EUR',
    numberFormat: '1,234.56'
  });

  const handleSettingChange = useCallback((key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3 transform transition-transform hover:scale-110">
              <Globe className="w-5 h-5 text-white" />
            </div>
            Langue et région
          </h1>
          <p className="text-muted-foreground">
            Définissez votre langue et vos préférences régionales
          </p>
        </div>

        <div className="space-y-6">
          <OptimizedCard 
            title="Paramètres de langue"
            icon={Globe}
            className="animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Langue de l'interface</Label>
                <Select 
                  value={settings.language} 
                  onValueChange={(value) => handleSettingChange('language', value)}
                >
                  <SelectTrigger className="transition-all duration-200 hover:border-green-400">
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
                <Select 
                  value={settings.region} 
                  onValueChange={(value) => handleSettingChange('region', value)}
                >
                  <SelectTrigger className="transition-all duration-200 hover:border-green-400">
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
            </div>
          </OptimizedCard>

          <OptimizedCard 
            title="Paramètres de date et heure"
            icon={Clock}
            className="animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuseau horaire</Label>
                <Select 
                  value={settings.timezone} 
                  onValueChange={(value) => handleSettingChange('timezone', value)}
                >
                  <SelectTrigger className="transition-all duration-200 hover:border-green-400">
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
                <Select 
                  value={settings.dateFormat} 
                  onValueChange={(value) => handleSettingChange('dateFormat', value)}
                >
                  <SelectTrigger className="transition-all duration-200 hover:border-green-400">
                    <SelectValue placeholder="Sélectionnez un format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </OptimizedCard>

          <OptimizedCard 
            title="Paramètres de devise"
            icon={Calendar}
            className="animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Devise par défaut</Label>
                <Select 
                  value={settings.currency} 
                  onValueChange={(value) => handleSettingChange('currency', value)}
                >
                  <SelectTrigger className="transition-all duration-200 hover:border-green-400">
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
                <Select 
                  value={settings.numberFormat} 
                  onValueChange={(value) => handleSettingChange('numberFormat', value)}
                >
                  <SelectTrigger className="transition-all duration-200 hover:border-green-400">
                    <SelectValue placeholder="Sélectionnez un format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1,234.56">1,234.56</SelectItem>
                    <SelectItem value="1 234,56">1 234,56</SelectItem>
                    <SelectItem value="1.234,56">1.234,56</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </OptimizedCard>
        </div>
      </div>
    </PageTransition>
  );
});

LocaleSettings.displayName = 'LocaleSettings';

export default LocaleSettings;
