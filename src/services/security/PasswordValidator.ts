
import { supabase } from '@/integrations/supabase/client';

export class PasswordValidator {
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
}
