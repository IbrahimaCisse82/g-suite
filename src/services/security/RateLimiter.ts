
import { supabase } from '@/integrations/supabase/client';

export class RateLimiter {
  static async checkRateLimit(
    identifier: string,
    actionType: string,
    maxAttempts: number = 5,
    windowMinutes: number = 15,
    blockMinutes: number = 15
  ): Promise<boolean> {
    try {
      const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000);
      
      // Check if currently blocked
      const { data: blocked } = await supabase
        .from('rate_limits')
        .select('blocked_until')
        .eq('identifier', identifier)
        .eq('action_type', actionType)
        .gt('blocked_until', new Date().toISOString())
        .single();

      if (blocked) {
        return false;
      }

      // Get current attempts in window
      const { data: attempts, error } = await supabase
        .from('rate_limits')
        .select('attempt_count')
        .eq('identifier', identifier)
        .eq('action_type', actionType)
        .gt('window_start', windowStart.toISOString())
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Rate limit check error:', error);
        return true; // Fail open
      }

      const currentAttempts = attempts?.attempt_count || 0;

      if (currentAttempts >= maxAttempts) {
        // Block the identifier
        await supabase
          .from('rate_limits')
          .upsert({
            identifier,
            action_type: actionType,
            attempt_count: currentAttempts + 1,
            window_start: new Date().toISOString(),
            blocked_until: new Date(Date.now() + blockMinutes * 60 * 1000).toISOString()
          });
        return false;
      }

      // Update attempt count
      await supabase
        .from('rate_limits')
        .upsert({
          identifier,
          action_type: actionType,
          attempt_count: currentAttempts + 1,
          window_start: attempts ? attempts.window_start : new Date().toISOString()
        });

      return true;
    } catch (error) {
      console.error('Rate limiting error:', error);
      return true; // Fail open for availability
    }
  }

  static async checkSuspiciousActivity(userId: string): Promise<boolean> {
    try {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      
      const { data, error } = await supabase
        .from('rate_limits')
        .select('attempt_count')
        .eq('identifier', userId)
        .gt('window_start', oneHourAgo.toISOString());

      if (error) {
        console.error('Suspicious activity check error:', error);
        return false;
      }

      const totalAttempts = data?.reduce((sum, record) => sum + record.attempt_count, 0) || 0;
      return totalAttempts > 50; // Threshold for suspicious activity
    } catch (error) {
      console.error('Suspicious activity check error:', error);
      return false;
    }
  }
}
