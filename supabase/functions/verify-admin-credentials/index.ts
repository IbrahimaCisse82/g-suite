
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

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const sanitizeInput = (input: string): string => {
  if (!input) return input;
  return input.trim().replace(/[<>"'&;]/g, '');
};

const validateEmailFormat = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email) && email.length <= 255 && email.length >= 5;
};

// Simple password comparison for development/testing
const comparePasswords = async (plaintext: string, stored: string): Promise<boolean> => {
  // For now, we'll do a simple comparison
  // In production, you should use proper password hashing
  return plaintext === stored;
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
    const { email, password }: VerifyCredentialsRequest = await req.json();

    // Input validation and sanitization
    const sanitizedEmail = sanitizeInput(email);
    
    if (!sanitizedEmail || !password) {
      console.error('Missing required fields');
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
      console.error('Invalid email format:', sanitizedEmail);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Format d\'email invalide' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get admin data
    const { data: adminData, error: adminError } = await supabase
      .from('system_admins')
      .select('id, email, password, is_active, is_first_login')
      .eq('email', sanitizedEmail)
      .single();

    if (adminError || !adminData) {
      console.error('Admin not found or error:', adminError);
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
      console.error('Admin account is inactive');
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Compte administrateur désactivé' 
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Special case for first login - allow any password initially
    if (adminData.is_first_login && !adminData.password) {
      console.log('First login detected for admin:', sanitizedEmail);
      return new Response(
        JSON.stringify({ 
          valid: true, 
          isFirstLogin: true 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify password (simple comparison for now)
    if (!adminData.password) {
      console.error('No password set for admin');
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Mot de passe non configuré' 
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const isPasswordValid = await comparePasswords(password, adminData.password);
    
    if (!isPasswordValid) {
      console.error('Invalid password for admin:', sanitizedEmail);
      
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Identifiants invalides' 
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Admin credentials verified successfully:', sanitizedEmail);

    return new Response(
      JSON.stringify({ 
        valid: true, 
        isFirstLogin: false 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Verify credentials error:', error);
    
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
