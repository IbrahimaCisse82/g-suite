
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminSession {
  isAuthenticated: boolean;
  adminEmail: string | null;
  loading: boolean;
}

interface LoginResult {
  success: boolean;
  isFirstLogin?: boolean;
}

export const useSecureAdminAuth = () => {
  const [session, setSession] = useState<AdminSession>({
    isAuthenticated: false,
    adminEmail: null,
    loading: true
  });
  const { toast } = useToast();

  useEffect(() => {
    checkAdminSession();
  }, []);

  const checkAdminSession = async () => {
    try {
      const adminEmail = localStorage.getItem('admin_email');
      const sessionToken = localStorage.getItem('admin_session_token');
      const sessionExpiry = localStorage.getItem('admin_session_expiry');

      if (!adminEmail || !sessionToken || !sessionExpiry) {
        setSession({ isAuthenticated: false, adminEmail: null, loading: false });
        return;
      }

      // Check if session has expired
      if (new Date().getTime() > parseInt(sessionExpiry)) {
        clearAdminSession();
        setSession({ isAuthenticated: false, adminEmail: null, loading: false });
        return;
      }

      // Verify admin exists and is active
      const { data, error } = await supabase
        .from('system_admins')
        .select('email, is_active')
        .eq('email', adminEmail)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        clearAdminSession();
        setSession({ isAuthenticated: false, adminEmail: null, loading: false });
        return;
      }

      setSession({ isAuthenticated: true, adminEmail: data.email, loading: false });
    } catch (error) {
      console.error('Admin session check error:', error);
      clearAdminSession();
      setSession({ isAuthenticated: false, adminEmail: null, loading: false });
    }
  };

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      console.log(`Attempting admin login for: ${email}`);
      
      // Vérifier les identifiants admin
      const { data, error } = await supabase.functions.invoke('verify-admin-credentials', {
        body: { email, password }
      });

      console.log('Login response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Erreur de connexion au serveur');
      }

      if (!data?.valid) {
        const errorMessage = data?.error || 'Identifiants administrateur invalides';
        console.log('Login failed:', errorMessage);
        throw new Error(errorMessage);
      }

      // Create secure session
      const sessionToken = crypto.randomUUID();
      const sessionExpiry = new Date().getTime() + (4 * 60 * 60 * 1000); // 4 hours

      localStorage.setItem('admin_email', email);
      localStorage.setItem('admin_session_token', sessionToken);
      localStorage.setItem('admin_session_expiry', sessionExpiry.toString());

      setSession({ isAuthenticated: true, adminEmail: email, loading: false });
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans le panneau d'administration"
      });

      return {
        success: true,
        isFirstLogin: data.isFirstLogin || false
      };
    } catch (error: any) {
      console.error('Admin login error:', error);
      throw error;
    }
  };

  const logout = () => {
    clearAdminSession();
    setSession({ isAuthenticated: false, adminEmail: null, loading: false });
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté du panneau d'administration"
    });
  };

  const clearAdminSession = () => {
    localStorage.removeItem('admin_email');
    localStorage.removeItem('admin_session_token');
    localStorage.removeItem('admin_session_expiry');
  };

  return {
    ...session,
    login,
    logout,
    refreshSession: checkAdminSession
  };
};
