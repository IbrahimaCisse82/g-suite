
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SecurityService } from '@/services/securityService';

interface AdminSession {
  isAuthenticated: boolean;
  adminEmail: string | null;
  sessionToken: string | null;
  loading: boolean;
  lastActivity: Date | null;
}

interface LoginResult {
  success: boolean;
  isFirstLogin?: boolean;
  requiresPasswordChange?: boolean;
}

export const useEnhancedAdminAuth = () => {
  const [session, setSession] = useState<AdminSession>({
    isAuthenticated: false,
    adminEmail: null,
    sessionToken: null,
    loading: true,
    lastActivity: null
  });
  const { toast } = useToast();

  useEffect(() => {
    checkAdminSession();
    
    // Auto-cleanup expired sessions every 5 minutes
    const cleanupInterval = setInterval(() => {
      SecurityService.cleanupExpiredSessions();
    }, 5 * 60 * 1000);

    return () => clearInterval(cleanupInterval);
  }, []);

  const checkAdminSession = async () => {
    try {
      const adminEmail = localStorage.getItem('admin_email');
      const sessionToken = localStorage.getItem('admin_session_token');
      const sessionExpiry = localStorage.getItem('admin_session_expiry');

      if (!adminEmail || !sessionToken || !sessionExpiry) {
        setSession(prev => ({ ...prev, loading: false }));
        return;
      }

      // Check if session has expired
      if (new Date().getTime() > parseInt(sessionExpiry)) {
        await logout();
        return;
      }

      // Try to verify session in database (if tables exist)
      try {
        // This will fail gracefully if the admin_sessions table doesn't exist yet
        const { data: sessionData, error } = await supabase
          .from('system_admins')
          .select('email, is_active')
          .eq('email', adminEmail)
          .eq('is_active', true)
          .single();

        if (error || !sessionData) {
          await logout();
          return;
        }

        // For now, we'll use simple localStorage-based session validation
        // until the admin_sessions table is created
        setSession({
          isAuthenticated: true,
          adminEmail: sessionData.email,
          sessionToken: sessionToken,
          loading: false,
          lastActivity: new Date()
        });

      } catch (error) {
        console.log('Admin sessions table not yet available, using simple validation');
        
        // Fallback to simple validation
        const { data: adminData, error: adminError } = await supabase
          .from('system_admins')
          .select('email, is_active')
          .eq('email', adminEmail)
          .eq('is_active', true)
          .single();

        if (adminError || !adminData) {
          await logout();
          return;
        }

        setSession({
          isAuthenticated: true,
          adminEmail: adminData.email,
          sessionToken: sessionToken,
          loading: false,
          lastActivity: new Date()
        });
      }

    } catch (error) {
      console.error('Admin session check error:', error);
      await logout();
    }
  };

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      const userIP = await SecurityService.getUserIP();
      
      // Log login attempt (if security tables exist)
      try {
        await SecurityService.logSecurityEvent({
          event_type: 'admin_login_attempt',
          admin_email: email,
          ip_address: userIP,
          event_data: { timestamp: new Date().toISOString() }
        });
      } catch (error) {
        console.log('Security event logging not available yet');
      }

      // Verify admin credentials
      const { data, error } = await supabase.functions.invoke('verify-admin-credentials', {
        body: { email, password }
      });

      if (error || !data?.valid) {
        try {
          await SecurityService.logSecurityEvent({
            event_type: 'admin_login_failed',
            admin_email: email,
            ip_address: userIP,
            event_data: { error: error?.message || 'Invalid credentials' }
          });
        } catch (logError) {
          console.log('Security event logging not available yet');
        }
        
        throw new Error(data?.error || 'Identifiants administrateur invalides');
      }

      // Create secure session
      const sessionToken = crypto.randomUUID();
      const sessionExpiry = new Date().getTime() + (4 * 60 * 60 * 1000); // 4 hours

      // Try to store session in database (if table exists)
      try {
        const { error: sessionError } = await supabase
          .from('system_admins')
          .select('id')
          .eq('email', email)
          .single();

        if (!sessionError) {
          // For now, we'll just use localStorage until admin_sessions table is created
          console.log('Admin sessions table not yet available, using localStorage');
        }
      } catch (error) {
        console.log('Admin sessions table not yet available');
      }

      // Store session locally
      localStorage.setItem('admin_email', email);
      localStorage.setItem('admin_session_token', sessionToken);
      localStorage.setItem('admin_session_expiry', sessionExpiry.toString());

      setSession({
        isAuthenticated: true,
        adminEmail: email,
        sessionToken: sessionToken,
        loading: false,
        lastActivity: new Date()
      });

      // Log successful login
      try {
        await SecurityService.logSecurityEvent({
          event_type: 'admin_login_success',
          admin_email: email,
          ip_address: userIP,
          event_data: { session_token: sessionToken }
        });
      } catch (error) {
        console.log('Security event logging not available yet');
      }

      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans le panneau d'administration sécurisé"
      });

      return {
        success: true,
        isFirstLogin: data.isFirstLogin || false,
        requiresPasswordChange: data.isFirstLogin || false
      };

    } catch (error: any) {
      console.error('Admin login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const sessionToken = localStorage.getItem('admin_session_token');
      const adminEmail = localStorage.getItem('admin_email');
      
      if (sessionToken) {
        // Try to deactivate session in database (if table exists)
        try {
          // This will be implemented once admin_sessions table is created
          console.log('Session deactivation in database not yet available');
        } catch (error) {
          console.log('Admin sessions table not yet available');
        }

        // Log logout
        try {
          await SecurityService.logSecurityEvent({
            event_type: 'admin_logout',
            admin_email: adminEmail,
            event_data: { session_token: sessionToken }
          });
        } catch (error) {
          console.log('Security event logging not available yet');
        }
      }

      // Clear local storage
      localStorage.removeItem('admin_email');
      localStorage.removeItem('admin_session_token');
      localStorage.removeItem('admin_session_expiry');

      setSession({
        isAuthenticated: false,
        adminEmail: null,
        sessionToken: null,
        loading: false,
        lastActivity: null
      });

      toast({
        title: "Déconnexion sécurisée",
        description: "Vous avez été déconnecté du panneau d'administration"
      });

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const extendSession = async (): Promise<boolean> => {
    try {
      const sessionToken = localStorage.getItem('admin_session_token');
      if (!sessionToken) return false;

      const newExpiry = new Date().getTime() + (4 * 60 * 60 * 1000);
      
      // Try to update session in database (if table exists)
      try {
        // This will be implemented once admin_sessions table is created
        console.log('Session extension in database not yet available');
      } catch (error) {
        console.log('Admin sessions table not yet available');
      }

      // Update localStorage
      localStorage.setItem('admin_session_expiry', newExpiry.toString());
      return true;

    } catch (error) {
      console.error('Session extension error:', error);
      return false;
    }
  };

  return {
    ...session,
    login,
    logout,
    extendSession,
    refreshSession: checkAdminSession
  };
};
