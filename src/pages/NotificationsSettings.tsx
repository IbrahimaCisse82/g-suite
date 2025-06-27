
import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Mail, Smartphone, Monitor } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PageTransition } from "@/components/common/PageTransition";
import { OptimizedCard } from "@/components/common/OptimizedCard";

const NotificationsSettings = React.memo(() => {
  const [settings, setSettings] = useState({
    emailInvoices: true,
    emailQuotes: true,
    emailPayments: true,
    pushReminders: false,
    pushUpdates: true,
    appActivities: true,
    appAlerts: true
  });

  const handleSettingChange = useCallback((key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3 transform transition-transform hover:scale-110">
              <Bell className="w-5 h-5 text-white" />
            </div>
            Notifications
          </h1>
          <p className="text-muted-foreground">
            Configurez vos préférences de notification
          </p>
        </div>

        <div className="space-y-6">
          <OptimizedCard 
            title="Notifications par email"
            icon={Mail}
            className="animate-fade-in [animation-delay:0.1s]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-invoices">Nouvelles factures</Label>
                <Switch 
                  id="email-invoices" 
                  checked={settings.emailInvoices}
                  onCheckedChange={(checked) => handleSettingChange('emailInvoices', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-quotes">Nouveaux devis</Label>
                <Switch 
                  id="email-quotes" 
                  checked={settings.emailQuotes}
                  onCheckedChange={(checked) => handleSettingChange('emailQuotes', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-payments">Paiements reçus</Label>
                <Switch 
                  id="email-payments" 
                  checked={settings.emailPayments}
                  onCheckedChange={(checked) => handleSettingChange('emailPayments', checked)}
                />
              </div>
            </div>
          </OptimizedCard>

          <OptimizedCard 
            title="Notifications push"
            icon={Smartphone}
            className="animate-fade-in [animation-delay:0.2s]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-reminders">Rappels de paiement</Label>
                <Switch 
                  id="push-reminders" 
                  checked={settings.pushReminders}
                  onCheckedChange={(checked) => handleSettingChange('pushReminders', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-updates">Mises à jour système</Label>
                <Switch 
                  id="push-updates" 
                  checked={settings.pushUpdates}
                  onCheckedChange={(checked) => handleSettingChange('pushUpdates', checked)}
                />
              </div>
            </div>
          </OptimizedCard>

          <OptimizedCard 
            title="Notifications dans l'application"
            icon={Monitor}
            className="animate-fade-in [animation-delay:0.3s]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="app-activities">Activités récentes</Label>
                <Switch 
                  id="app-activities" 
                  checked={settings.appActivities}
                  onCheckedChange={(checked) => handleSettingChange('appActivities', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="app-alerts">Alertes système</Label>
                <Switch 
                  id="app-alerts" 
                  checked={settings.appAlerts}
                  onCheckedChange={(checked) => handleSettingChange('appAlerts', checked)}
                />
              </div>
            </div>
          </OptimizedCard>
        </div>
      </div>
    </PageTransition>
  );
});

NotificationsSettings.displayName = 'NotificationsSettings';

export default NotificationsSettings;
