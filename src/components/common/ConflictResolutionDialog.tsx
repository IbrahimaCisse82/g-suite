
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Clock, User, Server } from 'lucide-react';
import { SyncConflict } from '@/services/syncManager';

interface ConflictResolutionDialogProps {
  conflict: SyncConflict | null;
  isOpen: boolean;
  onClose: () => void;
  onResolve: (resolution: 'local' | 'server' | 'merge' | any) => Promise<void>;
}

export const ConflictResolutionDialog: React.FC<ConflictResolutionDialogProps> = ({
  conflict,
  isOpen,
  onClose,
  onResolve
}) => {
  const [isResolving, setIsResolving] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState<'local' | 'server' | 'merge'>('local');

  if (!conflict) return null;

  const handleResolve = async (resolution: 'local' | 'server' | 'merge') => {
    setIsResolving(true);
    try {
      await onResolve(resolution);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la résolution:', error);
    } finally {
      setIsResolving(false);
    }
  };

  const formatData = (data: any) => {
    return Object.entries(data)
      .filter(([key]) => !['id', 'created_at', 'updated_at'].includes(key))
      .map(([key, value]) => (
        <div key={key} className="flex justify-between py-1">
          <span className="text-sm font-medium text-gray-600 capitalize">
            {key.replace('_', ' ')}:
          </span>
          <span className="text-sm text-gray-900 max-w-xs truncate">
            {String(value)}
          </span>
        </div>
      ));
  };

  const getDifferingFields = () => {
    const differing: string[] = [];
    const excludeFields = ['id', 'created_at', 'updated_at'];
    
    Object.keys(conflict.localData).forEach(key => {
      if (!excludeFields.includes(key) && 
          conflict.localData[key] !== conflict.serverData[key]) {
        differing.push(key);
      }
    });
    
    return differing;
  };

  const differingFields = getDifferingFields();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Résoudre le conflit de synchronisation
          </DialogTitle>
          <DialogDescription>
            Un conflit a été détecté pour {conflict.type}. Choisissez la version à conserver.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informations du conflit */}
          <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <div className="flex-1">
              <h4 className="font-medium">Conflit détecté</h4>
              <p className="text-sm text-gray-600">
                {differingFields.length} champ(s) différent(s): {differingFields.join(', ')}
              </p>
            </div>
            <Badge variant="outline">{conflict.type}</Badge>
          </div>

          {/* Comparaison des versions */}
          <Tabs defaultValue="comparison" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comparison">Comparaison</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Version locale */}
                <Card className={`cursor-pointer transition-all ${
                  selectedResolution === 'local' ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`} onClick={() => setSelectedResolution('local')}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Version Locale
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(conflict.localTimestamp).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {formatData(conflict.localData)}
                  </CardContent>
                </Card>

                {/* Version serveur */}
                <Card className={`cursor-pointer transition-all ${
                  selectedResolution === 'server' ? 'ring-2 ring-green-500 bg-green-50' : ''
                }`} onClick={() => setSelectedResolution('server')}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Server className="w-5 h-5 text-green-600" />
                      Version Serveur
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(conflict.serverTimestamp).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {formatData(conflict.serverData)}
                  </CardContent>
                </Card>
              </div>

              {/* Option de fusion */}
              <Card className={`cursor-pointer transition-all ${
                selectedResolution === 'merge' ? 'ring-2 ring-purple-500 bg-purple-50' : ''
              }`} onClick={() => setSelectedResolution('merge')}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-purple-600" />
                    Fusion Automatique
                  </CardTitle>
                  <CardDescription>
                    Combiner les deux versions en gardant les valeurs les plus récentes pour chaque champ
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium">Champs en conflit</h4>
                {differingFields.map(field => (
                  <div key={field} className="p-3 border rounded-lg">
                    <h5 className="font-medium capitalize mb-2">{field.replace('_', ' ')}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Badge variant="outline" className="mb-1">Local</Badge>
                        <p className="text-sm text-gray-900 bg-blue-50 p-2 rounded">
                          {String(conflict.localData[field])}
                        </p>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-1">Serveur</Badge>
                        <p className="text-sm text-gray-900 bg-green-50 p-2 rounded">
                          {String(conflict.serverData[field])}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={isResolving}>
            Annuler
          </Button>
          <Button
            onClick={() => handleResolve(selectedResolution)}
            disabled={isResolving}
            className="flex items-center gap-2"
          >
            {isResolving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Résolution...
              </>
            ) : (
              `Appliquer ${selectedResolution === 'local' ? 'Local' : 
                           selectedResolution === 'server' ? 'Serveur' : 'Fusion'}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
