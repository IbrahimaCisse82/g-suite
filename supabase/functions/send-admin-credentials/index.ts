
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "npm:resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Récupérer tous les administrateurs système
    const { data: admins, error: adminsError } = await supabaseClient
      .from('system_admins')
      .select('*')
      .eq('is_active', true)

    if (adminsError) {
      throw adminsError
    }

    if (!admins || admins.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Aucun administrateur trouvé' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Générer des mots de passe par défaut et créer les comptes
    const results = []
    
    for (const admin of admins) {
      // Mot de passe par défaut : Admin2024! + premières lettres du nom
      const defaultPassword = `Admin2024!${admin.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase()}`
      
      console.log(`Creating account for ${admin.email} with password: ${defaultPassword}`)
      
      // Créer le compte utilisateur dans Supabase Auth
      const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
        email: admin.email,
        password: defaultPassword,
        email_confirm: true,
        user_metadata: {
          first_name: admin.name.split(' ')[0],
          last_name: admin.name.split(' ').slice(1).join(' '),
          role: 'admin'
        }
      })

      if (authError && !authError.message.includes('already registered')) {
        console.error(`Erreur création compte ${admin.email}:`, authError)
        results.push({
          email: admin.email,
          success: false,
          error: authError.message
        })
        continue
      }

      // Envoyer l'email avec les identifiants
      try {
        const emailResponse = await resend.emails.send({
          from: 'GrowHub Admin <admin@growhubsenegal.com>',
          to: [admin.email],
          subject: 'Vos identifiants administrateur GrowHub',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">GrowHub Administration</h1>
              </div>
              
              <div style="padding: 30px; background: #f8f9fa;">
                <h2 style="color: #333;">Bonjour ${admin.name},</h2>
                
                <p style="color: #666; line-height: 1.6;">
                  Votre compte administrateur GrowHub a été créé avec succès. Voici vos identifiants de connexion :
                </p>
                
                <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
                  <p style="margin: 0; color: #333;"><strong>Email :</strong> ${admin.email}</p>
                  <p style="margin: 10px 0 0 0; color: #333;"><strong>Mot de passe temporaire :</strong> <code style="background: #f1f3f4; padding: 2px 6px; border-radius: 4px;">${defaultPassword}</code></p>
                </div>
                
                <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0;">
                  <p style="margin: 0; color: #856404;">
                    <strong>⚠️ Important :</strong> Pour des raisons de sécurité, veuillez changer votre mot de passe lors de votre première connexion.
                  </p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${Deno.env.get('SUPABASE_URL')?.replace('supabase.co', 'supabase.co')}/admin" 
                     style="background: #667eea; color: white; text-decoration: none; padding: 12px 30px; border-radius: 6px; display: inline-block;">
                    Accéder au panneau d'administration
                  </a>
                </div>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                
                <h3 style="color: #333;">Vos responsabilités en tant qu'administrateur :</h3>
                <ul style="color: #666; line-height: 1.6;">
                  <li>Valider ou rejeter les demandes de comptes payants</li>
                  <li>Gérer les abonnements des entreprises</li>
                  <li>Superviser l'utilisation de la plateforme</li>
                  <li>Assurer le support technique de niveau 2</li>
                </ul>
                
                <p style="color: #666; font-size: 14px; margin-top: 30px;">
                  Si vous avez des questions, n'hésitez pas à contacter l'équipe technique.
                </p>
                
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                  <p style="color: #999; font-size: 12px;">
                    © 2024 GrowHub Sénégal - Plateforme de gestion d'entreprise
                  </p>
                </div>
              </div>
            </div>
          `,
        })

        console.log(`Email envoyé à ${admin.email}:`, emailResponse)
        
        results.push({
          email: admin.email,
          success: true,
          password: defaultPassword,
          emailId: emailResponse.data?.id
        })
        
      } catch (emailError) {
        console.error(`Erreur envoi email à ${admin.email}:`, emailError)
        results.push({
          email: admin.email,
          success: false,
          error: `Erreur envoi email: ${emailError.message}`
        })
      }
    }

    return new Response(
      JSON.stringify({ 
        message: 'Traitement terminé', 
        results,
        totalAdmins: admins.length,
        successCount: results.filter(r => r.success).length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Erreur générale:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
