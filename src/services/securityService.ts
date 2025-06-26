
import { SecurityLogger, SecurityEvent } from './security/SecurityLogger';
import { PasswordValidator } from './security/PasswordValidator';
import { SessionManager } from './security/SessionManager';
import { RateLimiter } from './security/RateLimiter';

// Re-export types and interfaces for backward compatibility
export { SecurityEvent } from './security/SecurityLogger';

export class SecurityService {
  // Security logging methods
  static async logSecurityEvent(event: SecurityEvent): Promise<void> {
    return SecurityLogger.logSecurityEvent(event);
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
    return SecurityLogger.logSecurityAudit(params);
  }

  static async getRecentSecurityEvents(): Promise<any[]> {
    return SecurityLogger.getRecentSecurityEvents();
  }

  // Password validation methods
  static async validatePasswordStrength(password: string): Promise<boolean> {
    return PasswordValidator.validatePasswordStrength(password);
  }

  static sanitizeInput(input: string): string {
    return PasswordValidator.sanitizeInput(input);
  }

  static validateEmailFormat(email: string): boolean {
    return PasswordValidator.validateEmailFormat(email);
  }

  // Session management methods
  static async validateAdminSession(sessionToken: string, adminEmail: string): Promise<boolean> {
    return SessionManager.validateAdminSession(sessionToken, adminEmail);
  }

  static async cleanupExpiredSessions(): Promise<number> {
    return SessionManager.cleanupExpiredSessions();
  }

  static async getActiveAdminSessions(): Promise<any[]> {
    return SessionManager.getActiveAdminSessions();
  }

  static generateSessionToken(): string {
    return SessionManager.generateSessionToken();
  }

  // Rate limiting methods
  static async checkRateLimit(
    identifier: string,
    actionType: string,
    maxAttempts: number = 5,
    windowMinutes: number = 15,
    blockMinutes: number = 15
  ): Promise<boolean> {
    return RateLimiter.checkRateLimit(identifier, actionType, maxAttempts, windowMinutes, blockMinutes);
  }

  static async checkSuspiciousActivity(userId: string): Promise<boolean> {
    return RateLimiter.checkSuspiciousActivity(userId);
  }

  // Utility methods (delegated to SecurityLogger for IP retrieval)
  static async getUserIP(): Promise<string | null> {
    return SecurityLogger.getUserIP();
  }
}
