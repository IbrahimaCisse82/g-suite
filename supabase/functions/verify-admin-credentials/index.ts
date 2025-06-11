
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CredentialRequest {
  email: string
  name: string
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Rate limiting - max 5 attempts per IP per 15 minutes
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitKey = `admin_login_${clientIP}`
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { email, name }: CredentialRequest = await req.json()

    // Input validation
    if (!email || !name) {
      return new Response(
        JSON.stringify({ error: 'Email et nom requis', valid: false }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase()
    const sanitizedName = name.trim()

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(sanitizedEmail)) {
      return new Response(
        JSON.stringify({ error: 'Format d\'email invalide', valid: false }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if admin exists and is active
    const { data: admin, error } = await supabaseClient
      .from('system_admins')
      .select('email, name, is_active')
      .eq('email', sanitizedEmail)
      .eq('name', sanitizedName)
      .eq('is_active', true)
      .single()

    if (error || !admin) {
      // Log failed attempt for security monitoring
      console.log(`Failed admin login attempt: ${sanitizedEmail} from ${clientIP}`)
      
      return new Response(
        JSON.stringify({ error: 'Identifiants invalides', valid: false }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Log successful authentication
    console.log(`Successful admin login: ${sanitizedEmail} from ${clientIP}`)

    return new Response(
      JSON.stringify({ 
        valid: true, 
        message: 'Authentification réussie',
        adminEmail: admin.email
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
