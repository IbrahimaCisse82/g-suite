
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AdminCredentialsRequest {
  email: string;
  password: string;
  action?: string;
  newPassword?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { email, password, action, newPassword }: AdminCredentialsRequest = await req.json();

    console.log(`Admin authentication attempt for: ${email}`);

    // Handle password update action
    if (action === 'update_password') {
      if (!newPassword) {
        return new Response(
          JSON.stringify({ success: false, error: 'Nouveau mot de passe requis' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { error: updateError } = await supabase
        .from('system_admins')
        .update({ 
          password: newPassword,
          is_first_login: false,
          updated_at: new Date().toISOString()
        })
        .eq('email', email)
        .eq('is_active', true);

      if (updateError) {
        console.error('Password update error:', updateError);
        return new Response(
          JSON.stringify({ success: false, error: 'Erreur lors de la mise à jour du mot de passe' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify admin credentials
    const { data: adminData, error } = await supabase
      .from('system_admins')
      .select('email, password, is_first_login, is_active, name')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (error || !adminData) {
      console.log('Admin not found or inactive:', error);
      return new Response(
        JSON.stringify({ valid: false, error: 'Administrateur non trouvé ou inactif' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Simple password verification (in production, use proper hashing)
    if (adminData.password !== password) {
      console.log('Invalid password for admin:', email);
      return new Response(
        JSON.stringify({ valid: false, error: 'Mot de passe incorrect' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Admin authentication successful:', email);

    return new Response(
      JSON.stringify({ 
        valid: true, 
        isFirstLogin: adminData.is_first_login,
        adminName: adminData.name
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in verify-admin-credentials function:', error);
    return new Response(
      JSON.stringify({ valid: false, error: 'Erreur interne du serveur' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
