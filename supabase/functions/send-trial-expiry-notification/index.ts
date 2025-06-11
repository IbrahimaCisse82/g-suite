
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "npm:resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Récupérer les essais expirés qui n'ont pas encore reçu d'email
    const { data: expiredTrials, error } = await supabaseClient
      .from('trial_accounts')
      .select(`
        *,
        companies (
          name,
          email,
          representative_first_name,
          representative_last_name
        )
      `)
      .lt('expires_at', new Date().toISOString())
      .eq('expiry_email_sent', false)
      .eq('is_active', true)

    if (error) {
      console.error('Erreur récupération essais expirés:', error)
      return new Response(
        JSON.stringify({ error: 'Erreur lors de la récupération des essais' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Trouvé ${expiredTrials?.length || 0} essais expirés`)

    for (const trial of expiredTrials || []) {
      const company = trial.companies
      const quoteUrl = `${Deno.env.get('SUPABASE_URL')?.replace('.supabase.co', '')}/quote-request?company_id=${trial.company_id}`
      
      try {
        await resend.emails.send({
          from: 'G-Suite <noreply@growhubsenegal.com>',
          to: [trial.email],
          subject: 'Votre essai G-Suite a expiré - Passez au niveau supérieur !',
          html: `
            <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
              <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); padding: 40px 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Votre essai G-Suite a expiré</h1>
              </div>
              
              <div style="padding: 40px 20px; background: white;">
                <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                  Bonjour ${company?.representative_first_name || ''},
                </p>
                
                <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                  Votre période d'essai gratuite de 5 jours pour <strong>${company?.name}</strong> 
                  vient de se terminer. Nous espérons que vous avez pu découvrir tout le potentiel 
                  de G-Suite pour transformer la gestion de votre entreprise !
                </p>
                
                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
                  <h3 style="color: #92400e; margin-top: 0;">Ne perdez pas vos données !</h3>
                  <p style="color: #92400e; margin-bottom: 0;">
                    Toutes les informations que vous avez saisies pendant l'essai sont conservées. 
                    En souscrivant maintenant, vous retrouverez immédiatement tout votre travail.
                  </p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${quoteUrl}" 
                     style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; 
                            border-radius: 8px; font-weight: bold; display: inline-block; font-size: 18px;">
                    Demander un devis personnalisé
                  </a>
                </div>
                
                <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #065f46; margin-top: 0;">Continuez avec un abonnement annuel :</h3>
                  <ul style="color: #047857; line-height: 1.8;">
                    <li>✓ Accès illimité à toutes les fonctionnalités</li>
                    <li>✓ Support technique prioritaire</li>
                    <li>✓ Sauvegardes automatiques</li>
                    <li>✓ Mises à jour gratuites</li>
                    <li>✓ Formation personnalisée incluse</li>
                    <li>✓ Garantie satisfaction 30 jours</li>
                  </ul>
                </div>
                
                <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                  Notre équipe commerciale vous contactera sous 24h pour vous proposer 
                  une offre adaptée à vos besoins et votre budget.
                </p>
                
                <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                  Des questions ? Contactez-nous :
                  <br>📧 commercial@growhubsenegal.com
                  <br>📞 +221 77 XXX XX XX
                </p>
              </div>
              
              <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
                © 2024 G-Suite by GrowHub Sénégal. Tous droits réservés.
              </div>
            </div>
          `,
        })

        // Marquer l'email comme envoyé
        await supabaseClient
          .from('trial_accounts')
          .update({ 
            expiry_email_sent: true,
            is_active: false 
          })
          .eq('id', trial.id)

        console.log(`Email d'expiration envoyé pour ${trial.email}`)

      } catch (emailError) {
        console.error(`Erreur envoi email pour ${trial.email}:`, emailError)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: expiredTrials?.length || 0,
        message: 'Emails d\'expiration traités' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: any) {
    console.error('Erreur dans send-trial-expiry-notification:', error)
    return new Response(
      JSON.stringify({ error: 'Erreur serveur' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

serve(handler)
