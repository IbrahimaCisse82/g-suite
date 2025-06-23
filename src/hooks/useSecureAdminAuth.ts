import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SecurityService } from '@/services/securityService';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

      // Check if session has expired locally
      if (new Date().getTime() > parseInt(sessionExpiry)) {
        await logout();
        return;
      }

      // Validate session with database
      const isValidSession = await SecurityService.validateAdminSession(sessionToken, adminEmail);
      
      if (!isValidSession) {
        await logout();
        return;
      }

      // Verify admin exists and is active
      const { data: adminData, error } = await supabase
        .from('system_admins')
        .select('email, is_active')
        .eq('email', adminEmail)
        .eq('is_active', true)
        .single();

      if (error || !adminData) {
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

    } catch (error) {
      console.error('Admin session check error:', error);
      await logout();
    }
  };

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      const userIP = await SecurityService.getUserIP();
      const sanitizedEmail = SecurityService.sanitizeInput(email);
      
      // Validate email format
      if (!SecurityService.validateEmailFormat(sanitizedEmail)) {
        throw new Error('Format d\'email invalide');
      }

      // Check rate limiting
      const rateLimitKey = userIP || sanitizedEmail;
      const rateLimitAllowed = await SecurityService.checkRateLimit(
        rateLimitKey,
        'admin_login',
        5, // max attempts
        15, // window minutes
        15 // block minutes
      );

      if (!rateLimitAllowed) {
        await SecurityService.logSecurityAudit({
          eventType: 'admin_login_rate_limited',
          userIdentifier: sanitizedEmail,
          success: false,
          errorMessage: 'Rate limit exceeded'
        });
        throw new Error('Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.');
      }

      // Log login attempt
      await SecurityService.logSecurityAudit({
        eventType: 'admin_login_attempt',
        userIdentifier: sanitizedEmail
      });

      // Verify admin credentials using edge function
      const { data, error } = await supabase.functions.invoke('verify-admin-credentials', {
        body: { email: sanitizedEmail, password }
      });

      if (error || !data?.valid) {
        await SecurityService.logSecurityAudit({
          eventType: 'admin_login_failed',
          userIdentifier: sanitizedEmail,
          success: false,
          errorMessage: error?.message || 'Invalid credentials'
        });
        
        throw new Error(data?.error || 'Identifiants administrateur invalides');
      }

      // Create secure session
      const sessionToken = SecurityService.generateSessionToken();
      const sessionExpiry = new Date().getTime() + (4 * 60 * 60 * 1000); // 4 hours

      // Store session in database
      const { error: sessionError } = await supabase
        .from('admin_sessions')
        .insert({
          admin_email: sanitizedEmail,
          session_token: sessionToken,
          expires_at: new Date(sessionExpiry).toISOString(),
          ip_address: userIP,
          user_agent: navigator.userAgent
        });

      if (sessionError) {
        console.error('Failed to create admin session:', sessionError);
        throw new Error('Erreur lors de la création de session');
      }

      // Store session locally
      localStorage.setItem('admin_email', sanitizedEmail);
      localStorage.setItem('admin_session_token', sessionToken);
      localStorage.setItem('admin_session_expiry', sessionExpiry.toString());

      setSession({
        isAuthenticated: true,
        adminEmail: sanitizedEmail,
        sessionToken: sessionToken,
        loading: false,
        lastActivity: new Date()
      });

      // Log successful login
      await SecurityService.logSecurityAudit({
        eventType: 'admin_login_success',
        userIdentifier: sanitizedEmail,
        resourceType: 'admin_session',
        resourceId: sessionToken
      });

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
      
      if (sessionToken && adminEmail) {
        // Deactivate session in database
        await supabase
          .from('admin_sessions')
          .update({ is_active: false })
          .eq('session_token', sessionToken);

        // Log logout
        await SecurityService.logSecurityAudit({
          eventType: 'admin_logout',
          userIdentifier: adminEmail,
          resourceType: 'admin_session',
          resourceId: sessionToken
        });
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

      // Rediriger vers la landing page
      navigate('/');

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const extendSession = async (): Promise<boolean> => {
    try {
      const sessionToken = localStorage.getItem('admin_session_token');
      const adminEmail = localStorage.getItem('admin_email');
      
      if (!sessionToken || !adminEmail) return false;

      const newExpiry = new Date().getTime() + (4 * 60 * 60 * 1000);
      
      // Update session in database
      const { error } = await supabase
        .from('admin_sessions')
        .update({
          expires_at: new Date(newExpiry).toISOString(),
          last_activity: new Date().toISOString()
        })
        .eq('session_token', sessionToken);

      if (error) {
        console.error('Session extension error:', error);
        return false;
      }

      // Update localStorage
      localStorage.setItem('admin_session_expiry', newExpiry.toString());
      
      await SecurityService.logSecurityAudit({
        eventType: 'admin_session_extended',
        userIdentifier: adminEmail,
        resourceType: 'admin_session',
        resourceId: sessionToken
      });

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
