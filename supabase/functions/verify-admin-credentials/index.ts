
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CredentialRequest {
  email: string
  password: string
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { email, password }: CredentialRequest = await req.json()

    // Input validation
    if (!email || !password) {
      console.log(`Missing credentials: email=${!!email}, password=${!!password}`)
      return new Response(
        JSON.stringify({ error: 'Email et mot de passe requis', valid: false }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase()
    const sanitizedPassword = password.trim()

    console.log(`Admin login attempt: ${sanitizedEmail}`)

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(sanitizedEmail)) {
      console.log(`Invalid email format: ${sanitizedEmail}`)
      return new Response(
        JSON.stringify({ error: 'Format d\'email invalide', valid: false }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if admin exists by email
    const { data: adminData, error: adminError } = await supabaseClient
      .from('system_admins')
      .select('email, password, is_active, is_first_login')
      .eq('email', sanitizedEmail)
      .eq('is_active', true)
      .single()

    if (adminError || !adminData) {
      console.log(`Admin not found for email: ${sanitizedEmail}`)
      return new Response(
        JSON.stringify({ error: 'Email administrateur non trouvé ou inactif', valid: false }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Vérifier le mot de passe
    // Pour les nouveaux comptes ou mot de passe par défaut
    const defaultPassword = 'Admin1946'
    const isValidPassword = adminData.password === sanitizedPassword || 
                          (!adminData.password && sanitizedPassword === defaultPassword)

    if (!isValidPassword) {
      console.log(`Invalid password for ${sanitizedEmail}`)
      return new Response(
        JSON.stringify({ 
          error: 'Mot de passe incorrect', 
          valid: false
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Log successful authentication
    console.log(`Successful admin login: ${sanitizedEmail}`)

    // Déterminer s'il s'agit de la première connexion
    const isFirstLogin = adminData.is_first_login !== false && (!adminData.password || adminData.password === defaultPassword)

    return new Response(
      JSON.stringify({ 
        valid: true, 
        message: 'Authentification réussie',
        adminEmail: adminData.email,
        isFirstLogin: isFirstLogin
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: any) {
    console.error('Error in admin credential verification:', error)
    return new Response(
      JSON.stringify({ error: 'Erreur serveur', valid: false }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

serve(handler)
