
import { supabase } from '@/integrations/supabase/client';

export interface SecurityEvent {
  event_type: string;
  user_id?: string;
  admin_email?: string;
  ip_address?: string;
  user_agent?: string;
  event_data?: any;
}

export class SecurityService {
  // Log security events
  static async logSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
      const { error } = await supabase.rpc('log_security_event', {
        event_type_param: event.event_type,
        user_id_param: event.user_id || null,
        admin_email_param: event.admin_email || null,
        ip_address_param: event.ip_address || null,
        user_agent_param: event.user_agent || navigator.userAgent,
        event_data_param: event.event_data || null
      });

      if (error) {
        console.error('Failed to log security event:', error);
      }
    } catch (error) {
      console.error('Security logging error:', error);
    }
  }

  // Validate password strength
  static async validatePasswordStrength(password: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.rpc('validate_password_strength', {
        password_param: password
      });

      if (error) {
        console.error('Password validation error:', error);
        return false;
      }

      return data;
    } catch (error) {
      console.error('Password validation error:', error);
      return false;
    }
  }

  // Get user's IP address (best effort)
  static async getUserIP(): Promise<string | null> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.warn('Could not get user IP:', error);
      return null;
    }
  }

  // Check for suspicious activity patterns
  static async checkSuspiciousActivity(userId: string): Promise<boolean> {
    try {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      
      const { data, error } = await supabase
        .from('security_events')
        .select('id')
        .eq('user_id', userId)
        .gte('created_at', oneHourAgo)
        .limit(20);

      if (error) {
        console.error('Suspicious activity check error:', error);
        return false;
      }

      // Flag as suspicious if more than 15 events in the last hour
      return (data?.length || 0) > 15;
    } catch (error) {
      console.error('Suspicious activity check error:', error);
      return false;
    }
  }

  // Clean up expired sessions
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
}
