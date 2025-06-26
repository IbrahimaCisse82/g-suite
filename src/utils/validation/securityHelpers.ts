
export class SecurityHelpers {
  // Enhanced rate limiting check using database
  static async checkRateLimit(
    key: string, 
    maxAttempts: number = 5, 
    windowMs: number = 900000
  ): Promise<boolean> {
    try {
      // Import SecurityService dynamically to avoid circular dependency
      const { SecurityService } = await import('@/services/securityService');
      
      // Import InputSanitizer dynamically to avoid circular dependency
      const { InputSanitizer } = await import('./inputSanitizer');
      
      const sanitizedKey = InputSanitizer.sanitizeHtml(key);
      const windowMinutes = Math.floor(windowMs / 60000);
      
      return await SecurityService.checkRateLimit(
        sanitizedKey,
        'generic_action',
        maxAttempts,
        windowMinutes,
        windowMinutes
      );
    } catch (error) {
      console.error('Rate limit check failed:', error);
      return true; // Fail open for availability
    }
  }
}
