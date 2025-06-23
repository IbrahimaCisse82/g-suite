
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
  // Log security events using the RPC function
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

  // Enhanced audit logging using the new function
  static async logSecurityAudit(params: {
    eventType: string;
    userIdentifier?: string;
    resourceType?: string;
    resourceId?: string;
    oldValues?: any;
    newValues?: any;
    success?: boolean;
    errorMessage?: string;
  }): Promise<void> {
    try {
      const userIP = await this.getUserIP();
      
      const { error } = await supabase.rpc('log_security_audit', {
        event_type_param: params.eventType,
        user_identifier_param: params.userIdentifier || null,
        resource_type_param: params.resourceType || null,
        resource_id_param: params.resourceId || null,
        old_values_param: params.oldValues || null,
        new_values_param: params.newValues || null,
        success_param: params.success ?? true,
        error_message_param: params.errorMessage || null,
        ip_address_param: userIP,
        user_agent_param: navigator.userAgent
      });

      if (error) {
        console.error('Failed to log security audit:', error);
      }
    } catch (error) {
      console.error('Security audit logging error:', error);
    }
  }

  // Enhanced rate limiting using database function
  static async checkRateLimit(
    identifier: string,
    actionType: string,
    maxAttempts: number = 5,
    windowMinutes: number = 15,
    blockMinutes: number = 15
  ): Promise<boolean> {
    try {
      const { data, error } = await supabase.rpc('check_rate_limit_secure', {
        identifier_param: identifier,
        action_type_param: actionType,
        max_attempts: maxAttempts,
        window_minutes: windowMinutes,
        block_minutes: blockMinutes
      });

      if (error) {
        console.error('Rate limit check error:', error);
        return false; // Fail closed for security
      }

      return data;
    } catch (error) {
      console.error('Rate limit check error:', error);
      return false;
    }
  }

  // Validate password strength using the RPC function
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

  // Check for suspicious activity patterns by calling RPC function
  static async checkSuspiciousActivity(userId: string): Promise<boolean> {
    try {
      // We'll implement this with a custom RPC function if needed
      // For now, return false as a safe default
      return false;
    } catch (error) {
      console.error('Suspicious activity check error:', error);
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

  // Get recent security events from the audit log
  static async getRecentSecurityEvents(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('security_audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching security audit events:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching security events:', error);
      return [];
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

  // Input sanitization helper
  static sanitizeInput(input: string): string {
    if (!input) return input;
    return input.trim().replace(/[<>"'&;]/g, '');
  }

  // Email validation helper
  static validateEmailFormat(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email) && email.length <= 255 && email.length >= 5;
  }

  // Generate secure session token
  static generateSessionToken(): string {
    return crypto.randomUUID() + '-' + Date.now().toString(36);
  }
}
