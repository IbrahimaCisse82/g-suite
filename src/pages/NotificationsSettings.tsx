
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Mail, Smartphone, Monitor } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const NotificationsSettings = () => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3">
            <Bell className="w-5 h-5 text-white" />
          </div>
          Notifications
        </h1>
        <p className="text-muted-foreground">
          Configurez vos préférences de notification
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Notifications par email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-invoices">Nouvelles factures</Label>
              <Switch id="email-invoices" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-quotes">Nouveaux devis</Label>
              <Switch id="email-quotes" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-payments">Paiements reçus</Label>
              <Switch id="email-payments" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="w-5 h-5 mr-2" />
              Notifications push
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="push-reminders">Rappels de paiement</Label>
              <Switch id="push-reminders" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-updates">Mises à jour système</Label>
              <Switch id="push-updates" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="w-5 h-5 mr-2" />
              Notifications dans l'application
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="app-activities">Activités récentes</Label>
              <Switch id="app-activities" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="app-alerts">Alertes système</Label>
              <Switch id="app-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsSettings;
