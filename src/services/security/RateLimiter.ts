
import { supabase } from '@/integrations/supabase/client';

export class RateLimiter {
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
}
