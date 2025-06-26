
import { supabase } from '@/integrations/supabase/client';

export interface SecurityEvent {
  event_type: string;
  user_id?: string;
  admin_email?: string;
  ip_address?: string;
  user_agent?: string;
  event_data?: any;
}

export class SecurityLogger {
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
}
