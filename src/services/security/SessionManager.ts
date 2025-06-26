
import { supabase } from '@/integrations/supabase/client';

export class SessionManager {
  // Enhanced admin session validation
  static async validateAdminSession(sessionToken: string, adminEmail: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.rpc('validate_admin_session_secure', {
        session_token_param: sessionToken,
        admin_email_param: adminEmail
      });

      if (error) {
        console.error('Session validation error:', error);
        return false;
      }

      return data;
    } catch (error) {
      console.error('Session validation error:', error);
      return false;
    }
  }

  // Clean up expired sessions using the RPC function
  static async cleanupExpiredSessions(): Promise<number> {
    try {
      const { data, error } = await supabase.rpc('cleanup_expired_sessions');
      
      if (error) {
        console.error('Session cleanup error:', error);
        return 0;
      }

      return data || 0;
    } catch (error) {
      console.error('Session cleanup error:', error);
      return 0;
    }
  }

  // Get active admin sessions
  static async getActiveAdminSessions(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('admin_sessions')
        .select('*')
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching admin sessions:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching admin sessions:', error);
      return [];
    }
  }

  // Generate secure session token
  static generateSessionToken(): string {
    return crypto.randomUUID() + '-' + Date.now().toString(36);
  }
}
