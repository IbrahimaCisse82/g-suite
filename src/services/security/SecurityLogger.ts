
import { supabase } from '@/integrations/supabase/client';

export interface SecurityEvent {
  eventType: string;
  userIdentifier?: string;
  resourceType?: string;
  resourceId?: string;
  oldValues?: any;
  newValues?: any;
  success?: boolean;
  errorMessage?: string;
}

export class SecurityLogger {
  static async logSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
      const { error } = await supabase
        .from('security_events')
        .insert({
          event_type: event.eventType,
          user_identifier: event.userIdentifier,
          event_data: {
            resourceType: event.resourceType,
            resourceId: event.resourceId,
            oldValues: event.oldValues,
            newValues: event.newValues,
            success: event.success,
            errorMessage: event.errorMessage
          },
          ip_address: await this.getUserIP(),
          user_agent: navigator.userAgent
        });

      if (error) {
        console.error('Failed to log security event:', error);
      }
    } catch (error) {
      console.error('Security logging error:', error);
    }
  }

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
      const { error } = await supabase
        .from('security_audit_log')
        .insert({
          event_type: params.eventType,
          user_identifier: params.userIdentifier,
          resource_type: params.resourceType,
          resource_id: params.resourceId,
          old_values: params.oldValues,
          new_values: params.newValues,
          success: params.success ?? true,
          error_message: params.errorMessage,
          ip_address: await this.getUserIP(),
          user_agent: navigator.userAgent
        });

      if (error) {
        console.error('Failed to log security audit:', error);
      }
    } catch (error) {
      console.error('Security audit logging error:', error);
    }
  }

  static async getRecentSecurityEvents(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('security_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch security events:', error);
      return [];
    }
  }

  static async getUserIP(): Promise<string | null> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Failed to get user IP:', error);
      return null;
    }
  }
}
