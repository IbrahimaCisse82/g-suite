import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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

export const useAdminAuthentication = () => {
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

      // Verify admin exists and is active
      const { data: adminData, error } = await supabase
        .from('system_admins')
        .select('email, is_active')
        .eq('email', adminEmail)
        .eq('is_active', true)
        .single();

      if (error || !adminData) {
        console.log('Admin session check failed:', error);
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
      const sanitizedEmail = email.trim();
      
      // Validate email format
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(sanitizedEmail)) {
        throw new Error('Format d\'email invalide');
      }

      console.log('Attempting admin login for:', sanitizedEmail);

      // Verify admin credentials using edge function
      const { data, error } = await supabase.functions.invoke('verify-admin-credentials', {
        body: { email: sanitizedEmail, password }
      });

      console.log('Edge function response:', { data, error });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error('Erreur de connexion au serveur');
      }

      if (!data?.valid) {
        throw new Error(data?.error || 'Identifiants administrateur invalides');
      }

      // Create secure session
      const sessionToken = crypto.randomUUID() + '-' + Date.now().toString(36);
      const sessionExpiry = new Date().getTime() + (4 * 60 * 60 * 1000); // 4 hours

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
      
      // Show user-friendly error messages
      if (error.message.includes('fetch')) {
        toast({
          title: "Erreur de connexion",
          description: "Impossible de se connecter au serveur. Veuillez réessayer.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erreur d'authentification",
          description: error.message || 'Identifiants invalides',
          variant: "destructive"
        });
      }
      
      throw error;
    }
  };

  const logout = async () => {
    try {
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
      const newExpiry = new Date().getTime() + (4 * 60 * 60 * 1000);
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
