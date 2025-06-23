
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bell, 
  X, 
  LogOut, 
  Building2, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  User
} from 'lucide-react';
import { useEnhancedAdminAuth } from '@/hooks/useEnhancedAdminAuth';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Notification {
  id: string;
  type: 'new_request' | 'renewal_request' | 'system_alert';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  companyName?: string;
  requestType?: string;
}

interface AdminSidecarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidecar = ({ isOpen, onClose }: AdminSidecarProps) => {
  const { adminEmail, logout } = useEnhancedAdminAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
      // Écouter les nouvelles demandes en temps réel
      const subscription = supabase
        .channel('admin-notifications')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'paid_account_requests'
        }, (payload) => {
          handleNewRequest(payload.new);
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isOpen]);

  const loadNotifications = async () => {
    try {
      // Simuler le chargement des notifications - à remplacer par des vraies données
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'new_request',
          title: 'Nouvelle demande de licence',
          message: 'Une nouvelle demande pour le module Comptabilité',
          timestamp: new Date().toISOString(),
          isRead: false,
          companyName: 'Exemple Corp',
          requestType: 'comptabilite'
        }
      ];
      
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
    } catch (error) {
      console.error('Erreur lors du chargement des notifications:', error);
    }
  };

  const handleNewRequest = async (requestData: any) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'new_request',
      title: 'Nouvelle demande de licence',
      message: `Demande ${requestData.request_type || 'nouvelle'} reçue`,
      timestamp: new Date().toISOString(),
      isRead: false,
      companyName: requestData.company_name,
      requestType: requestData.plan_id
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);

    // Notification toast
    toast.success('Nouvelle demande de licence reçue');

    // Envoyer notification par email
    await sendEmailNotification(newNotification);
  };

  const sendEmailNotification = async (notification: Notification) => {
    try {
      await supabase.functions.invoke('send-admin-notification', {
        body: {
          type: notification.type,
          title: notification.title,
          message: notification.message,
          companyName: notification.companyName,
          requestType: notification.requestType,
          timestamp: notification.timestamp
        }
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification email:', error);
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    toast.success('Toutes les notifications ont été supprimées');
  };

  const handleLogout = () => {
    logout();
    toast.success('Déconnexion réussie');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_request':
        return <Building2 className="w-4 h-4 text-blue-600" />;
      case 'renewal_request':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'system_alert':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div 
        className="flex-1 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Sidecar */}
      <div className="w-96 bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Notifications Admin
              </h2>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Admin Info */}
          <div className="mt-3 flex items-center space-x-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{adminEmail}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAllNotifications}
              className="flex-1"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Tout marquer lu
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Aucune notification</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <Card 
                  key={notification.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    !notification.isRead ? 'border-blue-200 bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        {notification.companyName && (
                          <p className="text-xs text-blue-600 mt-1">
                            Entreprise: {notification.companyName}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(notification.timestamp).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
