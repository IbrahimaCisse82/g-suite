
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerifyCredentialsRequest {
  email: string;
  password: string;
}

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl ?? '', supabaseServiceKey ?? '');

const sanitizeInput = (input: string): string => {
  if (!input) return input;
  return input.trim().replace(/[<>"'&;]/g, '');
};

const validateEmailFormat = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email) && email.length <= 255 && email.length >= 5;
};

const comparePasswords = async (plaintext: string, stored: string): Promise<boolean> => {
  // Simple comparison for now - in production, use proper hashing
  return plaintext === stored;
};

const handler = async (req: Request): Promise<Response> => {
  console.log('Verify admin credentials function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    console.log('Invalid method:', req.method);
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const requestBody = await req.json();
    console.log('Request received for email:', requestBody.email);
    
    const { email, password }: VerifyCredentialsRequest = requestBody;

    // Input validation and sanitization
    const sanitizedEmail = sanitizeInput(email);
    
    if (!sanitizedEmail || !password) {
      console.log('Missing required fields');
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Email et mot de passe requis' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    if (!validateEmailFormat(sanitizedEmail)) {
      console.log('Invalid email format:', sanitizedEmail);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Format d\'email invalide' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Attempting to fetch admin data for:', sanitizedEmail);

    // Get admin data with detailed logging
    const { data: adminData, error: adminError } = await supabase
      .from('system_admins')
      .select('id, email, password, is_active, is_first_login, name')
      .eq('email', sanitizedEmail)
      .single();

    console.log('Supabase query result:', { adminData, adminError });

    if (adminError) {
      console.error('Supabase error:', adminError);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Erreur de base de données' 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!adminData) {
      console.log('Admin not found');
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Identifiants invalides' 
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if admin is active
    if (!adminData.is_active) {
      console.log('Admin account is inactive');
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Compte administrateur désactivé' 
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify password
    if (!adminData.password) {
      console.log('No password set for admin');
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Mot de passe non configuré' 
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Comparing passwords...');
    const isPasswordValid = await comparePasswords(password, adminData.password);
    
    if (!isPasswordValid) {
      console.log('Invalid password for admin:', sanitizedEmail);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Identifiants invalides' 
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Admin credentials verified successfully:', sanitizedEmail);

    // Log successful authentication
    try {
      await supabase.from('security_audit_log').insert({
        event_type: 'admin_login_success',
        user_identifier: sanitizedEmail,
        success: true,
        ip_address: req.headers.get('x-forwarded-for') || 'unknown',
        user_agent: req.headers.get('user-agent') || 'unknown'
      });
    } catch (logError) {
      console.log('Failed to log security event:', logError);
      // Don't fail the authentication if logging fails
    }

    return new Response(
      JSON.stringify({ 
        valid: true, 
        isFirstLogin: adminData.is_first_login || false 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error in verify credentials:', error);
    
    return new Response(
      JSON.stringify({ 
        valid: false, 
        error: 'Erreur interne du serveur' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
