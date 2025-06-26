
import { supabase } from '@/integrations/supabase/client';

export class SessionManager {
  static async validateAdminSession(sessionToken: string, adminEmail: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('admin_sessions')
        .select('*')
        .eq('session_token', sessionToken)
        .eq('admin_email', adminEmail)
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString())
        .single();

      return !error && !!data;
    } catch (error) {
      console.error('Session validation error:', error);
      return false;
    }
  }

  static async cleanupExpiredSessions(): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('admin_sessions')
        .update({ is_active: false })
        .lt('expires_at', new Date().toISOString())
        .eq('is_active', true)
        .select();

      if (error) throw error;
      return data?.length || 0;
    } catch (error) {
      console.error('Session cleanup error:', error);
      return 0;
    }
  }

  static async getActiveAdminSessions(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('admin_sessions')
        .select('*')
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch active sessions:', error);
      return [];
    }
  }

  static generateSessionToken(): string {
    return crypto.randomUUID() + '-' + Date.now().toString(36);
  }
}
