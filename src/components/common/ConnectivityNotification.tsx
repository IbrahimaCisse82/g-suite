
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Wifi, WifiOff } from 'lucide-react';
import { useConnectivity } from '@/hooks/useConnectivity';

export const ConnectivityNotification: React.FC = () => {
  const { isOnline } = useConnectivity();
  const [previousState, setPreviousState] = useState<boolean | null>(null);

  useEffect(() => {
    // Ne pas afficher de notification au premier chargement
    if (previousState === null) {
      setPreviousState(isOnline);
      return;
    }

    // Notification quand on passe hors ligne
    if (previousState && !isOnline) {
      toast.error(
        'Connexion perdue',
        {
          description: 'Vous travaillez maintenant en mode hors ligne. Vos modifications seront synchronisées à la reconnexion.',
          icon: <WifiOff className="w-4 h-4" />,
          duration: 5000,
        }
      );
    }

    // Notification quand on revient en ligne
    if (!previousState && isOnline) {
      toast.success(
        'Connexion rétablie',
        {
          description: 'Synchronisation en cours de vos données...',
          icon: <Wifi className="w-4 h-4" />,
          duration: 4000,
        }
      );
    }

    setPreviousState(isOnline);
  }, [isOnline, previousState]);

  return null; // Ce composant n'affiche rien directement
};
