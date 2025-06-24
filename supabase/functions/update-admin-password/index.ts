
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UpdatePasswordRequest {
  email: string;
  password: string;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const validatePasswordStrength = (password: string): boolean => {
  const requirements = [
    password.length >= 12,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
    !/(.)\1{2,}/.test(password) // No repeated characters
  ];
  
  return requirements.every(req => req);
};

const sanitizeInput = (input: string): string => {
  if (!input) return input;
  return input.trim().replace(/[<>"'&;]/g, '');
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { email, password }: UpdatePasswordRequest = await req.json();

    // Input validation and sanitization
    const sanitizedEmail = sanitizeInput(email);
    
    if (!sanitizedEmail || !password) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Email et mot de passe requis' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(sanitizedEmail)) {
      console.error('Invalid email format:', sanitizedEmail);
      return new Response(
        JSON.stringify({ error: 'Format d\'email invalide' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate password strength
    if (!validatePasswordStrength(password)) {
      console.error('Password does not meet strength requirements');
      return new Response(
        JSON.stringify({ error: 'Le mot de passe ne respecte pas les critères de sécurité' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify admin exists
    const { data: adminData, error: adminError } = await supabase
      .from('system_admins')
      .select('id, email, is_active')
      .eq('email', sanitizedEmail)
      .single();

    if (adminError || !adminData) {
      console.error('Admin not found:', adminError);
      return new Response(
        JSON.stringify({ error: 'Administrateur non trouvé' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!adminData.is_active) {
      console.error('Admin account is inactive');
      return new Response(
        JSON.stringify({ error: 'Compte administrateur désactivé' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Hash the password securely
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update admin password
    const { error: updateError } = await supabase
      .from('system_admins')
      .update({ 
        password: hashedPassword,
        is_first_login: false,
        updated_at: new Date().toISOString()
      })
      .eq('email', sanitizedEmail);

    if (updateError) {
      console.error('Failed to update password:', updateError);
      return new Response(
        JSON.stringify({ error: 'Erreur lors de la mise à jour du mot de passe' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log security event
    await supabase
      .from('security_audit_log')
      .insert({
        event_type: 'admin_password_updated',
        user_identifier: sanitizedEmail,
        success: true,
        user_agent: req.headers.get('user-agent') || 'Unknown'
      });

    console.log('Password updated successfully for admin:', sanitizedEmail);

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Update password error:', error);
    
    return new Response(
      JSON.stringify({ error: 'Erreur interne du serveur' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
};

serve(handler);
