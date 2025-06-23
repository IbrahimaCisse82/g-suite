
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AdminNotificationButtonProps {
  onClick: () => void;
}

export const AdminNotificationButton = ({ onClick }: AdminNotificationButtonProps) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Écouter les nouvelles demandes
    const subscription = supabase
      .channel('notification-counter')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'paid_account_requests'
      }, () => {
        setUnreadCount(prev => prev + 1);
      })
      .subscribe();

    // Charger le nombre initial de demandes non traitées
    loadUnreadCount();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadUnreadCount = async () => {
    try {
      const { data, error } = await supabase
        .from('paid_account_requests')
        .select('id')
        .eq('status', 'pending');

      if (error) {
        console.error('Erreur lors du chargement du compteur:', error);
        return;
      }

      setUnreadCount(data?.length || 0);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="relative"
    >
      <Bell className="w-4 h-4" />
      {unreadCount > 0 && (
        <Badge 
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5"
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </Badge>
      )}
    </Button>
  );
};
