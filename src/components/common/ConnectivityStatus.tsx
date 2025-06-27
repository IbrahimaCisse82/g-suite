
import React from 'react';
import { Wifi, WifiOff, RefreshCw, Clock, Signal } from 'lucide-react';
import { useConnectivity } from '@/hooks/useConnectivity';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ConnectivityStatusProps {
  showDetails?: boolean;
  compact?: boolean;
}

export const ConnectivityStatus: React.FC<ConnectivityStatusProps> = ({ 
  showDetails = false, 
  compact = false 
}) => {
  const { isOnline, connectionType, offlineDuration, lastOnlineTime, refresh } = useConnectivity();

  const getStatusColor = () => {
    if (isOnline) return 'bg-green-500';
    return 'bg-red-500';
  };

  const getStatusText = () => {
    if (isOnline) return 'En ligne';
    return offlineDuration ? `Hors ligne depuis ${offlineDuration}` : 'Hors ligne';
  };

  const getConnectionIcon = () => {
    if (!isOnline) return <WifiOff className="w-4 h-4" />;
    
    switch (connectionType) {
      case '4g':
      case '3g':
        return <Signal className="w-4 h-4" />;
      default:
        return <Wifi className="w-4 h-4" />;
    }
  };

  const formatLastOnlineTime = () => {
    if (!lastOnlineTime) return 'Jamais connecté';
    
    const diff = Date.now() - lastOnlineTime;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `Il y a ${hours}h`;
    if (minutes > 0) return `Il y a ${minutes}min`;
    return 'À l\'instant';
  };

  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
              {getConnectionIcon()}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{getStatusText()}</p>
            {connectionType !== 'unknown' && (
              <p className="text-xs text-gray-500">Type: {connectionType.toUpperCase()}</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="flex items-center space-x-3 p-3 bg-white border rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`} />
        {getConnectionIcon()}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${isOnline ? 'text-green-700' : 'text-red-700'}`}>
            {getStatusText()}
          </span>
          
          {connectionType !== 'unknown' && isOnline && (
            <Badge variant="secondary" className="text-xs">
              {connectionType.toUpperCase()}
            </Badge>
          )}
        </div>
        
        {showDetails && (
          <div className="text-xs text-gray-500 mt-1 flex items-center space-x-4">
            {!isOnline && lastOnlineTime && (
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Dernière connexion: {formatLastOnlineTime()}</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={refresh}
        className="h-8 w-8 p-0"
        title="Actualiser le statut"
      >
        <RefreshCw className="w-4 h-4" />
      </Button>
    </div>
  );
};
