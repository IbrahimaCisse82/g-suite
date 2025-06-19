
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Activity, Clock, Users, Eye, CheckCircle } from 'lucide-react';
import { SecurityService } from '@/services/securityService';
import { toast } from 'sonner';

interface SecurityEvent {
  id: string;
  event_type: string;
  admin_email?: string;
  ip_address?: string;
  user_agent?: string;
  event_data?: any;
  created_at: string;
}

interface AdminSession {
  id: string;
  admin_email: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  last_activity: string;
  is_active: boolean;
}

export const SecurityDashboard = () => {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [adminSessions, setAdminSessions] = useState<AdminSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    failedLogins: 0,
    activeSessions: 0,
    suspiciousActivity: 0
  });

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    try {
      setLoading(true);

      // Load security events and sessions using the security service
      const events = await SecurityService.getRecentSecurityEvents();
      const sessions = await SecurityService.getActiveAdminSessions();

      setSecurityEvents(events);
      setAdminSessions(sessions);

      // Calculate stats
      const failedLogins = events.filter(e => e.event_type === 'admin_login_failed').length;
      const suspiciousActivity = events.filter(e => 
        e.event_type.includes('suspicious') || 
        e.event_type.includes('failed')
      ).length;

      setStats({
        totalEvents: events.length,
        failedLogins,
        activeSessions: sessions.length,
        suspiciousActivity
      });

    } catch (error) {
      console.error('Error loading security data:', error);
      toast.error('Erreur lors du chargement des données de sécurité');
    } finally {
      setLoading(false);
    }
  };

  const cleanupExpiredSessions = async () => {
    try {
      const deletedCount = await SecurityService.cleanupExpiredSessions();
      toast.success(`${deletedCount} sessions expirées nettoyées`);
      loadSecurityData();
    } catch (error) {
      toast.error('Erreur lors du nettoyage des sessions');
    }
  };

  const getEventBadgeColor = (eventType: string) => {
    if (eventType.includes('failed') || eventType.includes('suspicious')) {
      return 'destructive';
    }
    if (eventType.includes('success') || eventType.includes('login')) {
      return 'default';
    }
    return 'secondary';
  };

  const formatEventType = (eventType: string) => {
    return eventType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Shield className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Chargement des données de sécurité...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Tableau de Bord Sécurité
        </h2>
        <Button onClick={cleanupExpiredSessions} variant="outline">
          <Clock className="w-4 h-4 mr-2" />
          Nettoyer Sessions Expirées
        </Button>
      </div>

      {/* Security Migration Success Notice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            Migration de Sécurité Réussie
          </CardTitle>
          <CardDescription>
            Les fonctionnalités de sécurité avancées ont été activées avec succès
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-800">Fonctionnalités Activées :</h4>
              <ul className="space-y-1 text-green-700">
                <li>✓ Tables de sécurité créées</li>
                <li>✓ Politiques RLS configurées</li>
                <li>✓ Journalisation des événements</li>
                <li>✓ Gestion des sessions admin</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-800">Protections Actives :</h4>
              <ul className="space-y-1 text-green-700">
                <li>✓ Validation des mots de passe</li>
                <li>✓ Déclencheurs d'audit</li>
                <li>✓ Nettoyage automatique des sessions</li>
                <li>✓ Contrôle d'accès renforcé</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalEvents}</p>
                <p className="text-sm text-gray-600">Événements Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{stats.failedLogins}</p>
                <p className="text-sm text-gray-600">Connexions Échouées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.activeSessions}</p>
                <p className="text-sm text-gray-600">Sessions Actives</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{stats.suspiciousActivity}</p>
                <p className="text-sm text-gray-600">Activités Suspectes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Security Events */}
        <Card>
          <CardHeader>
            <CardTitle>Événements de Sécurité Récents</CardTitle>
            <CardDescription>
              Les 20 derniers événements de sécurité du système
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {securityEvents.slice(0, 20).map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getEventBadgeColor(event.event_type)}>
                        {formatEventType(event.event_type)}
                      </Badge>
                      {event.admin_email && (
                        <span className="text-sm text-gray-600">{event.admin_email}</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(event.created_at).toLocaleString('fr-FR')}
                      {event.ip_address && ` • IP: ${event.ip_address}`}
                    </div>
                  </div>
                </div>
              ))}
              {securityEvents.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  Aucun événement de sécurité récent
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Active Admin Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Sessions Administrateur Actives</CardTitle>
            <CardDescription>
              Sessions administrateur actuellement actives
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {adminSessions.map((session) => (
                <div key={session.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{session.admin_email}</span>
                    <Badge variant="default">Actif</Badge>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Créée: {new Date(session.created_at).toLocaleString('fr-FR')}</div>
                    <div>Dernière activité: {new Date(session.last_activity).toLocaleString('fr-FR')}</div>
                    {session.ip_address && <div>IP: {session.ip_address}</div>}
                    {session.user_agent && (
                      <div className="truncate">Navigateur: {session.user_agent}</div>
                    )}
                  </div>
                </div>
              ))}
              {adminSessions.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  Aucune session active
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actions de Sécurité</CardTitle>
          <CardDescription>
            Outils de maintenance et de sécurité du système
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={loadSecurityData} variant="outline">
              <Activity className="w-4 h-4 mr-2" />
              Actualiser les Données
            </Button>
            <Button onClick={cleanupExpiredSessions} variant="outline">
              <Clock className="w-4 h-4 mr-2" />
              Nettoyer Sessions Expirées
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
