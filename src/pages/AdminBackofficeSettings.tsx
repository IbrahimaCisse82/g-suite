
import React from 'react';
import { AdminBackofficeLayout } from '@/components/admin/AdminBackofficeLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Settings, Shield, Database, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AdminBackofficeSettings = () => {
  return (
    <AdminBackofficeLayout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuration</h1>
          <p className="text-gray-600">Gérez les paramètres système et les configurations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Paramètres Généraux</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Mode Maintenance</p>
                  <p className="text-sm text-gray-600">Activer le mode maintenance système</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800">Inactif</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Notifications Push</p>
                  <p className="text-sm text-gray-600">Notifications automatiques aux admins</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Actif</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Logs Système</p>
                  <p className="text-sm text-gray-600">Enregistrement des actions système</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Actif</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Sécurité</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Authentification 2FA</p>
                  <p className="text-sm text-gray-600">Double authentification obligatoire</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Actif</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Chiffrement des Données</p>
                  <p className="text-sm text-gray-600">Chiffrement AES-256</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Actif</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Tentatives de Connexion</p>
                  <p className="text-sm text-gray-600">Limite: 5 tentatives</p>
                </div>
                <Button size="sm" variant="outline">Modifier</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Base de Données</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Sauvegarde Automatique</p>
                  <p className="text-sm text-gray-600">Sauvegarde quotidienne à 02:00</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Actif</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Dernière Sauvegarde</p>
                  <p className="text-sm text-gray-600">Aujourd'hui à 02:00</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Succès</Badge>
              </div>
              
              <Button className="w-full">Effectuer une Sauvegarde</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Configuration Email</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Serveur SMTP</p>
                  <p className="text-sm text-gray-600">smtp.growhub.com</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Connecté</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Templates Email</p>
                  <p className="text-sm text-gray-600">12 templates configurés</p>
                </div>
                <Button size="sm" variant="outline">Modifier</Button>
              </div>
              
              <Button className="w-full">Tester la Configuration</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminBackofficeLayout>
  );
};

export default AdminBackofficeSettings;
