
import React from 'react';
import { Cloud, CloudOff, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useConnectivity } from '@/hooks/useConnectivity';

interface SyncStatusProps {
  pendingCount?: number;
  onSync?: () => void;
  isSync?: boolean;
  compact?: boolean;
}

export const SyncStatus: React.FC<SyncStatusProps> = ({ 
  pendingCount = 0, 
  onSync, 
  isSync = false,
  compact = false 
}) => {
  const { isOnline } = useConnectivity();

  const getSyncIcon = () => {
    if (isSync) return <RefreshCw className="w-4 h-4 animate-spin" />;
    if (!isOnline) return <CloudOff className="w-4 h-4" />;
    if (pendingCount > 0) return <AlertCircle className="w-4 h-4" />;
    return <Cloud className="w-4 h-4" />;
  };

  const getSyncColor = () => {
    if (!isOnline) return 'text-red-600';
    if (pendingCount > 0) return 'text-orange-600';
    return 'text-green-600';
  };

  const getSyncText = () => {
    if (isSync) return 'Synchronisation...';
    if (!isOnline) return 'Hors ligne';
    if (pendingCount > 0) return `${pendingCount} en attente`;
    return 'Synchronisé';
  };

  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`flex items-center space-x-1 ${getSyncColor()}`}>
              {getSyncIcon()}
              {pendingCount > 0 && (
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  {pendingCount}
                </Badge>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{getSyncText()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="flex items-center space-x-3 p-3 bg-white border rounded-lg shadow-sm">
      <div className={`flex items-center space-x-2 ${getSyncColor()}`}>
        {getSyncIcon()}
        <span className="text-sm font-medium">{getSyncText()}</span>
      </div>
      
      {pendingCount > 0 && (
        <Badge variant="outline" className="text-xs">
          {pendingCount} modifications
        </Badge>
      )}
      
      {onSync && isOnline && pendingCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onSync}
          disabled={isSync}
          className="h-8 px-3"
        >
          {isSync ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            'Synchroniser'
          )}
        </Button>
      )}
    </div>
  );
};
