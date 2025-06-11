
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSendAdminCredentials } from '@/hooks/useAdminAuth';
import { Mail, Shield, Key, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export const AdminCredentialsManager = () => {
  const [results, setResults] = useState<any[]>([]);
  const sendCredentialsMutation = useSendAdminCredentials();

  const handleSendCredentials = async () => {
    try {
      const response = await sendCredentialsMutation.mutateAsync();
      setResults(response.results || []);
      
      toast.success(
        `Identifiants envoyés avec succès à ${response.successCount}/${response.totalAdmins} administrateurs`
      );
    } catch (error: any) {
      toast.error(`Erreur: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <span>Gestion des identifiants administrateurs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Information importante</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Cette action va créer des comptes utilisateurs pour tous les administrateurs système 
                    et leur envoyer leurs identifiants par email.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Users className="w-8 h-8 text-gray-600" />
                <div>
                  <p className="font-medium">Administrateurs</p>
                  <p className="text-sm text-gray-600">h.ndiaye@growhubsenegal.com</p>
                  <p className="text-sm text-gray-600">i.cisse@growhubsenegal.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Key className="w-8 h-8 text-gray-600" />
                <div>
                  <p className="font-medium">Mots de passe</p>
                  <p className="text-sm text-gray-600">Générés automatiquement</p>
                  <p className="text-xs text-gray-500">Format: Admin2024! + initiales</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-8 h-8 text-gray-600" />
                <div>
                  <p className="font-medium">Notification</p>
                  <p className="text-sm text-gray-600">Email automatique</p>
                  <p className="text-xs text-gray-500">Avec instructions</p>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleSendCredentials}
              disabled={sendCredentialsMutation.isPending}
              className="w-full"
            >
              {sendCredentialsMutation.isPending ? (
                'Envoi en cours...'
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer les identifiants aux administrateurs
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Résultats de l'envoi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {result.success ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">{result.email}</p>
                      {result.success && result.password && (
                        <p className="text-sm text-gray-600">
                          Mot de passe: <code className="bg-gray-100 px-1 rounded">{result.password}</code>
                        </p>
                      )}
                      {!result.success && result.error && (
                        <p className="text-sm text-red-600">{result.error}</p>
                      )}
                    </div>
                  </div>
                  <Badge variant={result.success ? "default" : "destructive"}>
                    {result.success ? 'Envoyé' : 'Erreur'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
